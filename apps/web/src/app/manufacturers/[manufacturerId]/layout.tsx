"use client"

import { useQuery } from "@apollo/client";
import { ManufacturerDocument } from "@recycle-chain/network/src/gql/generated";
import { AlertSection } from '@recycle-chain/ui/src/components/molecules/AlertSection';
import { ReactNode } from "react";
import ManufacturerTopCard from "@recycle-chain/ui/src/components/organisms/ManufacturerTopCard";
import ManufacturerRegisterButton from '@recycle-chain/ui/src/components/molecules/ManufacturerRegisterButton';

type LayoutProps = {
  children: ReactNode,
  params: { manufacturerId: string },
}

const Layout = ({ children, params }: LayoutProps) => {
  const { data, loading } = useQuery(ManufacturerDocument, {
    variables: { where: { id: params.manufacturerId } }
  })

  if (!data?.manufacturer) {
    return (
      <AlertSection>
        <div className="text-xl">Manufacturer not found. </div>
        <ManufacturerRegisterButton />
      </AlertSection>
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
