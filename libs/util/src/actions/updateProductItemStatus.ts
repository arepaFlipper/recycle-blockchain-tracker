import { ActionType } from '../types';

type ProductItemsProps = ActionType<{ productItemIds: string[] }>

const sellProductItems = async ({ contract, payload }: ProductItemsProps): Promise<boolean> => {
  const { productItemIds } = payload;
  try {
    const transaction = await contract.sellProductItems(productItemIds)
    const receipt = await transaction.wait();
    return receipt?.status === 1;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const returnProductItems = async ({ contract, payload }: ProductItemsProps): Promise<boolean> => {
  try {
    const { productItemIds } = payload;
    const transaction = await contract.returnProductItems(productItemIds);
    const receipt = await transaction.wait();
    return receipt?.status === 1;
  } catch (error) {
    console.error(error);
    return false;
  }

}

export { sellProductItems, returnProductItems };
