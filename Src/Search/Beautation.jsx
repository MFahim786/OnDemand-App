import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
  } from 'react-native';
  import React, { useRef, useEffect, useState } from 'react';
  import { colors } from '../../theme';
  import {
    responsiveHeight as Rh,
    responsiveScreenWidth as Rw,
    responsiveScreenFontSize as fo,
  } from 'react-native-responsive-dimensions';
  import Ionicons from 'react-native-vector-icons/Entypo';
  import { useNavigation  } from '@react-navigation/native';
  import { baseUrl } from '../../services/supabase';
  export default function SearchBeautician({ data }) {
    const navigation = useNavigation();
    const [bannerData, setBannerData] = useState([]);
  console.log('++++++++===============',bannerData)
  useEffect(() => {
    if (data && data.data) {
      setBannerData(data.data);
    }
  }, [data]);
    return (
       <View>
          
        <View clasName="" style={styles.container}>
          
         
            {/* Popular Saloons  */}
            <View >
                <FlatList
                    data={bannerData}
                    horizontal={false}
                    pagingEnabled
                    
                    keyExtractor={(item) => item?._id.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item?._id} 
                            onPress={() => navigation.navigate('ServiceProvider')}
                        >
                            <View style={styles.bannerContainer} >
                                {item?.profilePhoto ? ( 
                                    <Image
                                        style={styles.bannerImage}
                                        source={{ uri: `${baseUrl}/${item?.profilePhoto?.replace(/\\/g, '/')}` }}
                                    />
                                ) : (
                                    <Image
                                        style={styles.bannerImage}
                                        source={require('../../assets/popularServiceProvider/popular.png')}

                                    />
                                )}

                                <View
                                    style={styles.SaloonItem}>

                                    <Text style={styles.saloonName}>{item?.firstName} {item?.lastName}</Text>


                                    <View style={styles.PhoneContainer} className="flex-row justify-between">
                                        <Image source={require('../../assets/Icons/Callmale.png')} />
                                        <Text style={styles.Phone}>{item?.Phone ? item.Phone : 920000000}</Text>
                                    </View>
                                    <View style={styles.ratingContainer} className="flex-row justify-between">
                                        <Ionicons
                                            name='star'
                                            size={18}
                                            color='#F4C01E'
                                        />

                                        <Text style={{ color: colors.font1 }} className="ml-1">{item?.totalReviews}</Text>
                                        <Text style={{ color: colors.fontSubheadin }}>({item?.averageRating})</Text>

                                    </View>
                                </View>



                            </View>
                        </TouchableOpacity>
                    )}

                />
            </View>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: Rh(2),
        marginLeft: Rw(6),
        marginBottom: Rh(3),
        backgroundColor: `${colors.background}`,

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FlatListContainer: {
        height: Rh(100),
    },
    
    bannerContainer: {
        width: Rw(79),
        height: Rw(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignItems: 'between',
        marginRight: Rw(5),
        borderRadius: Rw(3),
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.2)',
        marginBottom: Rh(2),
    },
    itemContainer: {
        marginBottom: Rh(2), // Add bottom margin for gap between items
    },
    bannerImage: {
        width: Rw(30),
        height: Rh(9),
        marginLeft: Rw(-2),
        borderTopLeftRadius: Rw(5.2),

        borderBottomLeftRadius: Rw(5.2),
    },
    avatarImage: {
        width: Rw(30),
        height: Rh(13),
        marginLeft: Rw(-2),
        borderTopLeftRadius: Rw(5.2),

        borderBottomLeftRadius: Rw(5.2),
    },
    SaloonItem: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' ,marginLeft: Rw(2),},

    saloonName: {
        marginLeft: Rw(1),
        marginTop: Rh(1.2),
        color: `${colors.font1}`,
        fontSize: fo(1.9),
        
    },
    Phone: {
        color: `${colors.fontSubheadin}`,
        marginLeft: Rw(1.3),
        marginTop: Rh(0.7),
    }
    ,
    ratingContainer: {
        marginLeft: Rw(0.1),
    },
    loginText: {
        fontSize: fo(3),
        marginTop: Rw(0),
        fontWeight: 'bold',   
        textAlign: 'center',
        color: 'white',
      },
      backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        marginTop:Rh(1.3),
        marginRight:Rw(2)
      },
});
