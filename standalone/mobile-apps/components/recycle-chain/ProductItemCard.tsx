import { ProductItemsQuery } from "@/gql/generated"
import { useRouter } from "expo-router"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type ProductItemCardProps = {
  item: ProductItemsQuery['productItems'][0]
}

const ProductItemCard = ({ item }: ProductItemCardProps) => {
  const router = useRouter();
  const on_press = () => {
    router.push({ pathname: '/productItemTimeline', params: { productItemId: item.id } });
  }
  return (
    <TouchableOpacity onPress={on_press}>
      <View style={styles.card}>
        <Text style={styles.itemId}>{item.id}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181826',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#181826',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    color: '#FFF',
    width: '100%',
  },
  itemId: {
    fontSize: 24,
    color: '#FFF',
  },
  status: {
    fontSize: 16,
    color: '#FFF',
  }
});

export default ProductItemCard;
