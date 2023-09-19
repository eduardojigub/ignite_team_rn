import { StyleSheet, Text, View } from 'react-native';

export function Groups() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Groupssssssss</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 32,
  },
});
