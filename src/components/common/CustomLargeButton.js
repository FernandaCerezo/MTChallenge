import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#75a478',
    borderRadius: 20,
    padding: 10,
  },
  whiteText: {
    color: 'white',
    fontSize: 17,
  },
});

const CustomLargeButton = ({ actionPress = () => {}, textButton }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={actionPress}>
      <Text style={styles.whiteText}>{textButton}</Text>
    </TouchableOpacity>
  );
};

export { CustomLargeButton };
