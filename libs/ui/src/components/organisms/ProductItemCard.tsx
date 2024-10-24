import { ProductItemsQuery, ProductStatus } from "@recycle-chain/network/src/gql/generated";
import Timeline from "./Timeline";
import { UpdateProductItemStatusButton } from "./ActionButtons";

export interface IProductItemCardProps {
  productItem: NonNullable<ProductItemsQuery['productItems']>[0];
  is_owner?: boolean;
}

const ProductItemCard = ({ productItem, is_owner = false }: IProductItemCardProps) => {
  return (
    <div className={`p-4 bg-[#1F1F1F] rounded ${productItem.status === ProductStatus.Recycled ? 'border-2 border-green-600 shadow-lg' : ""}`}>
      {' '}
      <div className="flex flex-col">
        <div className="text-3xl text-white mt-2 font-light mb-2">{productItem.id}</div>
        <div className="text-sm text-gray">{productItem.product.name}</div>
      </div>
      <Timeline events={productItem.transactions} className="mt-6" />
      <div className="flex gap-2 mt-6 items-center justify-end">
        {(is_owner) && (
          <div className="flex justify-end ">
            <UpdateProductItemStatusButton id={productItem.id} status={productItem.status} />
          </div>
        )}
      </div>
    </div >
  )
}

export default ProductItemCard
