"use client"
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useQuery } from '@apollo/client';
import { ManufacturersDocument } from '../../gql/generated';

export default function TabOneScreen() {
  const { data, loading } = useQuery(ManufacturersDocument);
  console.log(`🍌%cindex.tsx:10 - data`, 'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
