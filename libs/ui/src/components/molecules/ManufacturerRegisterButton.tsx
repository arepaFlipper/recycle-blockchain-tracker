'use client'

import { useQuery } from "@apollo/client";
import { ManufacturerDocument } from "@recycle-chain/network/src/gql/generated";
import { useAccount } from "@recycle-chain/util/src/hooks/ether";
import { useGetManufacturer } from '@recycle-chain/util/src/hooks/manufacturer';
import StyledLink from "./StyledLink";

const ManufacturerRegisterButton = () => {
  const { account } = useAccount();
  const { manufacturer, isOwner } = useGetManufacturer({ manufacturerId: account });
  const { loading, data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: account } },
  });

  if (!data?.manufacturer) {
    return (
      <StyledLink href="/manufacturers/register">Register as manufacturer</StyledLink>
    )
  }

  return null;
}

export default ManufacturerRegisterButton;
