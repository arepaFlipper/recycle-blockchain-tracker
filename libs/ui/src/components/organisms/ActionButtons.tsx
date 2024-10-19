import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { useApolloClient } from '@apollo/client';
import { Button } from '../atoms/Button';
import { useState } from 'react';
import { toast } from '../molecules/Toast';
import { sellProductItems } from '@recycle-chain/util/src/actions/updateProductItemStatus';
import { namedOperations } from '@recycle-chain/network/src/gql/generated';

export const SellItem = ({ id }: { id: string }) => {
  const { contract } = useAccount();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const handleSellItem = async () => {
    if (!contract) {
      toast('Please connect your wallet 👛👛');
      return;
    }
    setLoading(true);
    const status = await sellProductItems({ contract, payload: { productItemIds: [id] } });

    if (status) {
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
    <Button variant="text" onClick={handleSellItem} >Sell Item</Button>
  )

}
