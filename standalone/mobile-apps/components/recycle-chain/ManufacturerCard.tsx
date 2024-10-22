import { ManufacturersQuery } from "@/gql/generated";
import { View, Text, StyleSheet } from "react-native";

interface ManufacturerCardProps {
  manufacturer: ManufacturersQuery['manufacturers'][0];
}

const ManufacturerCard = ({ manufacturer }: ManufacturerCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{manufacturer.name}</Text>
      <Text style={styles.text}>{manufacturer.location}</Text>
      <Text style={styles.text}>{manufacturer.contact}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  }
})

export default ManufacturerCard;
