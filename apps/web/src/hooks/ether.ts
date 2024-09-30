import { useEffect, useState } from "react";
import { RecycleChain } from '../../../../standalone/recycle-chain-contract/typechain-types';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any
  }
}

export const useAccount = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [contract, setContract] = useState<RecycleChain | null>(null);

  const initializeWeb3Provider = async () => {
    if (!window?.ethereum) {
      alert('Non-Etherum browser detected. You should consider trying MetaMask!')
      return
    }

    // const provider = new ethers.BrowserProvider(window.ethereum);

    try {
      await window.ethereum.request(
        {
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13882', // NOTE: This is the hex rep. of 80002
            chainName: 'Polygon Amoy Testnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            blockExplorerUrls: ['https://amoy.polygonscan.com/'],
            rpcUrls: [
              `https://polygon-amoy.infure.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
            ],
          }],
        }
      );
    } catch (error) {
      console.error('User denied account access or failed to add network')
    }
  }
  useEffect(() => {

    // NOTE: initializeWeb3Provider

    initializeWeb3Provider()
    // NOTE: Fetch blockchain information
  }, [])
  return { account, balance, isOwner, contract }
}
