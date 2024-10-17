import { ProductStatus } from '@recycle-chain/network/src/gql/generated';
import { IconArrowBackUp, IconBuildingFactory2, IconPlant, IconUser } from '@tabler/icons-react';
import { format } from 'date-fns'

type TimelineProps = {
  events: { timestamp: string; status: ProductStatus }[],
  className?: string,
}

export const Icons = {
  [ProductStatus.Manufactured]: <IconBuildingFactory2 />,
  [ProductStatus.Sold]: <IconUser />,
  [ProductStatus.Returned]: <IconArrowBackUp />,
  [ProductStatus.Recycled]: <IconPlant className="text-green-600" />,
}

const Timeline = ({ events, className }: TimelineProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {events.map((event, index) => {
        const last_item = index === events.length - 1;
        return (
          <div key={index} className="flex items-start relative">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full border 
              ${(last_item) ?
                    'shadow-lg shadow-black/30 border-black p-1' :
                    'bg-gray-50 border-gray-50 p-1 text-gray'
                  }`}
              >
                {Icons[event.status]}
              </div>
              {(!last_item) ?
                (<div className="w-0.5 h-full min-h-6 my-2 bg-gray-300" />)
                :
                (<div className="my-2" />)
              }
            </div>
            <div>
              <div className={`${(last_item) ? "font-semibold" : ""} text-sm`}>
                {event.status}
              </div>
              <div className="text-xs text-gray-500">
                {format(new Date(event.timestamp), 'PPp')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Timeline;
