import { ProductsQuery } from '@/gql/generated';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './ManufacturerCard';
import { useRouter } from 'expo-router';

type Props = {
  product: ProductsQuery['products'][0];
}

const ProductCard = ({ product }: Props) => {
  const router = useRouter();
  const on_press = () => {
    router.push(`/product?productId=${product.id}`)
  }
  return (
    <TouchableOpacity onPress={on_press}>
      <View style={styles.card}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.manufacturer.name}</Text>
        <Text style={styles.description}>{product.totalCount} items</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
