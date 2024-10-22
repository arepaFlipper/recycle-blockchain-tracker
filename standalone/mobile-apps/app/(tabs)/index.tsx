"use client"
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@apollo/client';
import { ProductsDocument, ProductsQuery } from '../../gql/generated';
import ProductCard from '@/components/recycle-chain/ProductCard';

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
    <View style={{ backgroundColor: '#252525' }}>
      <FlatList
        <ProductsQuery['products'][0]>
        data={data?.products}
        renderItem={({ item }) => {
          return (
            <ProductCard product={item} />
          )
        }}
        onEndReached={loadMore}
      />
    </View>
  );
};

