import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import titleImage from '../../../assets/images/loadingScreen.png';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#339798',
    height: windowHeight,
    width: windowWidth,
  },
  imageContent: {
    alignItems: 'center',
    flex: 1,
    height: '50%',
    paddingTop: 150,
    width: '100%',
  },
  imageSize: {
    height: '50%',
    width: '100%',
  },
});

const LoadingScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContent}>
        <Image source={titleImage} style={styles.imageSize} />
        <ActivityIndicator size="large" color="#00696a" />
      </View>
    </View>
  );
};

export { LoadingScreen };
