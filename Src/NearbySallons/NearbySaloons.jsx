import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {colors} from '../../theme';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {allBeautaion} from '../../services/beautacions'
import { baseUrl } from '../../services/supabase';
import * as Animatable from 'react-native-animatable';
 const NearbySaloons=()=> {
  
  const navigation = useNavigation();
  const [bannerData, setBannerData] = useState([ ]);
 
  useEffect(() => {
    async function fetchData() {
      try {
        
        const data = await allBeautaion();
        setBannerData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);
const handlePress=(reviewid)=> {
console.log('Press id is ' + reviewid);
navigation.navigate('ServiceProvider', { beauticianId: reviewid });
};

  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start();
  }, []);
  return (
    <View clasName="" style={styles.container}>
      <View className="flex-row justify-between items-center">
        <Text style={styles.buttontext}>Nearby Beautician</Text>
       
       
      </View>
      {/* Neaby Saloons  */}
      <View >
        <FlatList
          data={bannerData?.data}
          horizontal={true}
          keyExtractor={(item) => item?._id?.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handlePress(item?._id)}>
             <Animatable.View animation={'slideInRight'} duration={1} style={styles.bannerContainer}>
            {item.profilePhoto ? (
                <Image
                  style={styles.bannerImage}
                  source={{ uri: `${baseUrl}/${item.profilePhoto.replace(/\\/g, '/')}` }}
                />
              ) : (
                <Image
                  style={styles.bannerImage}
                  source={require('../../assets/popularServiceProvider/popular.png')}
                />
              )}
              
              <View
                style={styles.SaloonItem}>

                <Text style={styles.saloonName}>{item.firstName} {item.lastName}</Text>


                <View style={styles.PhoneContainer} className="flex-row justify-between">
                  <Image source={require('../../assets/Icons/Callmale.png')} />
                  <Text style={styles.Phone}>{item.Phone ? item.Phone : '920000000'}</Text>
                </View>
                <View style={styles.ratingContainer} className="flex-row justify-between">
                  <Ionicons
                    name='star'
                    size={18}
                    color='#F4C01E'
                  />

                  <Text style={{ color: colors.font1, fontSize:fo(1.3) }} className="ml-1">{item.totalReviews}</Text>
                  <Text style={{ color: colors.fontSubheadin, fontSize:fo(1.3) }}>({item.averageRating})</Text>

                </View>
                </View>
              </Animatable.View>
            </TouchableOpacity>
          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
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
    backgroundColor: `${colors.background}`,
    
  },
  FlatListContainer:{
    height:Rh(30),
   

  },
  buttontext: {
    fontSize: fo(1.9),
    fontWeight: '700',
    color: `${colors.font1}`,
    marginBottom:Rh(1.3)
  },
  bannerContainer: {
    width: Rw(50), // Responsive width
    height: Rw(45), // Responsive height
    alignItems: 'between',
    marginRight: Rw(5),
    backgroundColor:'#fff',
    borderRadius: Rw(3), // Add a rounded border with a responsive radius
    borderWidth: 1, // Add a border width
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderColor: 'rgba(128, 128, 128, 0.2)',
    shadowColor:'rgba(0, 0, 0, .5)',
    shadowOpacity:10,
  },
  bannerImage: {
    width: Rw(50),
    height: Rh(10),
    marginLeft:Rw(0),
    borderTopLeftRadius: Rw(3), 
  borderTopRightRadius: Rw(2),
  },
  SaloonItem: { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' ,marginLeft:Rw(2.4)},

  saloonName: {
    marginLeft: Rw(2),
    marginTop: Rh(1.2),
    color: `${colors.font1}`,
    fontSize: fo(1.9),
  },
  Phone: {
    color: `${colors.fontSubheadin}`,
    marginLeft: Rw(2),
    marginTop: Rh(0.7),
    fontSize:fo(1.3)
  }
  ,
  PhoneContainer: {

  }
});
export default NearbySaloons;