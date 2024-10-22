import { View, Text, StyleSheet } from "react-native";

interface ProductCardProps {
  total: number;
  sold: number;
  returned: number;
  recycled: number;
}

const StatusGrid = ({ total, sold, returned, recycled }: ProductCardProps) => {
  const inventory = total - (sold + returned + recycled);
  return (
    <View style={styles.statusGrid}>
      <View style={styles.statusItem}>
        <Text style={styles.statusItemTitle}>Inventory</Text>
        <Text style={styles.description}>{inventory}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sold</Text>
        <Text style={styles.description}>{sold}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Returned</Text>
        <Text style={styles.description}>{returned}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Recycled</Text>
        <Text style={styles.description}>{recycled}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 12,
  },
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
    color: '#fff',
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    color: '#fff',
  },
  container: {
    backgroundColor: '#181825',
  },

  statusItem: {
    width: '25%',
    alignItems: 'center',
    padding: 6,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  statusItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
})

export default StatusGrid;

