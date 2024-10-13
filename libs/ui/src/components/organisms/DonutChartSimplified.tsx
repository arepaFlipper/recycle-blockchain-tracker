import NoItemsFound from "../molecules/NoItemsFound";
import CustomDonutChart from "./CustomDonutChart";

interface ProductStatusChartProps {
  total: number;
  sold: number;
  returned: number;
  recycled: number;
};

const DonutChartSimplified = ({ total, sold, returned, recycled }: ProductStatusChartProps) => {
  const manufactured = total - (sold + returned + recycled);
  if (!total) {
    return (
      <div className="aspect-[4/3] bg-[#1F1F1F] flex justify-center items-center ">
        <NoItemsFound />
      </div>
    )
  }
  return (
    <CustomDonutChart data={[
      { label: 'MANUFACTURED', value: manufactured, color: 'hsl(142,2%, 75%)' },
      { label: 'SOLD', value: sold, color: 'hsl(142,2%, 36%)' },
      { label: 'RETURNED', value: returned, color: 'hsl(142,76%, 75%)' },
      { label: 'RECYCLED', value: recycled, color: 'hsl(142,76%, 36%)' },
    ]} />
  )
}

export default DonutChartSimplified
