"use client"

import { useQuery } from '@apollo/client';
import { ProductsDocument, QueryMode, SortOrder } from '@recycle-chain/network/src/gql/generated';
import { useTakeSkip } from '@recycle-chain/util/src/hooks/pagination';
import { useState } from 'react';

type PageProps = {
  params: { manufacturerId: string }
}

const Page = ({ params }: PageProps) => {
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const [searchTerm, setSerachTerm] = useState('');
  const { manufacturerId } = params;
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
  console.log(`👒 %cpage.tsx:32 - data`, 'font-weight:bold; background:#788700;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <div>
      <div>Manufacturer {manufacturerId}</div>
      <pre className="text-white text-xs" >{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Page
