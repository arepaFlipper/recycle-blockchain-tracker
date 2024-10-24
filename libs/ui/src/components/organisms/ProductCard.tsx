import { ProductsQuery } from "@recycle-chain/network/src/gql/generated";
import { ReactNode } from "react";
import DonutChartSimplified from "./DonutChartSimplified";
import ToxicItemsChart from "./ToxicItemsChart";
import Link from "next/link";
import Styled from "../molecules/StyledLink";

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0];
  showAddItems?: boolean;
  children?: ReactNode;
}

const ProductCard = ({ product, children }: IProductCardProps) => {
  return (
    <div key={product.id} className="p-4 shadow-lg overflow-hidden bg-[#252525] h-full rounded flex flex-col text-gray-200">
      <DonutChartSimplified
        total={product.totalCount}
        sold={product.soldCount}
        returned={product.returnedCount}
        recycled={product.recycledCount}
      />

      <div className="text-center mt-4">
        <h2 className="font-bold text-xl text-white">{product.name}</h2>
      </div>

      <div className="text-center mt-1">
        <h2 className="font-medium text-gray-100">{product.manufacturer.name}</h2>
      </div>

      <div className="flex gap-1 justify-center text-sm mt-2 ">
        <h2>{product.totalCount} items</h2>
      </div>
      <hr className="my-4" />
      <ToxicItemsChart toxicItems={product.toxicItems} />

      <div className="mt-auto">
        <div className="flex justify-end mt-4 ">
          <Styled
            href={`/products/${product.id}`}
            className="underline underline-offset-4 font-semibold text-lg"
            key={product.id}
          >
            View Product
          </Styled>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
