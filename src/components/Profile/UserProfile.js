import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Text } from 'react-native';
import { CustomItemCategory } from '../Categories/comp/CustomeItemCategory';
import { CustomInfoUserContent } from './comp/CustomInfoUserContent';
import { NewProfile } from '../NewProfile/NewProfile';
import { DataStore } from 'aws-amplify';
import { UserData } from '../../models';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { getPetById } from '../../actions/pets';
import {
  PROFILE_DATA_ATTEMPT,
  PROFILE_DATA_FAILED,
  PROFILE_DATA_LOADED,
  SHOW_NEW_PROFILE_SCREEN,
} from '../../actions/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    height: windowHeight,
    width: windowWidth,
  },
  topContainer: {
    alignItems: 'center',
    flex: 0.6,
    width: windowWidth,
  },
  bottomContainer: {
    backgroundColor: '#339798',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    flex: 3,
    flexDirection: 'row',
    height: '100%',
    paddingBottom: 25,
    width: windowWidth,
  },
  viewStyle: {
    alignSelf: 'center',
  },
  scrollContainer: {
    backgroundColor: 'red',
    flex: 1,
    position: 'relative',
  },
  textContainer: {
    color: '#00696a',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 35,
  },
});

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [dataProfile, setDataProfile] = useState({});
  const store = useSelector(state => state.auth);
  const {
    allBreeds,
    isLoading,
    isNewProfileScreenVisible,
    userInfo,
    userProfileUploaded,
  } = store;

  const getUserProfile = useCallback(async () => {
    dispatch({ type: PROFILE_DATA_ATTEMPT });

    const profile = await DataStore.query(UserData, data =>
      data.clientId('eq', userInfo.attributes.sub),
    );

    if (!profile.length) {
      dispatch({ error: 'No Data Found', type: PROFILE_DATA_FAILED });
      dispatch({ isVisible: true, type: SHOW_NEW_PROFILE_SCREEN });
    } else {
      setDataProfile(profile[0]);
      dispatch({ type: PROFILE_DATA_LOADED });
      dispatch({ isVisible: false, type: SHOW_NEW_PROFILE_SCREEN });
    }
  }, [dispatch, userInfo.attributes.sub]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    if (userProfileUploaded) {
      getUserProfile();
    }
  }, [getUserProfile, userProfileUploaded]);

  const onPressButton = petId => async () => {
    try {
      dispatch(getPetById({ petId }));
      navigation.navigate('DogProfile');
    } catch (error) {
      console.log('error:', error.message);
    }
  };

  const renderPetDescription = () => {
    if (dataProfile) {
      const myPet = allBreeds.find(pet => pet.name === dataProfile.breed);

      return (
        <CustomItemCategory
          actionPress={onPressButton(myPet.id)}
          image={myPet.image.url}
          title={myPet.name}
          description={myPet.bred_for}
        />
      );
    }
  };

  const renderScreen = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    return isNewProfileScreenVisible ? (
      <NewProfile />
    ) : (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.textContainer}>{dataProfile.username}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.viewStyle}>
            <ScrollView>
              <CustomInfoUserContent
                title="Name"
                information={`${dataProfile.name} ${dataProfile.lastname}`}
              />

              <CustomInfoUserContent
                title="Age"
                information={dataProfile.age}
              />

              <CustomInfoUserContent
                title="Dog Name"
                information={dataProfile.dogname}
              />

              <CustomInfoUserContent
                title="Breed"
                information={dataProfile.breed}
              />

              <CustomInfoUserContent
                title="Dog Age"
                information={dataProfile.dogage}
              />

              <CustomInfoUserContent title="Description" />

              {renderPetDescription()}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };

  return renderScreen();
};

export { UserProfile };
