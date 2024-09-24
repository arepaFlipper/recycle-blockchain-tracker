import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { RecycleChain__factory, RecycleChain } from '../../../../standalone/recycle-chain-contract/typechain-types';
import { contractAddress } from 'src/common/prisma/utils';
import { PrismaService } from 'src/common/prisma/prisma.service';

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
      this.contract.on(this.contract.filters.ManufacturerRegistered, async (manufacturer, name, location, contact, event) => {
        // @ts-expect-error get blockNumber from event
        const blockNumber = event.log.blockNumber
        const timestamp = await this.getBlockTimeStamp(blockNumber)

        await this.prisma.manufacturer.create({ data: { contact, id: manufacturer, location, name, timestamp } })
      },
      )
      console.log(`🪫  Event: ManufacturerRegistered Listening...`);
      // this.contract.on(this.contract.filters.ProductItemsAdded, (manufacturer, name) => { })
    } catch (error) {
      console.log(`🎤 Event: ProductCreate: Listener setup failed`, error);
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
}
