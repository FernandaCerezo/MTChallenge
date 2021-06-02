import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LogInScreen } from './components/LogInScreen';
import { Home } from './components/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DogProfile } from './components/Profile/DogProfile';
import { UserProfile } from './components/Profile/UserProfile';
import { HomeAdmin } from './components/HomeAdmin/HomeAdmin';
import { NewProfile } from './components/NewProfile/NewProfile';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    maxHeight: windowHeight,
    maxWidth: windowWidth,
  },
});

const navigatorOptions = {
  headerShown: false,
};

const AppRouter = () => {
  return (
    <NavigationContainer>
      <View style={styles.mainContainer}>
        <Stack.Navigator screenOptions={navigatorOptions}>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen name="DogProfile" component={DogProfile} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="NewProfile" component={NewProfile} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export { AppRouter };
