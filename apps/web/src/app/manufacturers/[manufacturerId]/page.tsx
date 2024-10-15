"use client"

import AllProducts from '@recycle-chain/ui/src/components/templates/AllProducts';

type PageProps = {
  params: { manufacturerId: string }
}

const Page = ({ params }: PageProps) => {
  const { manufacturerId } = params;
  return (
    <AllProducts manufacturerId={manufacturerId} />
  )
}

export default Page
