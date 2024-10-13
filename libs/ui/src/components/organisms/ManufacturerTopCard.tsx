import { ManufacturersQuery } from '@recycle-chain/network/src/gql/generated';
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import React from 'react'
import DonutChartSimplified from './DonutChartSimplified';

type Props = {
  manufacturer: ManufacturersQuery['manufacturers'][0];
  className?: string;
}

const ManufacturerTopCard = ({ manufacturer, className }: Props) => {
  const { account } = useAccount();
  const is_you = (account.toLowerCase() === manufacturer.id.toLowerCase());
  return (
    <div className={`flex flex-col md:flex-row items-center md:items-start md:space-x-6 ${className}`}>
      <DonutChartSimplified
        total={manufacturer.totalCount} sold={manufacturer.soldCount}
        returned={manufacturer.returnedCount} recycled={manufacturer.recycledCount}
      />
    </div>
  )
}

export default ManufacturerTopCard
