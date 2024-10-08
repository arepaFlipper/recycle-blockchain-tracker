"use client";
import { useQuery } from '@apollo/client';
import { ManufacturersDocument } from '@recycle-chain/network/src/gql/generated';

const Page = () => {
  const { data } = useQuery(ManufacturersDocument);
  console.log(`📰 %cpage.tsx:7 - data`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <pre>Manufacturers {JSON.stringify(data, null, 2)}</pre>
  );
};

export default Page
