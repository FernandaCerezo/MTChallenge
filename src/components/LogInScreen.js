import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import icon from '../../assets/images/dog_collar.png';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInputText } from '../components/common/CustomInputText';
import { CustomLargeButton } from '../components/common/CustomLargeButton';
import { RegisterScreen } from '../components/RegisterScreen';
import { showRegisterScreenChanged } from '../actions';
import { Auth } from 'aws-amplify';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bottomStyleContainers: {
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  formContent: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    height: windowHeight,
    padding: 40,
    top: '40%',
    width: windowWidth,
  },
  greenText: {
    color: '#75a478',
  },
  linkText: {
    height: 30,
    marginVertical: 5,
    width: 300,
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
    paddingTop: 65,
    backgroundColor: 'transparent',
  },
  textTitle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    position: 'relative',
    top: '30%',
  },
  tinyIcon: {
    alignSelf: 'center',
    height: 75,
    justifyContent: 'center',
    top: '25%',
    width: 75,
  },
  topContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: 250,
    position: 'absolute',
    width: windowWidth,
    zIndex: 2,
  },
});

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);

  const onChangeEmail = emailValue => {
    setEmail(emailValue);
  };

  const onChangePassword = passwordValue => {
    setPassword(passwordValue);
  };

  const onPressButton = async () => {
    try {
      await Auth.signIn(email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error signing up:', error.message);
    }
  };

  const onPressRegister = () => {
    dispatch(showRegisterScreenChanged({ isVisible: true }));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image source={icon} style={styles.tinyIcon} />
        <Text style={styles.textTitle}>
          {authStore.isRegisterScreenVisible
            ? 'Please sign up.'
            : 'Please sign in.'}
        </Text>
      </View>

      {authStore.isRegisterScreenVisible ? (
        <RegisterScreen navigation={navigation} />
      ) : (
        <View style={styles.formContent}>
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
          <CustomLargeButton actionPress={onPressButton} textButton="Sign in" />

          <View style={styles.bottomStyleContainers}>
            <TouchableOpacity style={styles.linkText} onPress={() => { }}>
              <Text style={styles.greenText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkText} onPress={onPressRegister}>
              <Text style={styles.greenText}>
                Don't have an account? Create one now.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export { LogInScreen };
