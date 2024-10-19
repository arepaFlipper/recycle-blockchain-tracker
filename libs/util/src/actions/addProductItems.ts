import { ActionType } from '../types';

export type TAddItem = {
  productId: string,
  quantity: number,
}

export const addProductItems = async ({ contract, payload }: ActionType<TAddItem>) => {
  try {
    const { productId, quantity } = payload;
    const transaction = await contract.addProductItems(productId, quantity)
    const receipt = await transaction.wait();
    return (receipt?.status === 1);
  } catch (error) {
    console.error(error);
    return false;
  }
}
