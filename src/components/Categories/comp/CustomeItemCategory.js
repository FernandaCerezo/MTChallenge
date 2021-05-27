import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  descriptionText: {
    color: '#75a478',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    elevation: 5,
    height: 250,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: 150,
  },
  tinyImage: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: '60%',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const CustomItemCategory = ({
  actionPress = () => {},
  image,
  title,
  description,
}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={actionPress}>
      <Image source={{ uri: image }} style={styles.tinyImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { CustomItemCategory };
