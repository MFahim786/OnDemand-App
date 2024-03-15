import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons'; // You need to install this library

const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="gray"
      />
      <Icon name="search" size={20} color="black" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    width: Rw(70),
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    color: 'black',
   
  },
  icon: {
    marginLeft: 5,
  },
});

export default SearchBar;
