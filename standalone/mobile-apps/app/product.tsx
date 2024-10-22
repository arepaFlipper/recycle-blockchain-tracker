import StatusGrid from '@/components/recycle-chain/StatusGrid'
import { ProductDocument } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'

type RootStackParamList = {
  product: { productId: string }
}

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>()
  const { productId } = route.params
  const router = useRouter()

  const { data, loading } = useQuery(ProductDocument, {
    variables: { where: { id: productId } },
  })

  const navigation = useNavigation()

  useEffect(() => {
    const title = data?.product.name
    navigation.setOptions({ title })
  }, [navigation, productId, data])

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (!data) {
    return <Text>Product not found.</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.productDetails}>
        <Text style={styles.title}>{data.product.name}</Text>
        <Text style={styles.company}>{data.product.manufacturer.name}</Text>
        <StatusGrid
          sold={data.product.soldCount}
          returned={data.product.returnedCount}
          recycled={data.product.recycledCount}
          total={data.product.totalCount}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
  },
  actionButtonContainer: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row', // Align text and icon in a row
    alignItems: 'center', // Center vertically
  },
  productDetails: {
    padding: 16,
    backgroundColor: 'transparent',
    marginBottom: 8,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  company: {
    fontSize: 12,
    color: '#fff',
  },
})

export default ProductScreen
