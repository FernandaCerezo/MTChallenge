import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { CustomMenuItem } from '../Home/comp/CustomMenuItems';
import home from '../../../assets/images/home.png';
import profile from '../../../assets/images/profile.png';
import signOut from '../../../assets/images/sign_out.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  listProfileContainer: {
    flex: 2,
    width: windowWidth,
  },
  menuContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 45,
    alignSelf: 'center',
  },
  optionsMenuContainer: {
    backgroundColor: '#4b9e84',
    borderRadius: 30,
    elevation: 8,
    flexDirection: 'row',
  },
});

const NewProfile = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.listProfileContainer} />
      <View style={styles.menuContainer}>
        <View style={styles.optionsMenuContainer}>
          <CustomMenuItem image={home} />
          <CustomMenuItem image={profile} />
          <CustomMenuItem image={signOut} />
        </View>
      </View>
    </View>
  );
};

export { NewProfile };
