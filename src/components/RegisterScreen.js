import React, { useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInputText } from '../components/common/CustomInputText';
import { CustomLargeButton } from '../components/common/CustomLargeButton';
import { showConfirmCodeChanged, showRegisterScreenChanged } from '../actions';
import { Auth } from 'aws-amplify';
import { ConfirmCode } from './ConfirmCode';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  formContent: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    height: windowHeight,
    padding: 40,
    top: '35%',
    width: windowWidth,
  },
  greenText: {
    color: '#75a478',
  },
  mainContainer: {
    backgroundColor: '#a5d6a7',
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    height: windowHeight,
    position: 'relative',
    width: windowWidth,
  },
  styleContainers: {
    paddingTop: 55,
    backgroundColor: 'transparent',
  },
});

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);

  const onChangeUsername = userValue => {
    setUsername(userValue);
  };

  const onChangeEmail = emailValue => {
    setEmail(emailValue);
  };

  const onChangePassword = passwordValue => {
    setPassword(passwordValue);
  };

  const onPressButton = async () => {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });

      if (user) {
        dispatch(showConfirmCodeChanged({ isVisible: true }));
      }
    } catch (error) {
      console.log('error signing up:', error.message);
    }
  };

  const onPressLogin = async () => {
    dispatch(showRegisterScreenChanged({ isVisible: false }));
  };

  return (
    <View style={styles.formContent}>
      {authStore.isConfirmCodeVisible ? (
        <ConfirmCode
          navigation={navigation}
          userName={username}
          password={password}
        />
      ) : (
        <>
          <CustomInputText
            onChangeInputText={onChangeUsername}
            inputValue={username}
            placeholder="username"
          />

          <CustomInputText
            onChangeInputText={onChangeEmail}
            autoCapitalize="none"
            inputValue={email}
            keyboardType="email-address"
            placeholder="user@email.com"
          />

          <CustomInputText
            onChangeInputText={onChangePassword}
            inputValue={password}
            placeholder="password"
            secureTextEntry
          />
          <View style={styles.styleContainers} />
          <CustomLargeButton actionPress={onPressButton} textButton="Sign up" />
          <View style={styles.styleContainers}>
            <TouchableOpacity style={styles.greenText} onPress={onPressLogin}>
              <Text style={styles.greenText}>Already a member? Login Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export { RegisterScreen };
