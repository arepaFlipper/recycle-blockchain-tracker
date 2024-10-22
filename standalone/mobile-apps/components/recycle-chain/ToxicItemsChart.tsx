import { ProductsQuery } from '@/gql/generated';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

type Props = {
  toxic_items: ProductsQuery['products'][0]['toxicItems'];
}

const ToxicItemsChart = ({ toxic_items }: Props) => {
  const total_weight = toxic_items.reduce((sum, item) => sum + item.weight, 0);
  return (
    <View style={styles.container}>
      {toxic_items.map((item) => {
        const width_percentage = (item.weight / total_weight) * 100;
        console.log(`⏺️%cToxicItemsChart.tsx:15 - width_percentage`, 'font-weight:bold; background:#48b700;color:#fff;'); //DELETEME:
        console.log(width_percentage); // DELETEME:
        return (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.itemWeight}>{item.weight} mg</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${width_percentage}%` }]}>
                <Text style={styles.itemWeight}>{width_percentage}%</Text>
              </View>
            </View>
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
  progressBar: {
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  progressBarContainer: {
    borderColor: '#FFF',
    width: '100%',
    borderWidth: 1,
    borderRadius: 4,
  }
});

export default ToxicItemsChart
