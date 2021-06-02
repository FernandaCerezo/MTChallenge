import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomMenuItem } from '../Home/comp/CustomMenuItems';
import profile from '../../../assets/images/profile.png';
import signOut from '../../../assets/images/sign_out.png';
import { CustomItemList } from '../Home/comp/CustomItemList';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBreeds, getAllUsers, getUserById } from '../../actions';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { SIGN_OUT_USER, USER_DELETED } from '../../actions/types';
import { Auth, DataStore } from 'aws-amplify';
import { UserData } from '../../models';

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
  titleSections: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingTop: 20,
  },
});

const HomeAdmin = ({ navigation }) => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.auth);
  const { isLoading, allUsers } = store;

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllBreeds());
  }, [dispatch]);

  const onPressSignOut = async () => {
    try {
      await Auth.signOut();
      dispatch({ type: SIGN_OUT_USER });
      navigation.navigate('Login');
    } catch (error) {
      console.log('error sign out:', error.message);
    }
  };

  const onPressDelete = async function (userId) {
    try {
      await DataStore.delete(UserData, user => user.clientId('eq', userId));
      dispatch({ type: USER_DELETED, userId });
    } catch (error) {
      console.log('error delete:', error.message);
    }
  };

  const onPressEditProfile = userId => () => {
    try {
      dispatch(getUserById({ userId }));
      navigation.navigate('NewProfile', { isAdmin: true });
    } catch (error) {
      console.log('error profile:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <CustomItemList
      isAdmin
      actionPress={onPressEditProfile(item.clientId)}
      actionPressIcon={() => onPressDelete(item.clientId)}
      icon={profile}
      secondIcon={signOut}
      title={item.name}
      description={item.username}
    />
  );
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.listProfileContainer}>
        <Text style={styles.titleSections}>Profiles</Text>
        <SafeAreaView>
          <FlatList
            data={allUsers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.optionsMenuContainer}>
          <CustomMenuItem actionPress={onPressSignOut} image={signOut} />
        </View>
      </View>
    </View>
  );
};

export { HomeAdmin };
