"use client"

import AllProducts from '@recycle-chain/ui/src/components/templates/AllProducts';

type Props = {
  params: {
    manufacturerId: string
  }
}

const Page = ({ params: { manufacturerId } }: Props) => {
  return (
    <AllProducts manufacturerId={manufacturerId} />
  )
}

export default Page
