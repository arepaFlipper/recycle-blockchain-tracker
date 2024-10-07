'use client'
import { useAccount } from "@/hooks/ether";
import { useQuery } from "@apollo/client";
import { ProductsDocument } from "@recycle-chain/network/src/gql/generated";

const Home = () => {
  const { account, balance, contract, isOwner } = useAccount();
  const { data, loading } = useQuery(ProductsDocument);
  console.log(`🪅%cpage.tsx:9 - data`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <main>
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
    </main>
  )
}

export default Home;
