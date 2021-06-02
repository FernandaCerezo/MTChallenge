import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  descriptionText: {
    color: '#00696b',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    elevation: 5,
    height: 270,
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: 200,
  },
  itemUserContainer: {
    alignItems: 'center',
    backgroundColor: '#6ac8ca',
    borderRadius: 15,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 5,
    overflow: 'hidden',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    height: 24,
    marginRight: 15,
    width: 24,
  },
  iconContent: {
    flexDirection: 'row',
  },
});

const CustomItemList = ({
  actionPress = () => {},
  actionPressIcon = () => {},
  isAdmin = false,
  image,
  icon,
  secondIcon,
  title,
  description,
}) => {
  const renderAdminCard = () => {
    return (
      <View style={styles.itemUserContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>

          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.iconContent}>
          <TouchableOpacity onPress={actionPress}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={actionPressIcon}>
            <Image source={secondIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCard = () => {
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

  return isAdmin ? renderAdminCard() : renderCard();
};

export { CustomItemList };
