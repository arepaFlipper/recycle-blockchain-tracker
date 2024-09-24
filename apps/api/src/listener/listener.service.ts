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
    try {
      this.contract.on(
        this.contract.filters.ManufacturerRegistered,
        async (id, name, location, contact, event) => {
          // @ts-expect-error get The blockNumber from log property
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
          // @ts-expect-error get blockNumber from event
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
          // @ts-expect-error: get blockNumber in log
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
          // @ts-expect-error The blockNumber is got from log
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
          // @ts-expect-error The blockNumber is got from event.log
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber);

          await this.createToxicItem({ name, productId: productId.toString(), weight: Number(weight.toString()), timestamp })
        }
      )

      console.log(`🕊️  Event: Toxic Product create Listening...`);
    } catch (error) {
      console.error('Event: Toxic Product create add: Listener setup failed.', error);
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
