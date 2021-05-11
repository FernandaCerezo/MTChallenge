import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import icon from '../../assets/images/dog_collar.png';
import { CustomInputText } from '../components/common/CustomInputText';
import { Auth } from 'aws-amplify';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#75a478',
    borderRadius: 20,
    padding: 10,
  },
  formContent: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
    height: windowHeight,
    padding: 40,
    top: '25%',
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
    top: '16%',
  },
  tinyIcon: {
    alignSelf: 'center',
    height: 75,
    justifyContent: 'center',
    top: '14%',
    width: 75,
  },
  topContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: 600,
    position: 'absolute',
    width: windowWidth,
    zIndex: 2,
  },
  whiteText: {
    color: 'white',
    fontSize: 17,
  },
});

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = emailValue => {
    setEmail(emailValue);
  };

  const onChangePassword = passwordValue => {
    setPassword(passwordValue);
  };

  const onPressButton = async () => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      navigation.navigate('Home');
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image source={icon} style={styles.tinyIcon} />

        <Text style={styles.textTitle}>Please sign in.</Text>

        <View style={styles.formContent}>
          <CustomInputText
            onChangeInputText={onChangeEmail}
            inputValue={email}
            placeholder="user@email.com"
            keyboardType="email-address"
          />

          <CustomInputText
            onChangeInputText={onChangePassword}
            inputValue={password}
            placeholder="password"
            secureTextEntry
          />

          <View style={styles.styleContainers}>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Text style={styles.whiteText}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.styleContainers}>
            <Text style={styles.greenText}>Forgot your password?</Text>

            <Text style={styles.greenText}>
              Don't have an account? Create one now.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export { LogInScreen };
