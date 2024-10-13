import { ScrollText } from '../molecules/ScrollText'
import { PlantIcon } from '../atoms/PlantIcon'

export const Logo = () => {
  return (
    <div className="relative flex items-center gap-2">
      <PlantIcon />

      <div className="z-10 text-black text-xl font-semibold ">
        <div>Recycle Chain</div>
        <div className="text-xs text-gray">Blockchain Tracker</div>
      </div>

      <div className="absolute top-0 z-20 px-1 mb-4 -translate-x-1 -translate-y-1/2 left-full">
        <ScrollText
          items={[
            'Web3',
            'Dapp',
            'Decentralized',
            'Trustless',
            'Permissionless',
            'On-chain',
            'Blockchain',
            'Smart Contract Driven',
            'Crypto-powered',
            'Distributed Ledger Technology',
          ]}
          className="px-2 text-xs font-semibold text-black border border-white rounded shadow-xl bg-white/30 backdrop-blur-sm whitespace-nowrap"
        />
      </div>
    </div>
  )
}
