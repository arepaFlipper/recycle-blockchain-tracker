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
  const inner_radiusFactor = 0.9
  const inner_radius = radius * inner_radiusFactor
  const strokeWidth = 0.5

  const arcGenerator = arc<PieArcDatum<DonutChartData>>()
    .innerRadius(inner_radius)
    .outerRadius(radius)
    .cornerRadius(2)

  console.log('arcGenerator ', arcGenerator)

  return (
    <div className="relative">
      <svg viewBox={`${-strokeWidth / 2} ${-strokeWidth / 2} ${diameter + strokeWidth} ${diameter - 25}`}>
        <filter id="shadow" height={'200%'} width={'200%'}>
          <feDropShadow dx={0} dy={4} stdDeviation={'.2'} floodColor={"#000"} floodOpacity={'.2'} />
        </filter>
        <g transform={`translate(${radius}, ${radius})`}>
          {arcs.map((arc => {
            const hovered = arc.data.label === hoveredValue?.label
            console.log(`🗞️ %cCustomDonutChart.tsx:54 - arc.data.color`, 'font-weight:bold; background:#9b6400;color:#fff;'); //DELETEME:
            console.log(arc.data.color); // DELETEME:
            return (
              <path
                key={arc.data.label}
                fill={arc.data.color}
                d={arcGenerator(arc) as string}
                onMouseOver={() => setHoveredValue(arc.data)}
                onMouseOut={() => setHoveredValue(null)}
                stroke={hovered ? 'white' : 'none'}
                strokeWidth={hovered ? strokeWidth : 0}
                filter={hovered ? 'url(#shadow)' : 'none'}
              />
            )
          }))}
        </g>
      </svg>
      <div className="mb-2 absolute bottom-0 w-36 left-1/2 -translate-x-1/2">
        {(hoveredValue) ? (
          <div className="flex flex-col items-center" style={{ color: hoveredValue.color }}>
            <div className="text-5xl">{hoveredValue.value}</div>
            {hoveredValue.label}
          </div>
        ) : (
          <div className="text-center text-sm text-gray">
            Hover over the arcs.
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomDonutChart;
