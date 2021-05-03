import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-end',
    backgroundColor: 'blue',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  textTitle: {
    color: 'white',
  },
});

const AppRouter = () => (
  <View style={styles.mainContainer}>
    <Text style={styles.textTitle}>Hola</Text>
    <Text>♥</Text>
  </View>
);

export { AppRouter };
