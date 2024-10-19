import { ActionType } from '../types';

export type TAddItem = {
  productId: string,
  quantity: number,
}

export const addProductItems = async ({ contract, payload }: ActionType<TAddItem>) => {
  try {
    console.log(`🍬%caddProductItems.ts:10 - contract`, 'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME:
    console.log(contract); // DELETEME:

    const { productId, quantity } = payload;
    console.log(`🥞%caddProductItems.ts:12 - payload`, 'font-weight:bold; background:#3cc300;color:#fff;'); //DELETEME:
    console.log(payload); // DELETEME:
    const transaction = await contract.addProductItems(productId, quantity)
    console.log(`📳%caddProductItems.ts:13 - transaction`, 'font-weight:bold; background:#40bf00;color:#fff;'); //DELETEME:
    console.log(transaction); // DELETEME:
    const receipt = await transaction.wait();
    return (receipt?.status === 1);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
