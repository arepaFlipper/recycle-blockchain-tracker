"use client"
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@apollo/client';
import { ProductsDocument, ProductsQuery } from '../../gql/generated';

export default function TabOneScreen() {
  const { data, loading, fetchMore } = useQuery(ProductsDocument);

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
      }
    })
  };

  return (
    <View>
      <FlatList
        <ProductsQuery['products'][0]>
        data={data?.products}
        renderItem={({ item }) => {
          console.log(`👓%ctwo.tsx:26 - item`, 'font-weight:bold; background:#6a9500;color:#fff;'); //DELETEME:
          console.log(item); // DELETEME:
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.manufacturer.name}</Text>
            </View>
          )
        }}
        onEndReached={loadMore}
      />
    </View>
  );
};

