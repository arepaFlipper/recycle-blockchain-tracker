"use client"
import ShowProductItems from '@recycle-chain/ui/src/components/templates/ShowProductItems';

type Props = {
  params: { productId: string }
}

const page = ({ params }: Props) => {
  return (
    <ShowProductItems productId={params.productId} />
  )
}

export default page
