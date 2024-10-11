import { pie, PieArcDatum, arc } from 'd3'
import { useMemo, useState } from 'react'

type DonutChartData = { label: string; value: number; color: string }

interface IDonutChartProps {
  data: DonutChartData[]
}

const CustomDonutChart = ({ data }: IDonutChartProps) => {
  const [hoveredValue, setHoveredValue] = useState<DonutChartData | null>(null)

  const arcs = useMemo(() => {
    const coverage = 0.66 // 0 to 1
    const angle_coverage = coverage * Math.PI * 2 // 2xPI is full circle.
    const start_angle = -angle_coverage / 2
    const end_angle = angle_coverage / 2

    const calculateArcs = pie<DonutChartData>()
      .value((data) => data.value)
      .sort(null)
      .startAngle(start_angle)
      .endAngle(end_angle)
      .padAngle(0.008)

    const arcs = calculateArcs(data)

    console.log('arcs', arcs)
    return arcs
  }, [data])

  const diameter = 100
  const radius = diameter / 2
  const inner_radiusFactor = 0.6
  const inner_radius = radius * inner_radiusFactor
  const strokeWidth = 0.5

  const arcGenerator = arc<PieArcDatum<DonutChartData>>()
    .innerRadius(inner_radius)
    .outerRadius(radius)
    .cornerRadius(2)

  console.log('arcGenerator ', arcGenerator)

  return (
    <div>
      <svg>
        <g>
          {arcs.map((arc => {
            return (
              <path key={arc.data.label} fill={arc.data.color} d={arcGenerator(arc) || undefined} />
            )
          }))}
        </g>
      </svg>
    </div>
  )
}

export default CustomDonutChart;
