import { ManufacturersQuery } from "@recycle-chain/network/src/gql/generated"
import { useAccount } from "@recycle-chain/util/src/hooks/ether"
import { ReactNode } from "react"
import DonutChartSimplified from "../organisms/DonutChartSimplified"

type CardProps = {
  manufacturer: ManufacturersQuery['manufacturers'][0],
  children?: ReactNode
}

const ManufacturerCard = ({ manufacturer }: CardProps) => {
  const { account } = useAccount();
  const is_you = (account.toLowerCase() === manufacturer.id.toLowerCase());
  return (
    <div className="bg-white flex flex-col p-4 shadow-lg h-full rounded">
      <DonutChartSimplified
        recycled={manufacturer.recycledCount}
        returned={manufacturer.returnedCount}
        sold={manufacturer.soldCount}
        total={manufacturer.totalCount}
      />
    </div>
  )
}

export default ManufacturerCard
