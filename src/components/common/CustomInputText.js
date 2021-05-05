import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#75a478',
    color: '#75a478',
    fontFamily: 'Roboto',
    fontSize: 18,
    paddingTop: 30,
    width: 300,
  },
});

const CustomInputText = ({
  onChangeInputText = () => {},
  inputValue,
  placeholder,
  keyboardType,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      onChangeText={onChangeInputText}
      inputValue={inputValue}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export { CustomInputText };
