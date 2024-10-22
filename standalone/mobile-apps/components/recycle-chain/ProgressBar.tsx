import { View, Text, StyleSheet } from "react-native";

type Props = {
  width_percentage: number;
}

const ProgressBar = ({ width_percentage }: Props) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${width_percentage}%` }]}>
        <Text style={styles.itemWeight}>{width_percentage}%</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 5,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
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
  },
  itemWeight: {
    marginLeft: 8,
    color: 'snow',
  },
})
export default ProgressBar;
