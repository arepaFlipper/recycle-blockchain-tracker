"use client"

import { useTakeSkip } from "@recycle-chain/util/src/hooks/pagination";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ProductManufacturerDocument, ProductItemsDocument } from "@recycle-chain/network/src/gql/generated";
import { PageTitle } from "../atoms/PageTitle";
import { IconSearch } from "@tabler/icons-react";
import { ShowData } from "../organisms/ShowData";
import ProductItemCard from "../organisms/ProductItemCard";
import AddProductItems from "../organisms/AddProductItemsDialog"
import { useAccount } from "@recycle-chain/util/src/hooks/ether";

type Props = {
  productId: string;
}

const ShowProductItems = ({ productId }: Props) => {
  const { setSkip, setTake, skip, take } = useTakeSkip(0, 12);
  const [searchTerm, setSearchTerm] = useState('');

  const { account } = useAccount();
  const { data: productData } = useQuery(
    ProductManufacturerDocument,
    { variables: { where: { id: productId } } }
  );
  const { loading, data } = useQuery(ProductItemsDocument, {
    variables: {
      skip,
      take,
      where: {
        productId: { equals: productId },
        ...(searchTerm && { id: { contains: searchTerm } })
      }
    }
  });

  const is_owner = account.toLowerCase() === productData?.product.manufacturerId.toLowerCase();
  return (
    <div>
      <PageTitle> Product Items</PageTitle>
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-center gap-2 max-w-sm shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input
            placeholder="Search product items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent text-black"
          />
        </div>

        <div>
          {(is_owner) && (
            <>
              <AddProductItems productId={productId} />
            </>
          )}
          {/* TODO: if the viewer is the owner, add and modify items */}
        </div>
      </div>

      <ShowData loading={loading} pagination={{
        resultCount: data?.productItems?.length,
        totalCount: data?.productItemsCount,
        setSkip,
        setTake,
        skip,
        take,
      }}>
        {' '}
        {data?.productItems?.map((item) => {
          return (
            <ProductItemCard key={item.id} productItem={item} is_owner={is_owner} />
          )
        })}
      </ShowData>
    </div>
  );
};

export default ShowProductItems;
