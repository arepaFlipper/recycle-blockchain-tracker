import { ActionType } from '../types';

export type TRegisterManufacturer = ActionType<{ name: string, location: string, contact: string }>;

export async function registerManufacturer({ contract, payload: { name, location, contact }, }: TRegisterManufacturer): Promise<boolean> {
  try {
    console.log(`🛢️%cregisterManufacturer.ts:7 - contract`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
    console.log(contract); // DELETEME:
    console.log(`🦌%cregisterManufacturer.ts:9 - contract.registerManufacturer`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME:
    console.log(contract.registerManufacturer); // DELETEME:

    const tx = await contract.registerManufacturer(name, location, contact);
    console.log(`🎨%cregisterManufacturer.ts:10 - tx`, 'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME:
    console.log(tx); // DELETEME:
    const receipt = await tx.wait();
    console.log(`😉%cregisterManufacturer.ts:12 - receipt`, 'font-weight:bold; background:#3cc300;color:#fff;'); //DELETEME:
    console.log(receipt); // DELETEME:
    return receipt?.status === 1;
  } catch (error) {
    console.error(error);
    throw error;
  }

}
