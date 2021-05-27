import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  buttonCategory: {
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    elevation: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 15,
  },
  content: {
    alignItems: 'center',
  },
  textButton: {
    fontSize: 12,
    padding: 10,
  },
  tinyIcon: {
    alignSelf: 'center',
    height: 35,
    width: 35,
  },
});

const CustomOptionsCategories = ({
  actionPress = () => {},
  image,
  category,
}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.buttonCategory} onPress={actionPress}>
        <Image source={image} style={styles.tinyIcon} />
      </TouchableOpacity>
      <Text style={styles.textButton}>{category}</Text>
    </View>
  );
};

export { CustomOptionsCategories };
