import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomItemList } from '../Home/comp/CustomItemList';
import { CustomMenuItem } from '../Home/comp/CustomMenuItems';
import { getAllBreeds } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import bigSize from '../../../assets/images/big_dog.png';
import home from '../../../assets/images/home.png';
import mediumSize from '../../../assets/images/medium_dog.png';
import profile from '../../../assets/images/profile.png';
import signOut from '../../../assets/images/sign_out.png';
import smallSize from '../../../assets/images/small_dog.png';
import { Auth } from 'aws-amplify';
import { SMALL_PET_HEIGHT } from '../../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: '#E1E2E1',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonCategory: {
    backgroundColor: '#F5F5F6',
    borderRadius: 15,
    elevation: 2,
    padding: 8,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 3,
  },
  hiTextStyle: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  mainContainer: {
    backgroundColor: '#E1E2E1',
    width: windowWidth,
    height: windowHeight,
    fontFamily: 'Roboto',
  },
  mediumContainer: {
    paddingTop: 10,
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 66,
  },
  optionsMenuContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: '#75a478',
    borderRadius: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  textButton: {
    fontWeight: 'bold',
    padding: 10,
  },
  tinyIcon: {
    height: 35,
    width: 35,
    alignSelf: 'center',
  },
  titleSections: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
    color: '#585a61',
  },
  topContainer: {
    backgroundColor: '#a5d6a7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
    flex: 2,
    paddingHorizontal: 20,
  },
  viewSize: {
    width: '50%',
  },
});

const Home = ({ navigation }) => {
  const authStore = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onPressSignOut = async () => {
    try {
      await Auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('error sign out:', error.message);
    }
  };

  //constructor "onCreate"
  useEffect(() => {
    dispatch(getAllBreeds());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <CustomItemList
      image={item.image.url}
      title={item.name}
      description={item.bred_for}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.viewSize}>
            <Text style={styles.hiTextStyle}>Hi {authStore.userName}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mediumContainer}>
        <Text style={styles.titleSections}>Size</Text>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.buttonCategory}
            onPress={() => {
              authStore.allBreeds.map(pet => {
                const { metric } = pet.height;
                let petHeight = metric;

                if (petHeight && petHeight.includes('-')) {
                  petHeight = metric.split('-')[1];
                }

                if (petHeight < SMALL_PET_HEIGHT) {
                  return pet;
                }
              });
            }}>
            <Image source={smallSize} style={styles.tinyIcon} />
            <Text style={styles.textButton}> Small</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCategory}>
            <Image source={mediumSize} style={styles.tinyIcon} />
            <Text style={styles.textButton}>Medium</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCategory}>
            <Image source={bigSize} style={styles.tinyIcon} />
            <Text style={styles.textButton}>Big</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.titleSections}>All Dogs</Text>

        <SafeAreaView>
          <FlatList
            data={authStore.allBreeds}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.optionsMenuContainer}>
          <CustomMenuItem image={home} />
          <CustomMenuItem image={profile} />
          <CustomMenuItem actionPress={onPressSignOut} image={signOut} />
        </View>
      </View>
    </View >
  );
};

export { Home };
