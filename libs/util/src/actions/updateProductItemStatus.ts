import { ProductStatus } from '@recycle-chain/network/src/gql/generated';
import { ActionType } from '../types';

type UpdateProductItemStatusProps = ActionType<{ productItemIds: string[], currentStatus: ProductStatus }>

const updateProductItemStatus = async ({ contract, payload }: UpdateProductItemStatusProps): Promise<boolean> => {
  const { productItemIds, currentStatus } = payload;
  try {
    let transaction;
    if (currentStatus === ProductStatus.Manufactured) {
      transaction = await contract.sellProductItems(productItemIds)
    } else if (currentStatus === ProductStatus.Sold) {
      transaction = await contract.returnProductItems(productItemIds)
    } else if (currentStatus === ProductStatus.Returned) {
      transaction = await contract.recycleProductItems(productItemIds)
    }

    const receipt = await transaction?.wait();
    return (receipt?.status === 1);
  } catch (error) {
    console.error(error);
    return false;
  }
}

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

export { sellProductItems, returnProductItems, updateProductItemStatus };
