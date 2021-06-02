import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CustomItemList } from '../Home/comp/CustomItemList';
import { CustomMenuItem } from '../Home/comp/CustomMenuItems';
import { CustomOptionsCategories } from './comp/CustomOptionsCategories';
import { LoadingScreen } from '../../components/LoadingScreen/LoadingScreen';
import { Categories } from '../Categories/Categories';
import { getAllBreeds } from '../../actions/auth';
import {
  filterPetListByCategory,
  getPetById,
  showCategoryScreenChanged,
} from '../../actions/pets';
import { useDispatch, useSelector } from 'react-redux';
import bigSize from '../../../assets/images/big_dog.png';
import home from '../../../assets/images/home.png';
import mediumSize from '../../../assets/images/medium_dog.png';
import profile from '../../../assets/images/profile.png';
import signOut from '../../../assets/images/sign_out.png';
import smallSize from '../../../assets/images/small_dog.png';
import { Auth } from 'aws-amplify';
import {
  SMALL_PET_HEIGHT,
  MEDIUM_PET_HEIGHT,
  BIG_PET_HEIGHT,
} from '../../constants';
import { SIGN_OUT_USER } from '../../actions/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomContainer: {
    backgroundColor: '#E2E2E2',
    flex: 3,
  },
  hiTextStyle: {
    color: '#FFF',
    fontSize: 35,
    fontWeight: 'bold',
  },
  mainContainer: {
    backgroundColor: '#4b9e84',
    fontFamily: 'Roboto',
    height: windowHeight,
    width: windowWidth,
  },
  mediumContainer: {
    backgroundColor: '#E2E2E2',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    paddingTop: 20,
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
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleSections: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

const Home = ({ navigation }) => {
  const store = useSelector(state => state);
  const { auth, pets } = store;
  const dispatch = useDispatch();
  const { isLoading } = auth;

  //constructor "onCreate"
  useEffect(() => {
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

  const onPressProfile = () => {
    try {
      navigation.navigate('UserProfile');
    } catch (error) {
      console.log('error profile:', error.message);
    }
  };

  const onPressButton = petId => async () => {
    try {
      dispatch(getPetById({ petId }));
      navigation.navigate('DogProfile');
    } catch (error) {
      console.log('error:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <CustomItemList
      actionPress={onPressButton(item.id)}
      image={item.image.url}
      title={item.name}
      description={item.bred_for}
    />
  );

  const onPressCategory = categoryName => () => {
    if (auth.allBreeds) {
      dispatch(
        filterPetListByCategory({
          category: categoryName,
          pets: auth.allBreeds,
        }),
      );
      dispatch(showCategoryScreenChanged({ isVisible: true }));
    }
  };

  const onPressHome = () => {
    try {
      dispatch(showCategoryScreenChanged({ isVisible: false }));
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.hiTextStyle}>Hi, {auth.userInfo.username}!</Text>
        </View>
      </View>

      <View style={styles.mediumContainer}>
        <Text style={styles.titleSections}>Size</Text>

        <View style={styles.categoryContainer}>
          <CustomOptionsCategories
            actionPress={onPressCategory(SMALL_PET_HEIGHT)}
            image={smallSize}
            category="Small"
          />

          <CustomOptionsCategories
            actionPress={onPressCategory(MEDIUM_PET_HEIGHT)}
            image={mediumSize}
            category="Medium"
          />

          <CustomOptionsCategories
            actionPress={onPressCategory(BIG_PET_HEIGHT)}
            image={bigSize}
            category="Big"
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.titleSections}>All Dogs</Text>

        {pets.isCategoryScreenVisible ? (
          <Categories navigation={navigation} />
        ) : (
          <SafeAreaView>
            <FlatList
              data={auth.allBreeds}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        )}
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.optionsMenuContainer}>
          <CustomMenuItem actionPress={onPressHome} image={home} />

          <CustomMenuItem actionPress={onPressProfile} image={profile} />

          <CustomMenuItem actionPress={onPressSignOut} image={signOut} />
        </View>
      </View>
    </View>
  );
};

export { Home };
