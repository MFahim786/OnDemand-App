import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw ,responsiveFontSize as Rf} from 'react-native-responsive-dimensions';
import { colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { searchBeauticians } from '../services/searchapi';
import { useNavigation } from '@react-navigation/native';
export default function SearchBar() {
const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('SearchBarResult')}>
      <View style={styles.searchBar}>
        
      <Ionicons
              name="search-sharp"
              size={25}
              color={`${colors.font1}`}
            />
         
       <Text style={{textAlign:"center",marginLeft:Rw(15),paddingRight:Rw(21),fontSize:Rf(2)}}>Search...</Text>
          <Ionicons
              name="filter-circle-sharp"
              size={30}
              color={`${colors.font1}`}
            />
            
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Rh(12),
    backgroundColor: colors.headerbackground,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center', 
    width: Rw(70), 
    height: Rh(6), 
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor:'#663C26',
    borderWidth: 2,
  },
  input: {
    flex: 1, // To make the input take up remaining space
    height: '100%', // To fill the entire height of the searchBar
    marginLeft: 10, // Add spacing between the input and the search icon
    color:`${colors.font1}`,
  },
});
