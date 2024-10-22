import { FlatList, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@apollo/client';
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated';
import ManufacturerCard from '@/components/recycle-chain/ManufacturerCard';

export default function TabTwoScreen() {
  const { data, loading, fetchMore } = useQuery(ManufacturersDocument);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.manufacturers?.length,
        take: 8,
      }
    })
  }

  return (
    <View>
      <FlatList
        <ManufacturersQuery['manufacturers'][0]>
        data={data?.manufacturers}
        renderItem={({ item }) => {
          return <ManufacturerCard manufacturer={item} />
        }}
        onEndReached={loadMore}
      />
    </View>
  );
};