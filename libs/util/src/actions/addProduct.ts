import { ActionType } from '../types';

export type TAddProduct = {
  name: string;
  toxicNames: string[];
  toxicWeights: number[];
}

export const addProduct = async ({ contract, payload }: ActionType<TAddProduct>) => {
  try {

    const { name, toxicNames, toxicWeights } = payload;
    const transaction = await contract.addProduct(name, toxicNames, toxicWeights)
    const receipt = await transaction.wait();
    return (receipt?.status === 1);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
