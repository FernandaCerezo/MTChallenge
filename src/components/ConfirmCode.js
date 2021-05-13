import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CustomInputText } from '../components/common/CustomInputText';
import { CustomLargeButton } from '../components/common/CustomLargeButton';
import { showRegisterScreenChanged } from '../actions';
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
  textStyle: {
    textAlign: 'center',
    fontSize: 15,
  },
});

const ConfirmCode = ({ navigation, userName }) => {
  const [confirmCode, setConfirmCode] = useState('');
  const dispatch = useDispatch();

  const onChangeConfirmCode = codeValue => {
    setConfirmCode(codeValue);
  };

  const onPressButton = async () => {
    try {
      await Auth.confirmSignUp(userName, confirmCode);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error confirm code:', error.message);
    }
  };

  const onPressResendCode = async () => {
    try {
      await Auth.resendSignUp(userName);
      console.log('code resent successfully');
    } catch (error) {
      console.log('result:', error);
    }
  };

  return (
    <View style={styles.formContent}>
      <Text style={[styles.greenText, styles.textStyle]}>
        We've sent you confirmation code. {'\n'} Please enter it in field below.
      </Text>
      <CustomInputText
        onChangeInputText={onChangeConfirmCode}
        inputValue={confirmCode}
        keyboardType="numeric"
        placeholder="Your code"
      />
      <View style={styles.styleContainers} />
      <CustomLargeButton actionPress={onPressButton} textButton="Send code" />
      <View style={styles.styleContainers}>
        <TouchableOpacity style={styles.greenText} onPress={onPressResendCode}>
          <Text style={styles.greenText}>Re-send code.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { ConfirmCode };
