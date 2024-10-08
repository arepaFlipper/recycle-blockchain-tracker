"use client"
import { ManufacturerDocument } from "@recycle-chain/network/src/gql/generated";
import { useQuery } from "@apollo/client";

type LayoutProps = {
  children: React.ReactNode;
  params: { manufacturerId: string }
}

const Layout = ({ children, params }: LayoutProps) => {
  const { data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: params.manufacturerId } },
  });
  console.log(`🌖%clayout.tsx:14 - data`, 'font-weight:bold; background:#44bb00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {children}
    </main>
  )
}

export default Layout
