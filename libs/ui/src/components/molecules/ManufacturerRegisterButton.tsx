'use client'

import { useQuery } from "@apollo/client";
import { ManufacturerDocument } from "@recycle-chain/network/src/gql/generated";
import { useAccount } from "@recycle-chain/util/src/hooks/ether";
import Link from "next/link";

const ManufacturerRegisterButton = () => {
  const { account } = useAccount();
  const { loading, data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: account } },
  });

  if (!data?.manufacturer) {
    return (
      <Link href="/manufacturer/register">Register</Link>
    )
  }

  return null;
}

export default ManufacturerRegisterButton;
