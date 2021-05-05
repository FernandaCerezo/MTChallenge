import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LogInScreen } from './components/LogInScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#a5d6a7',
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    maxHeight: windowHeight,
    maxWidth: windowWidth,
    position: 'relative',
  },
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const AppRouter = () => {
  return (
    <NavigationContainer>
      <View style={styles.mainContainer}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export { AppRouter };
