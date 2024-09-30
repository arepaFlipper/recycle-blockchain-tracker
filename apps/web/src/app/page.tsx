'use client'
import { useAccount } from "@/hooks/ether";

const Home = () => {
  const { account, balance, contract, isOwner } = useAccount();
  return (
    <main>
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>
      <div>Is it Owner: {String(isOwner)}</div>
    </main>
  )
}

export default Home;
