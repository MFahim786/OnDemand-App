import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Animated } from 'react-native';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import { allCategories } from '../../services/gatgories';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../services/supabase';
import * as Animatable from 'react-native-animatable';
export default function Catgorey() {
  const navigation = useNavigation();
  const [categoreyData, setCategorey] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchdata = await allCategories();
        setCategorey(fetchdata.category);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleCategoryPress = async (id) => {
    try {
      navigation.navigate('CategoreySaloon', { categoryId: id });
    } catch (error) {
      console.error('Error navigating to CategoreySaloon:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View className="flex-row justify-between items-center">
          <Text style={styles.buttontext}>Categories</Text>
          
        </View>
      </View>
      <View style={styles.FlatList_container}> 
        <FlatList
          data={categoreyData}
          horizontal={true}
          keyExtractor={(item) => item._id.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Animatable.View animation={'slideInRight'}>
            <TouchableOpacity style={styles.bannerContainer} onPress={() => handleCategoryPress(item._id)}>
              {item.Logo ? (
                <Image style={styles.bannerImage} source={{ uri:  `${baseUrl}/${item.Logo.replace(/\\/g, '/')}` }} />
              ) : (
                <Image style={styles.bannerImage} source={require('../../assets/popularServiceProvider/popular.png')} />
              )}
              <Text style={styles.catgoreisText}>{item.Name}</Text>
            </TouchableOpacity>
            </Animatable.View>
          )}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Rh(1),
    marginLeft: Rw(6),
    marginBottom: Rh(0),
    backgroundColor: colors.background,
  },
  FlatList_container: {
    height: Rh(11),
  },
  buttontext: {
    fontSize: fo(1.9),
    fontWeight: '700',
    color: colors.font1,
    marginBottom:Rh(1.3)
  },
  bannerContainer: {
    width: Rw(20),
    height: Rw(20),
    alignItems: 'between',
    marginRight: Rw(0),
  },
  bannerImage: {
    width: Rw(15),
    height: Rh(7),
    borderRadius: Rw(10),
    resizeMode: 'cover',
  },
  catgoreisText: {
    color: colors.catgoreytext,
    fontSize: fo(1.3),
    fontFamily: colors.fontfaimly_heding,
    marginTop:Rh(1),
    textAlign: 'center',
    marginRight:Rw(4),
    fontWeight: '700'
  },
});
