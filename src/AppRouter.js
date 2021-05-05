import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LogInScreen } from './components/LogInScreen';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#a5d6a7',
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    position: 'relative',
  },
});

const AppRouter = () => {
  return (
    <View style={styles.mainContainer}>
      <LogInScreen />
    </View>
  );
};

export { AppRouter };
