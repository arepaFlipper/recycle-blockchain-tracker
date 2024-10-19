import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { useApolloClient } from '@apollo/client';
import { Button } from '../atoms/Button';
import { useState } from 'react';
import { toast } from '../molecules/Toast';
import { updateProductItemStatus } from '@recycle-chain/util/src/actions/updateProductItemStatus';
import { namedOperations, ProductStatus } from '@recycle-chain/network/src/gql/generated';

const statusToButtonText: Record<ProductStatus, string> = {
  [ProductStatus.Manufactured]: 'Sell item 🤑 ',
  [ProductStatus.Sold]: 'Return item 🔁',
  [ProductStatus.Returned]: 'Recycle item ♻️ ',
  [ProductStatus.Recycled]: 'Recycled 🌱',
}

type ActionButtonsProps = {
  id: string;
  status: ProductStatus;
}

export const UpdateProductItemStatusButton = ({ id, status }: ActionButtonsProps) => {
  const { contract } = useAccount();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const handleSellItem = async () => {
    if (!contract) {
      toast('Please connect your wallet 👛👛');
      return;
    }
    setLoading(true);
    const new_status = await updateProductItemStatus({ contract, payload: { productItemIds: [id], currentStatus: status } });

    if (new_status) {
      client.refetchQueries({
        include: [
          namedOperations.Query.ProductItems,
          namedOperations.Query.Product,
        ]
      });
      toast('Product sold successfully 😀 🎉');
    } else {
      toast('Something went wrong selling the product 😢 😢 😢');
    }

    setLoading(false);
  }

  return (
    <Button loading={loading} variant="text" onClick={handleSellItem} disabled={status === ProductStatus.Recycled} >
      {statusToButtonText[status]}
    </Button>
  )

}
