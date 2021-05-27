import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { CustomItemCategory } from './comp/CustomeItemCategory';
import { getPetById } from '../../actions/pets';

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    right: 13,
  },
});
const Categories = ({ navigation }) => {
  const dispatch = useDispatch();

  const onPressButton = petId => () => {
    try {
      dispatch(getPetById({ petId }));
      navigation.navigate('DogProfile');
    } catch (error) {
      console.log('error:', error.message);
    }
  };

  const petsStore = useSelector(state => state.pets);
  const { petsList } = petsStore;

  const renderItem = ({ item }) => (
    <CustomItemCategory
      actionPress={onPressButton(item.id)}
      image={item.image.url}
      title={item.name}
      description={item.bred_for}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.row}
        data={petsList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export { Categories };
