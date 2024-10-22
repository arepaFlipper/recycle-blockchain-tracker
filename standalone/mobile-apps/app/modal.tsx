import { StatusBar } from 'expo-status-bar';
import { Linking, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  const inner_text = `Recycle Blockchain Tracker is an app designed to encourage manufacturers
                      to track the toxic items their products contain and recycle them rather
                      than dumping them on the environment. By producting a comprehensive tracking
                      system, RechicleChain helps promote sustainability and environmentl responsibility.`
  const onPress = () => {
    Linking.openURL('https://github.com/arepaFlipper/recycle-blockchain-tracker');
  }
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Recycle Blockchain Tracker</Text>
      <Text>{inner_text}</Text>
      <Text>Learn more about the project and contribute to its develpment by visiting the GitHub repository:</Text>
      <Text onPress={onPress}>RecycleChain GitHub Repository</Text>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

});
