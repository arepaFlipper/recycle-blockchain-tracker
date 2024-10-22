import { ProductDocument } from "@/gql/generated";
import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Text, StyleSheet, View } from "react-native";
import { useEffect } from "react";

type RootStackParamList = {
  product: { productId: string };
}

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>;

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;

  const { data, loading } = useQuery(ProductDocument, {
    variables: { where: { id: productId } }
  });

  const navigation = useNavigation();

  useEffect(() => {
    const title = data?.product.name;
    navigation.setOptions({ title });
  }, [navigation, productId, data]);

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (!data?.product) {
    return <Text>Product {productId} not found.</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{data.product.name}</Text>
        <Text style={styles.description}>{data.product.manufacturer.name}</Text>
        <Text style={styles.description}>{data.product.totalCount} items</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    padding: 20,
    backgroundColor: '#212121',
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
})

export default ProductScreen;
