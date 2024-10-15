import { ProductsQuery } from "@recycle-chain/network/src/gql/generated";
import { ReactNode } from "react";
import DonutChartSimplified from "./DonutChartSimplified";
import ToxicItemsChart from "./ToxicItemsChart";

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0];
  showAddItems?: boolean;
  children?: ReactNode;
}

const ProductCard = ({ product, children }: IProductCardProps) => {
  return (
    <div key={product.id} className="p-4 shadow-lg overflow-hidden bg-white h-full rounded flex flex-col">
      <DonutChartSimplified
        total={product.totalCount}
        sold={product.soldCount}
        returned={product.returnedCount}
        recycled={product.recycledCount}
      />

      <div className="text-center mt-4">
        <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
      </div>

      <div className="text-center mt-1">
        <h2 className="font-medium text-gray-800">{product.manufacturer.name}</h2>
      </div>

      <div className="flex gap-1 justify-center text-sm mt-2 text-gray">
        <h2>{product.totalCount} items</h2>
      </div>
      <hr className="my-4" />
      <ToxicItemsChart toxicItems={product.toxicItems} />
    </div>
  );
}

export default ProductCard;
