import { IconBox } from '@tabler/icons-react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

const NoItemsFound = ({ children = 'No items found 🥱' }: Props) => {
  return (
    <div className="h-[150px] w-full flex-col flex justify-center items-center">
      <IconBox />
      <div className="text-gray">{children}</div>
    </div>
  )
}

export default NoItemsFound
