import { useAccount } from './ether';
import { useQuery } from '@apollo/client';
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated';

type Props = {
  manufacturerId: string;
}

export const useGetManufacturer = ({ manufacturerId }: Props) => {
  const { account } = useAccount();
  const { loading, data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: manufacturerId } }
  });

  const is_owner = account.toLowerCase() === data?.manufacturer.id.toLowerCase();

  return {
    manufacturer: data?.manufacturer,
    isOwner: is_owner,
  }
}
