'use client'
import { useAccount } from "@/hooks/ether";

const Home = () => {
  const { account, balance, contract, isOwner } = useAccount();
  return <main>Hello World</main>;
}

export default Home;
