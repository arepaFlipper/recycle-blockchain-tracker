import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { RecycleChain__factory, RecycleChain } from '../../../../standalone/recycle-chain-contract/typechain-types';
import { contractAddress } from 'src/common/prisma/utils';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductStatus } from '@prisma/client';

const statusMapping = [
  ProductStatus.MANUFACTURED,
  ProductStatus.SOLD,
  ProductStatus.RETURNED,
  ProductStatus.RECYCLED,
]

@Injectable()
export class ListenerService implements OnModuleInit, OnModuleDestroy {

  private provider: ethers.WebSocketProvider
  private contract: RecycleChain

  constructor(private readonly prisma: PrismaService) { }

  onModuleInit() {
    // NOTE: Initialize web socket provider
    this.initializeWebSocketProvider();

    // NOTE: Setup the event subscriber
    this.subscribeToEvents();

  }

  onModuleDestroy() {
    // NOTE: Remove all subscriptions
    throw new Error('Destroy method not implemented.');
  }

  initializeWebSocketProvider() {
    const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`
    this.provider = new ethers.WebSocketProvider(infuraWssUrl)

    this.contract = RecycleChain__factory.connect(contractAddress, this.provider)
  }

  subscribeToEvents() {

    if (!this.contract) {
      throw new Error('Contract is not initialized');
    }

    try {
      this.contract.on(
        this.contract.filters.ManufacturerRegistered,
        async (id, name, location, contact, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber;
          const timestamp = await this.getBlockTimeStamp(blockNumber);
          await this.createManufacturer({ contact, id, location, name, timestamp });
        }
      )
      console.log(`🪫  Event: ManufacturerRegistered Listening...`);
      // this.contract.on(this.contract.filters.ProductItemsAdded, (manufacturer, name) => { })
    } catch (error) {
      console.log(`🎤 Event: ProductCreate: Listener setup failed`, error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductCreated,
        async (productId, name, manufacturer, event) => {
          // @ts-ignore
          const blockNumber = event.log.blockNumber
          const timestamp = await this.getBlockTimeStamp(blockNumber)

          await this.createProduct({ manufacturer, name, productId: productId.toString(), timestamp })
        }
      )
      console.log(`🌀  Event: ProductCrated Listening...`);
    } catch (error) {
      console.error('Event: ProductCreated: Listener setup failed.', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsStatusChanged,
        async (productItemIds, statusIndex, event) => {
          // @ts-ignore
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber);

          const items = await this.updateProductItemStatus({
            productItemIds,
            statusIndex: (+statusIndex.toString()),
            timestamp,
          });

          console.log('items updated', items);

        }
      )
      console.log(`🦦  Event: Product item status change Listening...`);
    } catch (error) {
      console.error('Event: Product item status change: Listener setup failed.', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsAdded,
        async (productItemIds, productId, event) => {
          // @ts-ignore
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber);

          const items = await this.createProductItems({
            productId: productId.toString(),
            productItemIds,
            timestamp,
          });
          console.log(`📈items`, items); //DELETEME:
        }
      )
      console.log(`🛸  Event: Product item added change Listening...`);
    } catch (error) {
      console.error('Event: Product item add: Listener setup failed.', error);
    }

    try {
      this.contract.on(
        this.contract.filters.ToxicItemCreated,
        async (productId, name, weight, event) => {
          // @ts-ignore
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber);

          await this.createToxicItem({ name, productId: productId.toString(), weight: Number(weight.toString()), timestamp })
        }
      )

      console.log(`🕊️  Event: Toxic Product create Listening...`);
    } catch (error) {
      console.error('Event: Toxic Product create add: Listener setup failed.', error);
    }

  }

  async resyncBlockchainData() {
    if (!this.contract) {
      throw new Error('Contract is not initialized');
    }

    const fromBlock = 0;
    const toBlock = 'latest';

    // NOTE: 1. Query and handle ManufacturerRegistered events
    const manufacturerRegisteredEvents = await this.contract.queryFilter(
      this.contract.filters.ManufacturerRegistered,
      fromBlock,
      toBlock
    );

    for (const event of manufacturerRegisteredEvents) {
      const [manufacturer, name, location, contact] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      await this.createManufacturer({ contact, id: manufacturer, location, name, timestamp });
    };

    // NOTE: 2. Query and handle ProductCreated events
    const productCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductCreated,
      fromBlock,
      toBlock,
    );

    for (const event of productCreatedEvents) {
      const [productId, name, manufacturer] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      await this.createProduct({
        manufacturer,
        name,
        productId: productId.toString(),
        timestamp,
      });
    }

    // NOTE: 3. Query and handle ProductItemsAdded events
    const productItemsAddedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsAdded,
      fromBlock,
      toBlock,
    )

    for (const event of productItemsAddedEvents) {
      const [productItemIds, productId] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      await this.createProductItems({
        productId: productId.toString(),
        productItemIds,
        timestamp
      });
    }

    // NOTE: 4. Query and handle ProdcutItemsStatusChanged events
    const productItemsStatusChangedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsStatusChanged,
      fromBlock,
      toBlock,
    )

    for (const event of productItemsStatusChangedEvents) {
      const [productItemIds, statusIndex] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      await this.updateProductItemStatus({
        productItemIds,
        statusIndex: +statusIndex.toString(),
        timestamp,
      })
    }

    // NOTE: 5. Query and handle ToxicItemCreated events
    const toxicItemCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ToxicItemCreated(),
      fromBlock,
      toBlock,
    )

    for (const event of toxicItemCreatedEvents) {
      const [productId, name, weight] = event.args;
      const timestamp = await this.getBlockTimeStamp(event.blockNumber);

      await this.createToxicItem({
        name,
        productId: productId.toString(),
        weight: +weight.toString(),
        timestamp
      })
    }
  }

  cleanup() {
    this.provider.removeAllListeners()
  }

  // NOTE: utils
  async getBlockTimeStamp(blockNumber: number) {
    const block = await this.provider.getBlock(blockNumber)
    return new Date(block.timestamp)
  }


  // NOTE: DB writes
  private async createManufacturer({ id, name, location, contact, timestamp }:
    { id: string, name: string, location: string, contact: string, timestamp: Date }) {
    const manufacturer = await this.prisma.manufacturer.create({
      data: { id, timestamp, contact, location, name }
    })
    console.log(`🎉 Manufacturer Created`, manufacturer); //DELETEME:
  }

  private async createProduct({ manufacturer, name, productId, timestamp }:
    { manufacturer: string, name: string, productId: string, timestamp: Date }) {
    const product = await this.prisma.product.create({
      data: {
        id: productId, name, timestamp, manufacturer: {
          connect: {
            id: manufacturer,
          }
        }
      }
    })
    console.log(`🧧 Product created`, product);
  }

  private createProductItems({ productId, productItemIds, timestamp }:
    { productItemIds: string[], productId: string, timestamp: Date }) {
    const transactions = productItemIds.map((productItemId) => {
      return this.prisma.transaction.create({
        data: {
          status: ProductStatus.MANUFACTURED,
          productItemId,
          timestamp,
        }
      })
    });

    const productItemUpdates = this.prisma.productItem.createMany({
      data: productItemIds.map((id) => {
        return { id, productId: productId.toString(), status: ProductStatus.MANUFACTURED, timestamp }
      }),
    });
    return this.prisma.$transaction([productItemUpdates, ...transactions])
  }

  private updateProductItemStatus({ statusIndex, productItemIds, timestamp }:
    { statusIndex: number, productItemIds: string[], timestamp: Date }) {
    const status = statusMapping[+statusIndex.toString()] as ProductStatus;
    const transactions = productItemIds.map((productItemId) => {
      return this.prisma.transaction.create({
        data: { status, productItemId, timestamp }
      });
    });

    const productItemUpdates = this.prisma.productItem.updateMany({
      data: { status, timestamp },
      where: { id: { in: productItemIds } }
    });

    return this.prisma.$transaction([productItemUpdates, ...transactions]);
  }

  private async createToxicItem({ productId, name, weight, timestamp }:
    { productId: string, name: string, weight: number, timestamp: Date }) {
    const maxRetries = 5;
    let retryCount = 0;
    const delay = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    while (retryCount < maxRetries) {
      const product = await this.prisma.product.findUnique({ where: { id: productId } });

      if (product) {
        const toxicItem = await this.prisma.toxicItem.create({ data: { name, weight, productId, timestamp } });
        console.log(`🎤 toxicItem`, toxicItem); //DELETEME:
        return
      } else {
        console.error(`Product with ID ${productId} not found. Retrying (${retryCount + 1}/${maxRetries})`)
        await delay(1000);
        retryCount++;
      }
    }

  }
}
