import { ProductsQuery } from '@/gql/generated';
import { View, Text } from 'react-native';
import { styles } from './ManufacturerCard';

type Props = {
  product: ProductsQuery['products'][0];
}

const ProductCard = ({ product }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.manufacturer.name}</Text>
      <Text style={styles.description}>{product.totalCount}</Text>
    </View>
  )
}

export default ProductCard
