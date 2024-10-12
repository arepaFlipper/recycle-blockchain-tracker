import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

interface PaginationProps {
  setSkip: (skip: number) => void;
  setTake: (take: number) => void;
  skip: number;
  take: number;
  resultCount?: number;
  totalCount?: number;
  className?: string;
}

const Pagination = ({ setSkip, setTake, skip, take, resultCount, totalCount, className }: PaginationProps) => {
  const handleNext = () => {
    setSkip(skip + take);
  }

  const handlePrev = () => {
    setSkip(Math.max(skip - take, 0));
  }

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className={`flex mb-8 justify-center ${className}`}>
      <div className="rounded flex items-center gap-3">
        <button onClick={handlePrev} disabled={skip === 0} className="desabled:text-gray-400 bg-white rounded-full">
          <IconArrowLeft className="w-8 h-8" />
        </button>
        <span className="text-xl">
          {`${skip + 1} - ${skip + (resultCount || 0)}`}{' '}
          <span className="text-sm">of {totalCount}</span>
        </span>
        <button
          onClick={handleNext}
          disabled={(skip + take) >= (totalCount ?? 0)}
          className="desabled:text-gray-400 bg-white rounded-full"
        >
          <IconArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )

}

export default Pagination;
