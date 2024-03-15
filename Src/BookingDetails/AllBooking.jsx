import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
    ActivityIndicator,
    Platform
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { colors } from '../../theme';
import {
    responsiveHeight as Rh,
    responsiveScreenWidth as Rw,
    responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Entypo';
import { PopularItems } from '../../assets/popularServiceProvider/PopularServiceProvider';
import { getAllBooking } from '../../services/bookingconfrm';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../services/supabase';
export default function AllBooking() {
    const navigation=useNavigation();
    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true);
   console.log(bannerData)
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBooking();
                console.log('Fetched data:', data);
                setBannerData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

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
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.headerbackground} />
            </View>
        );
    }
    return (
        <View clasName="" style={styles.container}>
         
            
            {/* Popular Saloons  */}
            <View >
            <FlatList
    data={bannerData?.bookings}
    horizontal={false}
    pagingEnabled
    keyExtractor={item => item._id} // Use a unique identifier like _id
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
        <TouchableOpacity
                        onPress={() => navigation.navigate('RecptComplete')}
                        >
        <View style={styles.bannerContainer} >
            {item?.Beautician?.ProfiePhoto ? (
                <Image
                    style={styles.bannerImage}
                    source={{ uri: `${baseUrl}/${item.Beautician?.ProfiePhoto.replace(/\\/g, '/')}` }}
                />
            ) : (
                <Image
                    style={styles.bannerImage}
                    source={require('../../assets/popularServiceProvider/popular.png')}
                />
            )}

            <View style={styles.SaloonItem}>
                <Text style={styles.saloonName}>{item.Beautician.FirstName} {item.Beautician.LastName}</Text>

                <View style={styles.PhoneContainer}>
                    <Image source={require('../../assets/Icons/Callmale.png')} />
                    <Text style={styles.Phone}>{item.Beautician.PhoneNo}</Text>
                </View>
               
                <View style={styles.ratingContainer}>
                   
                    <Text style={{ color: colors.fontSubheadin,textAlign:'center',fontSize:fo(2) }}>{item.Status}</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',margin:'1%' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddTrip')}
                    style={{ padding: 8, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius: 100, marginBottom: 2, marginRight: 1 }}>
                    <Text style={styles.buttontext}>View</Text>
                </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
    )}
    onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
    )}
/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: Rh(1),
        
        marginBottom: Rh(3),
       

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    FlatListContainer: {
        height: Rh(100),
    },
    buttontext: {
        fontSize: fo(1.4),
        color: `${colors.font1}`,
    },
    bannerContainer: {
        width: "97%",
        height: Rw(30),
        flexDirection: 'row',
        marginTop: Rh(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'between',
        marginRight: Rw(10),
        marginLeft:Rw(2.4),
        borderRadius: Rw(3),
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.2)',
        backgroundColor: `${colors.background}`,
    },
    bannerImage: {
        width: Rw(35),
        height: Rh(13.5),
        marginLeft: Rw(-2),
        borderTopLeftRadius: Rw(5.2),

        borderBottomLeftRadius: Rw(5.2),
    },
    SaloonItem: { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' },

    saloonName: {
        marginLeft: Rw(2),
        marginTop: Rh(1.2),
        color: `${colors.font1}`,
        fontSize: fo(1.9),
    },
    Phone: {
        color: `${colors.font1}`,
        marginLeft: Rw(2),
        marginTop: Rh(0.7),
    }
    ,
    PhoneContainer: {
flexDirection: 'row',
justifyContent: "flex-start",
    },
    ratingContainer:{
      backgroundColor:colors.headersubGround,
      borderRadius:10,
      width: Rw(23),
      height: Rh(3),
      marginBottom:Platform.OS=='android' ? Rh(2):0,
    }
});
