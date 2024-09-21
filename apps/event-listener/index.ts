import { ethers } from 'ethers';
import { contractAddress } from './util';
import { SimpleCounter__factory } from '../../standalone/simple-counter/typechain-types';

require('dotenv').config();

const main = () => {
  const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`;

  const provider = new ethers.WebSocketProvider(infuraWssUrl);

  const contract = SimpleCounter__factory.connect(contractAddress, provider);

  try {
    contract.on(contract.filters['NumberIncremented'], (updatedNumber) => {
      console.log(`❤️%cindex.ts:15 - Number incremented`, 'font-weight:bold; background:#48b700;color:#fff;'); //DELETEME:
      console.log(updatedNumber); // DELETEME:

      console.log('Event: NumberIncremented Listening...')
    })
  } catch (error) {
    console.log('Event: NumberIncremented: Listener setup failed.', error);
  }

  try {
    contract.on(contract.filters['NumberDecremented'], (updatedNumber) => {
      console.log(`❤️%cindex.ts:15 - Number decremented`, 'font-weight:bold; background:#48b700;color:#fff;'); //DELETEME:
      console.log(updatedNumber); // DELETEME:

      console.log('Event: NumberDecremented Listening...')
    })
  } catch (error) {
    console.log('Event: NumberIncremented: Listener setup failed.', error);
  }
};

main();
