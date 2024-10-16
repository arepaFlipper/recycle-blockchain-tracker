"use client"
import { ProductDocument } from "@recycle-chain/network/src/gql/generated";
import { ReactNode } from "react"
import { useQuery } from '@apollo/client'
import { LoaderPanel } from "@recycle-chain/ui/src/components/molecules/Loader";
import { AlertSection } from "@recycle-chain/ui/src/components/molecules/AlertSection";

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}

export default Layout;
