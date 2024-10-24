import { ManufacturersDocument, ManufacturersQuery } from '@recycle-chain/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { useTakeSkip } from '@recycle-chain/util/src/hooks/pagination';
import { PageTitle } from '../atoms/PageTitle';
import ManufacturerRegisterButton from '../molecules/ManufacturerRegisterButton';
import { ShowData } from '../organisms/ShowData';
import ManufacturerCard from '../organisms/ManufacturerCard';
import { LoaderPanel } from '../molecules/Loader';

const AllManufacturers = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip();

  const { loading, data, error } = useQuery(ManufacturersDocument, {
    variables: { skip, take },
  })

  if (loading) {
    return <LoaderPanel />
  }

  return (
    <div>
      <div className="flex gap-2 justify-between items-baseline">
        <PageTitle>Manufacturers</PageTitle>
        <ManufacturerRegisterButton />
      </div>
      <ShowData
        loading={loading}
        error={error?.message}
        pagination={{
          setSkip,
          setTake,
          skip,
          take,
          resultCount: data?.manufacturers.length,
          totalCount: data?.manufacturersCount,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 "
        title="Manufacturers"
      >
        {data?.manufacturers?.map((manufacturer: ManufacturersQuery['manufacturers'][0]) => {
          return (
            <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
          )
        })}
      </ShowData>
    </div>
  )
};

export default AllManufacturers;
