import { ProductsDocument, ProductsQuery } from "@/gql/generated";
import { useQuery } from "@apollo/client";
import { View } from "react-native";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";

type Props = {
  manufacturerId: string;
}

const ManufacturerProducts = ({ manufacturerId }: Props) => {
  const { data, loading, fetchMore } = useQuery(ProductsDocument, {
    variables: { where: { manufacturerId: { equals: manufacturerId } } },
  });
  return (
    <View>
      <FlatList<ProductsQuery['products'][0]>
        data={data?.products || []}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => fetchMore({ variables: { skip: data?.products?.length } })}
      />
    </View>
  )
}

export default ManufacturerProducts
