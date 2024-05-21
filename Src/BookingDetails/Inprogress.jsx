import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Animated, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import { getAllBooking } from '../../services/bookingconfrm';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../services/supabase';
export default function Inprogress() {
    const navigation=useNavigation();
    const [bannerData, setBannerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllBooking();
                console.log('Fetched data:', data);
                setBannerData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
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

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.headerbackground} />
                </View>
            ) : (
                <FlatList
                    data={bannerData?.bookings?.filter(item => item?.Status === "Pending")}
                    horizontal={false}
                    keyExtractor={item => item._id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        onPress={() => navigation.navigate('RecptComplete')}
                        >
                        <View style={styles.bannerContainer}>
                            {item?.Beautician?.ProfiePhoto ? (
                                <Image
                                    style={styles.bannerImage}
                                    source={{ uri: `${baseUrl}/${item.Beautician?.ProfiePhoto}` }}
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
                   
                   <Text style={{ color: colors.fontWhite,textAlign:'center',fontSize:fo(1.3) }}>{item.Status}</Text>
               </View>
                            </View>

                           
                        </View>
                        </TouchableOpacity>
                    )}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                />
            )}
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
        height: Rw(20),
        flexDirection: 'row',
        marginTop: Rh(2),
        alignItems: 'center',
        // justifyContent: 'space-between',
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
        height: Rh(10),
        marginLeft: Rw(-2),
        borderTopLeftRadius: Rw(5.2),

        borderBottomLeftRadius: Rw(5.2),
    },
    SaloonItem: { flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',left:Rw(3) },

    saloonName: {
        marginLeft: Rw(2),
        color: `${colors.font1}`,
        fontSize: fo(1.9),
        fontWeight:'400'
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
bottom:Rh(.2)
    },
    ratingContainer:{
      backgroundColor:colors.buttononhover,
      borderRadius:10,
      width: Rw(15),
      height: Rh(2),
      marginBottom:Platform.OS=='android' ? Rh(0):0,
    }
});
