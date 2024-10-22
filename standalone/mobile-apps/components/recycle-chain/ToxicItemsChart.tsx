import { ProductsQuery } from '@/gql/generated';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import ProgressBar from './ProgressBar';

type Props = {
  toxic_items: ProductsQuery['products'][0]['toxicItems'];
}

const ToxicItemsChart = ({ toxic_items }: Props) => {
  const total_weight = toxic_items.reduce((sum, item) => sum + item.weight, 0);
  return (
    <View style={styles.container}>
      {toxic_items.map((item) => {
        const width_percentage = (item.weight / total_weight) * 100;
        return (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.itemWeight}>{item.weight} mg</Text>
            </View>

            <ProgressBar width_percentage={width_percentage} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  itemContainer: {
    marginBottom: 10,
  },
  name: {
    marginLeft: 8,
    color: '#FFF',
  },
  itemWeight: {
    marginLeft: 8,
    color: 'snow',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    alignItems: 'center',
    color: '#FFF',
  },
});

export default ToxicItemsChart
