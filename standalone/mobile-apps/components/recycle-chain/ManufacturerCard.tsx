import { ManufacturersQuery } from "@/gql/generated";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ManufacturerCardProps {
  manufacturer: ManufacturersQuery['manufacturers'][0];
}

const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/manufacturer?manufacturerId=${manufacturer.id}`)}>
      <View style={styles.card}>
        <Text style={styles.title}>{manufacturer.name}</Text>
        <Text style={styles.description}>{manufacturer.location}</Text>
        <Text style={styles.description}>{manufacturer.contact}</Text>
      </View>
    </TouchableOpacity>
  );

}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF',
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    color: '#fff',
  },
  container: {
    backgroundColor: '#181825',
  }
})

export default ManufacturerCard;
