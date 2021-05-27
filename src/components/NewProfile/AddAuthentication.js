import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { CustomInputText } from '../components/common/CustomInputText';
import { CustomLargeButton } from '../components/common/CustomLargeButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  textInputContainer: {
    flex: 2,
    width: windowWidth,
  },
  buttonContainer: {
    flex: 1,
    width: windowWidth,
  },
});

const AddAuthentication = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textInputContainer}>
        <CustomInputText />
        <CustomInputText />
      </View>
      <View style={styles.buttonContainer}>
        <CustomLargeButton />
      </View>
    </View>
  );
};

export { AddAuthentication };