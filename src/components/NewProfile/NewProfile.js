import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CustomInputText } from '../../components/common/CustomInputText';
import { CustomLargeButton } from '../../components/common/CustomLargeButton';
import { UserData } from '../../models';
import { DataStore } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import {
  PROFILE_DATA_ATTEMPT,
  PROFILE_DATA_FAILED,
  PROFILE_DATA_UPLOADED,
} from '../../actions/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 50,
    top: 50,
    width: windowWidth,
  },
  mainContainer: {
    backgroundColor: '#c8e6c9',
    height: windowHeight,
    width: windowWidth,
  },
  pickerStyle: {
    paddingHorizontal: 40,
    paddingTop: 15,
  },
  textInputContainer: {
    flex: 3,
    width: windowWidth,
  },
  titleContainer: {
    color: '#00696a',
    fontSize: 35,
    fontWeight: 'bold',
    paddingTop: 35,
  },
});

const NewProfile = ({ route }) => {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const { auth } = store;
  const { allBreeds, selectedUser } = auth;
  const [nameUser, setNameUser] = useState(selectedUser.name || '');
  const [lastName, setLastName] = useState(selectedUser.lastname || '');
  const [userAge, setUserAge] = useState(selectedUser.age.toString() || 0);
  const [dogName, setDogName] = useState(selectedUser.dogname || '');
  const [dogAge, setDogAge] = useState(selectedUser.dogage.toString() || 0);
  const [breedValue, setSelectedBeed] = useState(
    selectedUser.breed || allBreeds[0].name,
  );
  const { isAdmin } = route.params;

  const onPressAddProfile = async () => {
    try {
      dispatch({ type: PROFILE_DATA_ATTEMPT });

      await DataStore.save(
        new UserData({
          age: parseInt(userAge, 10),
          breed: breedValue,
          clientId: auth.userInfo.attributes.sub,
          description: breedValue,
          dogage: parseInt(dogAge, 10),
          dogname: dogName,
          isAdmin: false,
          lastname: lastName,
          name: nameUser,
          username: auth.userInfo.username,
        }),
      );

      dispatch({ type: PROFILE_DATA_UPLOADED });
    } catch (error) {
      console.log(error);
      dispatch({ error, type: PROFILE_DATA_FAILED });
    }
  };

  const onPressUpdate = async () => {
    try {
      dispatch({ type: PROFILE_DATA_ATTEMPT });

      const original = await DataStore.query(UserData, selectedUser.id);

      if (original) {
        await DataStore.save(
          UserData.copyOf(original, updated => {
            updated.age = parseInt(userAge, 10);
            updated.breed = breedValue;
            updated.description = breedValue;
            updated.dogage = parseInt(dogAge, 10);
            updated.dogname = dogName;
            updated.lastname = lastName;
            updated.name = nameUser;
          }),
        );
        dispatch({ type: PROFILE_DATA_UPLOADED });
      }
    } catch (error) {
      console.log(error);
      dispatch({ error, type: PROFILE_DATA_FAILED });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.titleContainer}>Add information</Text>
      </View>
      <View style={styles.textInputContainer}>
        <CustomInputText
          onChangeInputText={nameValue => setNameUser(nameValue)}
          inputValue={nameUser}
          placeholder="Your Name"
        />
        <CustomInputText
          onChangeInputText={lastNameValue => setLastName(lastNameValue)}
          inputValue={lastName}
          placeholder="Your Last Name"
        />
        <CustomInputText
          onChangeInputText={userAgeValue => setUserAge(userAgeValue)}
          inputValue={userAge}
          keyboardType="numeric"
          placeholder="Your Age"
        />
        <CustomInputText
          onChangeInputText={dogNameValue => setDogName(dogNameValue)}
          inputValue={dogName}
          placeholder="Dog Name"
        />
        <CustomInputText
          onChangeInputText={dogAgeValue => setDogAge(dogAgeValue)}
          inputValue={dogAge}
          keyboardType="numeric"
          placeholder="Dog Age"
        />
        <View style={styles.pickerStyle}>
          <Picker
            selectedValue={breedValue}
            onValueChange={selectBreedValue =>
              setSelectedBeed(selectBreedValue)
            }>
            {allBreeds.map(breed => (
              <Picker.Item label={breed.name} value={breed.name} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomLargeButton
          actionPress={isAdmin ? onPressUpdate : onPressAddProfile}
          textButton="Send Profile"
        />
      </View>
    </View>
  );
};

export { NewProfile };
