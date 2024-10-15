import { ManufacturersQuery } from '@recycle-chain/network/src/gql/generated';
import { useAccount } from '@recycle-chain/util/src/hooks/ether';
import React from 'react'
import DonutChartSimplified from './DonutChartSimplified';
import Styled from '../molecules/StyledLink';
import { IconChevronLeft } from '@tabler/icons-react';

type Props = {
  manufacturer: ManufacturersQuery['manufacturers'][0];
  className?: string;
}

const ManufacturerTopCard = ({ manufacturer, className }: Props) => {
  const { account } = useAccount();
  const is_you = (account.toLowerCase() === manufacturer.id.toLowerCase());
  return (
    <div className={`flex flex-col md:flex-row items-center md:items-start md:space-x-6 ${className}`}>
      <div className="w-full md:w-1/3">
        <DonutChartSimplified
          total={manufacturer.totalCount} sold={manufacturer.soldCount}
          returned={manufacturer.returnedCount} recycled={manufacturer.recycledCount}
        />
      </div>
      <div className="w-full md:w-2/3">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {manufacturer.name}
            </h2>
            {(is_you) && (<div className="bg-black text-xs px-1 py-0.5 text-white">YOU</div>)}
            <p className="text-gray-500 mt-1 break-words text-sm">{manufacturer.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">

            <div>
              <p className="text-gray-100 font-semibold">Address:</p>
              <p className="text-gray-200">{manufacturer.location}</p>
            </div>
            <div>
              <p className="text-gray-100 font-semibold">Contact:</p>
              <p className="text-gray-200">{manufacturer.contact}</p>
            </div>

            <div>
              <p className="text-gray-100 font-semibold">Products:</p>
              <p className="text-gray-200">{manufacturer.productsCount}</p>
            </div>

          </div>

        </div>

        <div className="flex justify-start mt-4">
          <Styled href="/manufacturers" className="flex items-center gap-2">
            <IconChevronLeft /> All Manufacturers
          </Styled>
        </div>

      </div>
    </div>
  )
}

export default ManufacturerTopCard