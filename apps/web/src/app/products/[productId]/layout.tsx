"use client"
import { ProductDocument } from "@recycle-chain/network/src/gql/generated";
import { ReactNode } from "react"
import { useQuery } from '@apollo/client'
import { LoaderPanel } from "@recycle-chain/ui/src/components/molecules/Loader";
import { AlertSection } from "@recycle-chain/ui/src/components/molecules/AlertSection";
import ProductTopCard from "@recycle-chain/ui/src/components/organisms/ProductTopCard";

type Props = {
  children: ReactNode;
  params: { productId: string };
};

const Layout = ({ children, params }: Props) => {
  const { loading, data } = useQuery(ProductDocument, {
    variables: { where: { id: params.productId } },
  })

  if (loading) {
    return (<LoaderPanel />);
  }

  if (!data?.product) {
    return (<AlertSection>Product not found.</AlertSection>);
  }

  return (
    <main className="mt-6">
      <ProductTopCard product={data.product} />
      {children}
    </main>
  )
}

export default Layout;
