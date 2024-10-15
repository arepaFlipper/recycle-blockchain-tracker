import { ProductsQuery } from "@recycle-chain/network/src/gql/generated";

type TToxicItems = {
  toxicItems: ProductsQuery['products'][0]['toxicItems'];
}

const ToxicItemsChart = ({ toxicItems }: TToxicItems) => {
  const total_weight = toxicItems.reduce((sum, item) => sum + item.weight, 0);
  return (
    <div className="w-full">
      {toxicItems.map((item) => {
        const width_percentage = (item.weight / total_weight) * 100;
        return (
          <div key={item.id} className="mb-4">
            <div className="text-sm flex justify-between">
              <span className="font-medium">{item.name}</span>
              <span className="text-gray text-sm">{item.weight} mg</span>
            </div>
            <div className="w-full bg-gray-25 h-1 rounded">
              <div className="bg-gradient-to-tr from-gray-800 to-gray-200 h-full rounded" style={{ width: `${width_percentage}%` }}>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ToxicItemsChart
