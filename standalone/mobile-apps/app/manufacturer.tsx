import { ManufacturerDocument, ManufacturerQuery } from "@/gql/generated";
import { Text, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import StatusGrid from "@/components/recycle-chain/StatusGrid";

type RootStackParamList = {
  manufacturer: { manufacturerId: string };
}

type ManufacturerScreenRouteProp = RouteProp<RootStackParamList, 'manufacturer'>;

const ManufacturerScreen = () => {
  const route = useRoute<ManufacturerScreenRouteProp>();
  const { manufacturerId } = route.params;
  const { data, loading, error } = useQuery<ManufacturerQuery>(
    ManufacturerDocument,
    {
      variables: { where: { id: manufacturerId } },
    }
  );

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: data?.manufacturer.name || 'Manufacturer',
    });
  }, [navigation, data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!data?.manufacturer) {
    return <Text>Manufacturer {manufacturerId} not found</Text>
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Name: {data.manufacturer.name}</Text>
        <Text style={styles.details}>{data.manufacturer.location}</Text>
        <Text style={styles.contact}>{data.manufacturer.contact}</Text>
        <StatusGrid
          total={data.manufacturer.totalCount || 0}
          sold={data.manufacturer.soldCount || 0}
          returned={data.manufacturer.returnedCount || 0}
          recycled={data.manufacturer.recycledCount || 0}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  details: {
    color: '#CCC',
  },
  contact: {
    color: '#AAA',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

});

export default ManufacturerScreen;
