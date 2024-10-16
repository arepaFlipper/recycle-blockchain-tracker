import { ProductItemsQuery, ProductStatus } from "@recycle-chain/network/src/gql/generated";

export interface IProductItemCardProps {
  productItem: NonNullable<ProductItemsQuery['productItems']>[0];
  is_owner?: boolean;
}

export const ProductItemCard = ({ productItem, is_owner }: IProductItemCardProps) => {
  return (
    <div className={`p-4 bg-white rounded ${productItem.status === ProductStatus.Recycled ? 'border-2 border-green-600 shadow-lg' : ""}`}>
      {' '}
      <div className="flex flex-col">
        <div className="text-3xl text-black mt-2 font-light mb-2">{productItem.id}</div>
        <div className="text-sm text-gray">{productItem.product.name}</div>
      </div>
    </div>
  )
}
