"use client";
import { useQuery } from '@apollo/client';
import { ManufacturersDocument } from '@recycle-chain/network/src/gql/generated';
import AllManufacturers from '@recycle-chain/ui/src/components/templates/AllManufacturers';

const Page = () => {
  const { data } = useQuery(ManufacturersDocument);
  console.log(`📰 %cpage.tsx:7 - data`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <AllManufacturers />
  );
};

export default Page
