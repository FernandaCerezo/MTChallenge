import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  infoItems: {
    alignItems: 'center',
    backgroundColor: '#dcedc8',
    borderRadius: 15,
    height: 65,
    paddingVertical: 12,
    width: 80,
  },
  infoText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const CustomInfoContent = ({ information, titleInformation }) => {
  return (
    <View style={styles.infoItems}>
      <Text style={styles.infoText}>{information}</Text>
      <Text>{titleInformation}</Text>
    </View>
  );
};

export { CustomInfoContent };
