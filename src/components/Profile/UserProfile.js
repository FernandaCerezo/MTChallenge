import React, { useCallback, useEffect } from 'react';
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
  const store = useSelector(state => state.auth);
  const {
    allBreeds,
    isLoading,
    isNewProfileScreenVisible,
    userInfo,
    userProfileUploaded,
    userProfileInfo,
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
      dispatch({ data: profile[0], type: PROFILE_DATA_LOADED });
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
    if (userProfileInfo) {
      const myPet = allBreeds.find(pet => pet.name === userProfileInfo.breed);

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
    console.log('data=', userProfileInfo);

    return isNewProfileScreenVisible ? (
      <NewProfile />
    ) : (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.textContainer}>{userProfileInfo.username}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.viewStyle}>
            <ScrollView>
              <CustomInfoUserContent
                title="Name"
                information={`${userProfileInfo.name} ${userProfileInfo.lastname}`}
              />

              <CustomInfoUserContent
                title="Age"
                information={userProfileInfo.age}
              />

              <CustomInfoUserContent
                title="Dog Name"
                information={userProfileInfo.dogname}
              />

              <CustomInfoUserContent
                title="Breed"
                information={userProfileInfo.breed}
              />

              <CustomInfoUserContent
                title="Dog Age"
                information={userProfileInfo.dogage}
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
