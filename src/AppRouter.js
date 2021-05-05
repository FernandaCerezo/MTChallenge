import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import icon from '../assets/images/open_book.png';
import { CustomInputText } from '../src/components/common/CustomInputText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#a5d6a7',
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    position: 'relative',
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
  middleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: windowHeight,
    position: 'absolute',
    width: windowWidth,
    zIndex: 2,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#75a478',
    borderRadius: 20,
    padding: 10,
  },
  tinyIcon: {
    alignSelf: 'center',
    height: 75,
    justifyContent: 'center',
    top: '14%',
    width: 75,
  },
  styleContainers: {
    paddingTop: 65,
    backgroundColor: 'transparent',
  },
  whiteText: {
    color: 'white',
    fontSize: 17,
  },
  greenText: {
    color: '#75a478',
  },
});

const AppRouter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = emailValue => {
    setEmail(emailValue);
  };
  const onChangePassword = passwordValue => {
    setPassword(passwordValue);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer} />

      <View style={styles.middleContainer}>
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
            <TouchableOpacity style={styles.button}>
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

export { AppRouter };
