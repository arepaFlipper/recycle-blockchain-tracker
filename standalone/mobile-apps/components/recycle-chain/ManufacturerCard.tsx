import { ManufacturersQuery } from "@/gql/generated";
import { View, Text, StyleSheet } from "react-native";

interface ManufacturerCardProps {
  manufacturer: ManufacturersQuery['manufacturers'][0];
}

const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{manufacturer.name}</Text>
      <Text style={styles.description}>{manufacturer.location}</Text>
      <Text style={styles.description}>{manufacturer.contact}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    color: '#fff',
  }
})

export default ManufacturerCard;
