'use client'

import CustomDonutChart from "@recycle-chain/ui/src/components/organisms/CustomDonutChart"
import { useAccount } from "@/hooks/ether";
import { useQuery } from "@apollo/client";
import { ProductsDocument } from "@recycle-chain/network/src/gql/generated";
import { HtmlInput } from '@recycle-chain/ui/src/components/atoms/HtmlInput';
import { HtmlLabel } from '@recycle-chain/ui/src/components/atoms/HtmlLabel';
import { SustainabilityScene } from '@recycle-chain/3d/src/scenes/SustainabilityScene';

const Home = () => {
  const { account, balance, contract, isOwner } = useAccount();
  const { data, loading } = useQuery(ProductsDocument);
  console.log(`🪅%cpage.tsx:9 - data`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  const sample_data = [
    { label: 'MANUFACTURED', value: 19, color: 'hsl(142,2%,75%)' },
    { label: 'SOLD', value: 23, color: 'hsl(142,2%,36%)' },
    { label: 'RETURNED', value: 22, color: 'hsl(142,76%,75%)' },
    { label: 'RECYCLED', value: 121, color: 'hsl(142,76%,36%)' },
  ]
  return (
    <main>
      <SustainabilityScene />
      {/* <CustomDonutChart data={sample_data} /> */}
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>
      <div>Is it Owner: {String(isOwner)}</div>

      <div>
        {data?.products.map((product) => {
          return (
            <div key={product.id}>
              <div>id: {product.id} - name: {product.name}</div>
            </div>
          )
        })}
      </div>

      <input placeholder="Type something..." className="rounded-md" />
      <HtmlLabel title="Something" optional className="mt-8" error="Something is not right!">
        <HtmlInput placeholder="Type something..." type="number" />
      </HtmlLabel>
      <div className="w-8 h-8 bg-primary rounded"></div>
    </main>
  )
}

export default Home;
