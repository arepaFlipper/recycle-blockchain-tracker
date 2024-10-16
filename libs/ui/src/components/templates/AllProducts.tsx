"use client"
import { useQuery } from '@apollo/client';
import { ProductsDocument, QueryMode, SortOrder } from "@recycle-chain/network/src/gql/generated";
import { useTakeSkip } from "@recycle-chain/util/src/hooks/pagination";
import { useState } from "react";
import { ShowData } from '../organisms/ShowData';
import { IconSearch } from '@tabler/icons-react';
import { PageTitle } from '../atoms/PageTitle';
import ProductCard from '../organisms/ProductCard';

type Props = {
  manufacturerId?: string;
}

const AllProducts = ({ manufacturerId }: Props) => {
  const { setSkip, setTake, skip, take } = useTakeSkip(0, 1);
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

  return (
    <div>
      <div className="flex justify-between items-baseline gap-2 w-full">
        <PageTitle>All products</PageTitle>
      </div>
      <div className=" mb-3">
        <div className="flex max-w-sm items-center gap-2 shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input
            placeholder="Search product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.products?.length,
          totalCount: data?.productsCount,
          setSkip,
          setTake,
          skip,
          take,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
      >
        {data?.products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ShowData>
    </div>
  )
}

export default AllProducts

