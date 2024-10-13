"use client"
import { ManufacturerDocument } from "@recycle-chain/network/src/gql/generated";
import { useQuery } from "@apollo/client";
import ManufacturerTopCard from "../../../components/organisms/ManufacturerTopCard";
import { ReactNode } from "react";
import NoItemsFound from "../../../components/molecules/NoItemsFound";
import Styled from "../../../components/molecules/StyledLink";
import ManufacturerRegisterButton from "../../../components/molecules/ManufacturerRegisterButton";

type LayoutProps = {
  children: ReactNode;
  params: { manufacturerId: string }
}

const Layout = ({ children, params }: LayoutProps) => {
  const { data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: params.manufacturerId } },
  });

  if (!data?.manufacturer) {
    return (
      <NoItemsFound>
        <div className="text-xl">Manufacturer not found.</div>
        <ManufacturerRegisterButton />
      </NoItemsFound>
    )
  }
  return (
    <main>
      <ManufacturerTopCard manufacturer={data?.manufacturer} className="mb-4" />
      {children}
    </main>
  )
}

export default Layout
