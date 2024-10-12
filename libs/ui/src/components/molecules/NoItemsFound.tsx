import { IconBox } from '@tabler/icons-react';

const NoItemsFound = () => {
  return (
    <div className="h-[150px] w-full flex-col flex justify-center items-center">
      <IconBox />
      <div className="text-gray">No items found.</div>
    </div>
  )
}

export default NoItemsFound
