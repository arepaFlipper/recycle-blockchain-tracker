"use client";
import { useQuery } from '@apollo/client';
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated';

const Page = () => {
  const { data } = useQuery(ManufacturerDocument);
  console.log(`📰 %cpage.tsx:7 - data`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <div>Manufacturers {JSON.stringify(data, null, 2)}</div>
  );
};

export default Page
