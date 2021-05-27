import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomColor: '#dcedc8',
    paddingHorizontal: 20,
    width: windowWidth,
  },
  simpleText: {
    color: '#FFF',
    fontSize: 20,
  },
  boldText: {
    color: '#FFF',
    fontSize: 23,
    fontWeight: 'bold',
    paddingTop: 15,
  },
});

const CustomInfoUserContent = ({ title, information }) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.boldText}>{title}</Text>
      </View>
      <Text style={styles.simpleText}>{information}</Text>
    </View>
  );
};

export { CustomInfoUserContent };
