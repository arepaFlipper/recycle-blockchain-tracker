import { PageTitle } from '../atoms/PageTitle';
import { AlertSection } from '../molecules/AlertSection';
import { LoaderPanel } from '../molecules/Loader';
import NoItemsFound from '../molecules/NoItemsFound';
import Pagination from '../molecules/Pagination'

interface ShowDataProps {
  error?: string;
  loading?: boolean;
  pagination: {
    setSkip: (skip: number) => void;
    setTake: (take: number) => void;
    skip: number;
    take: number;
    resultCount?: number;
    totalCount?: number;
  }
  title?: React.ReactNode;
  children: React.ReactNode;
  totalCount?: number
  className?: string;
}

export const ShowData: React.FC<ShowDataProps> = ({
  error,
  loading,
  pagination,
  title,
  children,
  className = 'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}: ShowDataProps) => {
  if (loading) {
    return <LoaderPanel />
  }

  if (error) {
    return (
      <div>
        <div className="font-bold text-lg">Error</div>
        <div>{error}</div>
      </div>
    )
  }

  if (pagination.totalCount === 0) {
    return (
      <AlertSection> No results </AlertSection>
    )
  }

  return (
    <div className="show-data">
      {title && <PageTitle>{title}</PageTitle>}
      <div className={`${(className) ?? ''}`}>{children}</div>
      {(pagination.totalCount === 0) && (<NoItemsFound> <></></NoItemsFound>)}
      <Pagination
        setSkip={pagination.setSkip}
        setTake={pagination.setTake}
        skip={pagination.skip}
        take={pagination.take}
        resultCount={pagination.resultCount}
        totalCount={pagination.totalCount}
        className="mt-8"
      />
    </div>
  )
}
