"use client"

import { useQuery } from '@apollo/client';
import { ProductsDocument, QueryMode, SortOrder } from '@recycle-chain/network/src/gql/generated';
import { useTakeSkip } from '@recycle-chain/util/src/hooks/pagination';
import { PageTitle } from '@recycle-chain/ui/src/components/atoms/PageTitle';
import { useState } from 'react';
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import { IconSearch } from '@tabler/icons-react';

type PageProps = {
  params: { manufacturerId: string }
}

const Page = ({ params }: PageProps) => {
  const { manufacturerId } = params;
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(ProductsDocument, {
    variables: {
      skip,
      take,
      where: {
        manufacturerId: { equals: manufacturerId },
        ...(searchTerm && {
          name: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          }
        })
      },
      orderBy: { timestamp: SortOrder.Desc }
    },
  })

  const { account } = useAccount();
  const is_owner = account.toLowerCase() === manufacturerId.toLowerCase();

  return (
    <div>
      <div className="flex justify-between items-baseline gap-2 w-full">
        <PageTitle>All Products</PageTitle>
        {((is_owner) && (<div>Create product</div>))}
      </div>

      <div className="mb-3">
        <div className="flex max-w-sm items-center gap-2 shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input placeholder="Search product name" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent text-black"
          />
        </div>
      </div>

      <pre className="text-white text-xs" >{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Page
