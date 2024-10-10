import { pie, PieArcDatum, arc } from 'd3';
import { useMemo } from 'react'

type TData = {
  label: string;
  value: number;
  color: string;
}

interface TDonutProps {
  data: TData[];
}

const CustomDonutChart = ({ data }: TDonutProps) => {
  const arcs = useMemo(() => {
    const coverage = 0.66; // 0 to 1
    const angle_coverage = Math.PI * coverage; // NOTE: full circle in radians
    const start_angle = -angle_coverage / 2;
    const end_angle = -angle_coverage / 2;

    const calculateArcs = pie<TData>()
      .value((data) => data.value).sort(null)
      .startAngle(start_angle).endAngle(end_angle);

    console.log(`🧰 %cCustomDonutChart.tsx:25 - calculateArcs`, 'font-weight:bold; background:#679800;color:#fff;'); //DELETEME:
    console.log(calculateArcs); // DELETEME:

    const calculatedArcs = calculateArcs(data);
    console.log(`🐨%cCustomDonutChart.tsx:29 - calculatedArcs`, 'font-weight:bold; background:#718e00;color:#fff;'); //DELETEME:
    console.log(calculatedArcs); // DELETEME:

    return calculatedArcs;
  }, [data]);
  const diameter = 100;
  const radius = diameter / 2;
  const innerRadiusFactor = 0.6;
  const innerRadius = radius * innerRadiusFactor;
  const arcGenerator = arc<PieArcDatum<TData>>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  console.log(`🌍%cCustomDonutChart.tsx:41 - arcGenerator`, 'font-weight:bold; background:#897600;color:#fff;'); //DELETEME:
  console.log(arcGenerator); // DELETEME:

  return (
    <div>
      <svg>
        <g>
          {arcs.map((arc => <path key={arc.data.label} fill={arc.data.color} d={arcGenerator(arc) as string} />))}
        </g>
      </svg>
    </div>
  )
}

export default CustomDonutChart
