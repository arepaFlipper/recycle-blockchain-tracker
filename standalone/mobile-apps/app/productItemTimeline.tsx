import { ProductStatus, TransactionsDocument, TransactionsQuery } from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ComponentProps, useEffect } from 'react';
import { TabBarIcon } from './(tabs)/_layout';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

type RootStackParamList = {
  product: { productItemId: string };
}

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

type StatusIconProps = Record<ProductStatus, ComponentProps<typeof FontAwesome>['name']>

const statusIconMap: StatusIconProps = {
  [ProductStatus.Manufactured]: 'industry',
  [ProductStatus.Sold]: 'shopping-cart',
  [ProductStatus.Returned]: 'undo',
  [ProductStatus.Recycled]: 'recycle',
}

const ProductItemTimelineScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productItemId } = route.params;

  const { data, loading, fetchMore } = useQuery(TransactionsDocument, {
    variables: {
      where: { productItemId: { equals: productItemId } },
      skip: 0,
      take: 8,
    }
  });

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `${productItemId} timeline`,
    });
  }, [navigation, productItemId]);

  const loadMoreItems = async () => {
    await fetchMore({
      variables: {
        skip: data?.transactions?.length,
        take: 8,
      }
    })
  }

  if (loading) {
    return (
      <TabBarIcon name="dot-circle-o" color="#000" />
    )
  }

  return (
    <FlatList<TransactionsQuery['transactions'][0]>
      data={data?.transactions || []}
      renderItem={({ item, index }) => {
        const is_active = index === (data?.transactions?.length || 0) - 1;
        return (
          <View style={is_active ? styles.productItemActive : styles.productItem}>
            <TabBarIcon name={statusIconMap[item.status]} color={is_active ? 'lightgreen' : 'gray'} />
            <View style={styles.textContainer}>
              <Text style={[styles.date, { color: is_active ? 'white' : 'gray' }]}>
                {format(new Date(item.timestamp), 'PPp')}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 16,
  },
  date: {
    fontWeight: 'semibold',
    marginBottom: 4,
    fontSize: 18,
    color: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 8,
  },
  productItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#666",
    marginBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: 'lightgreen',
  }
});

export default ProductItemTimelineScreen;
