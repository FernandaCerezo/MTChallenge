import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tinyImage: {
    height: 24,
    width: 24,
  },
});

const CustomMenuItem = ({ actionPress = () => {}, image }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={actionPress}>
      <Image source={image} style={styles.tinyImage} />
    </TouchableOpacity>
  );
};

export { CustomMenuItem };
