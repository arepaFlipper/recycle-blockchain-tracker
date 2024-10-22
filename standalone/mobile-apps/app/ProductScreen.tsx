import React from 'react';
import StatusGrid from '@/components/recycle-chain/StatusGrid';
import ToxicItemsChart from '@/components/recycle-chain/ToxicItemsChart';
import { ProductDocument } from '@/gql/generated';
import { useQuery } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ProductScreenRouteProp, styles } from './product';

export const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;
  const router = useRouter();

  const { data, loading } = useQuery(ProductDocument, {
    variables: { where: { id: productId } },
  });

  const navigation = useNavigation();

  useEffect(() => {
    const title = data?.product.name;
    navigation.setOptions({ title });
  }, [navigation, productId, data]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Product not found.</Text>;
  }

  const on_press = () => {
    router.push(`/productItems?productId=${data.product.id}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.productDetails}>
        <Text style={styles.title}>{data.product.name}</Text>
        <Text style={styles.company}>{data.product.manufacturer.name}</Text>
        <StatusGrid
          sold={data.product.soldCount}
          returned={data.product.returnedCount}
          recycled={data.product.recycledCount}
          total={data.product.totalCount} />
        <ToxicItemsChart toxic_items={data.product.toxicItems} />
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={on_press}
        >
          <View style={styles.actionButton}>
            <Text>View all items</Text>
            <Text>
              <Entypo name="chevron-right" size={16} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

