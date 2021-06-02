import React from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import { CustomInfoContent } from '../Profile/comp/CustomInfoContent';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#00696a',
    height: windowHeight,
    width: windowWidth,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: 'coral',
    flex: 4,
  },
  description: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 2.5,
  },
  infoContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    height: '100%',
    width: '90%',
  },
  nameDog: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  centerContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 45,
    flex: 1.5,
  },
  infoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  imagePet: {
    height: '100%',
    width: '100%',
  },
  whiteText: {
    color: '#FFF',
    fontSize: 15,
  },
  boldText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  informationText: {
    height: '65%',
    justifyContent: 'space-between',
    width: '65%',
  },
});

const DogProfile = () => {
  const petStore = useSelector(state => state.pets);
  const {
    petSelectedById: {
      bred_for,
      height,
      image,
      life_span,
      name,
      temperament,
      weight,
    },
  } = petStore;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.imagePet} source={{ uri: image.url }} />
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameDog}>{name}</Text>

          <View style={styles.infoContent}>
            <CustomInfoContent information={life_span} />
            <CustomInfoContent
              information={height.metric}
              titleInformation="Height"
            />
            <CustomInfoContent
              information={weight.metric}
              titleInformation="Weight"
            />
          </View>
        </View>
      </View>
      <View style={styles.description}>
        <View style={styles.informationText}>
          <View>
            <Text style={styles.boldText}>Bred for</Text>
            <Text style={styles.whiteText}>{bred_for}</Text>
          </View>

          <View>
            <Text style={styles.boldText}>Temperament</Text>
            <Text style={styles.whiteText}>{temperament}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export { DogProfile };
