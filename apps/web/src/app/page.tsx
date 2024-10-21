'use client'

import CustomDonutChart from "@recycle-chain/ui/src/components/organisms/CustomDonutChart"
import { useAccount } from "@/hooks/ether";
import { useQuery } from "@apollo/client";
import { ProductsDocument } from "@recycle-chain/network/src/gql/generated";
import { HtmlInput } from '@recycle-chain/ui/src/components/atoms/HtmlInput';
import { HtmlLabel } from '@recycle-chain/ui/src/components/atoms/HtmlLabel';
import SustainabilityScene from '@recycle-chain/3d/src/scenes/SustainabilityScene';
import Link from "next/link";

const Home = () => {
  const { account, balance, contract, isOwner } = useAccount();
  const { data } = useQuery(ProductsDocument);
  return (
    <main>
      <div className="absolute inset-x-0">
        <SustainabilityScene />
      </div>
      <div className="absolute inset-x-0 max-w-3xl p-6 md:p-12 text-white">
        <h1 className="font-black text-3xl md:text-5xl sm:text-6xl ">
          Have you wondered, {' '}
          where do our{' '}
          <span className="bg-gradient-to-tr from-gray to-red text-transparent bg-clip-text whitespace-nowrap ">
            toxic wastes
          </span>{' '}
          go?
        </h1>
        <div className="flex gap-2 mt-4">
          {["manufacturers", "products"].map((path) => {
            const upper_case = path[0].toUpperCase() + path.slice(1);
            return (
              <Link key={path} href={`/${path}`} className="bg-black text-white px-4 py-2">
                {upper_case}
              </Link>
            )
          })}
        </div>
      </div>
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
