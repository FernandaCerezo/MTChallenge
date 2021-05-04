import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    height: windowHeight,
    justifyContent: 'flex-start',
    width: windowWidth,
    fontFamily: 'sans-serif',
  },
  textTitle: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 70,
  },
  textInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: 'black',
    fontSize: 18,
    width: 300,
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
      <View>
        <Text style={styles.textTitle}>Please sign in.</Text>
      </View>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="user@user.com"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry
        />
      </View>
    </View>
  );
};

export { AppRouter };
