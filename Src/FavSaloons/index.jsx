import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Animated, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useRoute } from '@react-navigation/native';
import { favSaloonsList } from '../../services/favorutSaloon';
import BackButton from '../../components/backbutton';
import { baseUrl } from '../../services/supabase';

export default function FavSaloons() {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [bannerData, setBannerData] = useState('');
    console.log("+++++++", bannerData)

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await favSaloonsList();
                console.log('Fetched data:', data);
                setBannerData(data?.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [1]);

    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            }),
        ).start();
    }, []);

    // Render loading state if bannerData is still null or empty
    if (loading === true) {
        return (
            <ScreenWrapper>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </ScreenWrapper>
        );
    }
    // if (bannerData?.length === 0) {
    //     return (
    //         <ScreenWrapper>
    //             <View style={styles.loadingContainer}>
    //                 <Text style={{ fontSize: fo(2.5), color: 'black',fontFamily:colors.fontfaimly_heding }}>No Saloons Found</Text>
    //             </View>
    //         </ScreenWrapper>
    //     );
    // }
    return (
        <ScreenWrapper>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.topbackground, height: Rh(8), width: '100%', marginTop: Platform.OS == 'android' ? 0 : Rh(1.3) }}>
                <TouchableOpacity
                    style={styles.backButton}
                >
                    <BackButton onPress={() => navigation.navigate('Profile')} />
                </TouchableOpacity>
                <Text style={styles.loginText}>Favourite Saloons</Text>
            </View>
            <View style={styles.container}>
                {/* Popular Saloons  */}
                <View >
                    {bannerData?.length === 0 ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No saloons found.</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={bannerData}
                            horizontal={false}
                            pagingEnabled
                            keyExtractor={(item) => item?._id?.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('ServiceProvider',{beauticianId:item?._id})}
                                >
                                    <View style={styles.bannerContainer} >
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
                                        <View style={styles.SaloonItem}>
                                            <Text style={styles.saloonName}>{item.firstName} {item.lastName}</Text>
                                            <View style={styles.PhoneContainer} className="flex-row justify-between">
                                                <Image source={require('../../assets/Icons/Callmale.png')} />
                                                <Text style={styles.Phone}>{item.Phone ? item.Phone : 920000000}</Text>
                                            </View>
                                            <View style={styles.ratingContainer} className="flex-row justify-between">
                                                <Ionicons
                                                    name='star'
                                                    size={18}
                                                    color='#F4C01E'
                                                />
                                                <Text style={{ color: colors.font1, fontSize: fo(1.3) }} className="ml-1">{item.totalReviews}</Text>
                                                <Text style={{ color: colors.fontSubheadin, fontSize: fo(1.3) }}>({item.averageRating})</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </View>
        </ScreenWrapper>
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
    SaloonItem: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: Rw(2), },
    saloonName: {
        marginLeft: Rw(1),
        marginTop: Rh(1.2),
        color: `${colors.font1}`,
        fontSize: fo(1.9),
    },
    Phone: {
        color: `${colors.fontSubheadin}`,
        marginLeft: Rw(2),
        marginTop: Rh(0.7),
        fontSize: fo(1.3)
    },
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
        marginTop: Rh(1.3),
        marginRight: Rw(2)
    },
    noDataContainer: {
       
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: fo(2),
         color: colors.font1,
        fontFamily: colors.fontfaimly_heding,
    },
});
