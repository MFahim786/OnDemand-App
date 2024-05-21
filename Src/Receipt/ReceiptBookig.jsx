import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform ,TextInput ,TouchableOpacity,ActivityIndicator, Alert,StyleSheet,ScrollView, Modal} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { colors } from '../../theme';
import { responsiveHeight as Rh, responsiveScreenWidth as Rw, responsiveScreenFontSize as fo } from 'react-native-responsive-dimensions';
import { useProductContext } from '../../contexprovider/ProduxtContext'; // Import the context hook
import { useRoute } from '@react-navigation/native';
import BookingButtons from '../../components/bookingButton';
import { bookingConfirm } from '../../services/bookingconfrm';
import BackButton from '../../components/backbutton';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RecptBooking = () => {
    const route = useRoute();
    const { saloonId, selectedDate, selectedTime } = route.params;
    const formattedTime = moment(selectedTime).format('hh:mm A');
    const { products } = useProductContext(); 
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [location, setLocation] = useState('');
    const [JazzCash, setJazzCash] = useState(false);
    const [model, setShowModel] = useState(false);
  const navigation = useNavigation();
    const handleBooking = async () => {
      if (location === null) {
        Alert.alert(
          'Please Add Your Location'
        );
        return;
      }
    
      setLoading(true);
      try {
        const { mainServiceIds, subServiceIds } = extractIdsFromProducts();
        // Pass mainServiceId and subServiceId to bookingConfirm function
        await bookingConfirm({ saloonId, selectedDate, formattedTime, mainServiceIds,mainServiceIds, subServiceIds,totalAmount,location });
        Alert.alert("Booking Confirmed")
        setLoading(false);
      } catch (error) {
        console.error('Error confirming booking:', error);
        setLoading(false);
      }finally{
        setLoading(false);
       
      }
    }
  
    const extractIdsFromProducts = () => {
      const mainServiceIds = [];
      const subServiceIds = [];
  
      products.forEach(product => {
        // Extract main service ID
        if (product.service && product.service.id) {
          mainServiceIds.push(product.service.id);
        }
  
        // Extract sub-service IDs
        if (product.subServices && product.subServices.length > 0) {
          product.subServices.forEach(subService => {
            if (subService.id) {
              subServiceIds.push(subService.id);
            }
          });
        }
      });
  
      return { mainServiceIds, subServiceIds };
    };
  
    const { mainServiceIds, subServiceIds } = extractIdsFromProducts();
    console.log(mainServiceIds)
    useEffect(() => {
        // Calculate total amount when products change
        calculateTotalAmount();
      }, [products]);
    
      const calculateTotalAmount = () => {
        let total = 0;
        products.forEach(product => {
          if (product.subServices && product.subServices.length > 0) {
            product.subServices.forEach(subService => {
              total += parseFloat(subService.realPrice);
            });
          }
        });
        setTotalAmount(total.toFixed(2)); 
      };
      useEffect(() => {
        const fetchLocation = async () => {
          try {
            const location = await AsyncStorage.getItem('address');
            setLocation(location);
            console.log(location);
          } catch (error) {
            console.log(error);
          }
        }
      
        fetchLocation();
      }, []);
  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.headerbackground} />
        </View>
      );
    }
  

    const renderServiceItem = (title, price) => (
      <View style={{ backgroundColor: 'white',  height: Rh(4), width:Platform.OS=='android'?Rw(82): Rw(80.8),borderRadius:Rw(10),borderBlockColor:colors.font1,borderWidth:1 }}>
        <Text style={{ fontSize: fo(2), marginTop: Rw(2.5), color: colors.font1, marginLeft: Rw(6) }}>{title}</Text>
        <View><Text style={{ fontSize: fo(2), marginTop: Rw(-5.5), color: colors.font1, marginLeft: Rw(60) }}>Pkr {price}</Text></View>
      </View>
    );
  return (
    <ScreenWrapper>
      
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('BottomNavigation')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Receipt</Text> 
        </View>
      {/* ServiceProvider Section */}
      <View style={{ flexDirection: 'row',marginTop:Platform.OS=='ios'?Rh(0):0 }}>
        {[{ image: require('../../assets/popularServiceProvider/Bacground.png') },
    
       
        ].map((item, index) => (
          <View key={index} style={{ marginTop:Rh(2) }}>
            <Image source={item.image} style={{ height:Rh(10),width:Rw(30) }} />
          </View>
        ))}

<View style={{ flexDirection: 'row', marginTop: Rh(2), borderStyle: 'dashed', borderColor: colors.font1, borderWidth: Rw(0.4), height: Rh(9), width: Rw(60), marginLeft: Rw(0), borderRadius: Rw(5), alignItems: 'center' }}>
  <View style={{ marginLeft: Rw(7) }}>
    <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rh(0), color: colors.font1 }}>Serenity Salon</Text>
    <Text style={{ fontSize: fo(2), fontWeight: 'bold', marginTop: Rh(0.1), color: colors.heading }}>56478965</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Rh(0.2) }}>
      <Image source={require('../../assets/Icons/star.png')} style={{ marginRight: Rw(1), width: Rw(4), height: Rh(1.8) }} />
      <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: colors.font1 }}>4.9</Text>
      <Text style={{ fontSize: fo(1.7), fontWeight: 'bold', color: colors.heading, marginLeft: Rw(0) }}>(27)</Text>
    </View>
  </View>
</View>

      </View>

      {/* Date and Time Section */}
      {[{ title: `Date: ${selectedDate}` }, { title: `Time: ${formattedTime}` }].map((item, index) => (
        <View key={index} style={{ elevation: Platform.OS === 'android' ? 5 : undefined, marginLeft: Rw(14), backgroundColor: colors.headerbackground, height: Rh(5), width: Rw(70), borderRadius: Rw(1), marginTop: index === 1 ? Rh(2) : Rh(0),marginTop:Rh(1) }}>
          <Text style={{ borderColor: colors.background, borderWidth: Rw(0.5), fontSize: fo(2), marginTop: Rw(1.9), color: colors.font1, marginLeft: Rw(2), marginRight: Rw(2), textAlign: 'center' }}>{item.title}</Text>
        </View>
      ))}

      {/* Pricing Section */}
      <View style={{ marginTop: Rh(1), marginLeft: Rw(7), width: Rw(86), height: Rh(37), borderWidth: Rw(2), borderColor: 'white' }}>
        <View style={{ backgroundColor: colors.topbackground, height: Rh(5), width:Platform.OS=='android'?Rw(82): Rw(80.8),flexDirection:'row' }}>
        <Text style={{ fontSize: fo(2.3), marginTop: Rh(1), color: colors.font1, marginLeft: Rw(6) }}>Name</Text>
          <Text style={{ fontSize: fo(2.3), marginTop: Rh(1), color: colors.font1, marginLeft: Rw(43) }}>Pricing</Text>
        </View>
        <ScrollView scrollIndicatorInsets={false} style={{marginTop:Rh(0.6)}}>
        <Text>
          {products?.map((item, index) => (
            <React.Fragment key={index}>
              {/* Log subServices within each product */}
              {item?.subServices?.map((subService, subIndex) => (
                <React.Fragment key={subIndex}>
                  {renderServiceItem(subService?.name, subService?.realPrice, item._id, subService._id)}
                  {console.log(subService?.name, subService?.realPrice)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Text>
        </ScrollView>
      </View>

      {/* Total Time, Subtotal, Coupon Discount, and Total Section */}
      <View style={{ flexDirection: "row", marginTop: Rh(1.5) }}>
        <Text style={{ marginLeft: Rw(9), fontFamily: colors.fontfaimly_heding, color: colors.heading }}>Total Time:</Text>
        <Text style={{ marginLeft: Rw(50), fontWeight: 'bold', fontFamily: colors.fontfaimly_text, color: colors.font1 }}>20 Minutes</Text>
      </View>
      {/* Cupon input field */}
      <View>
        <View style={{ marginTop: Rh(2), paddingHorizontal: Rw(7) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 20, borderWidth: 1, borderColor: colors.font1, overflow: 'hidden' }}>
            {/* Red dot */}
            <View style={{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, marginLeft: 10 }} />
            
            {/* Coupon input field */}
            <TextInput
              style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 15, fontSize: fo(2), color: colors.font1 }}
              placeholder="Enter coupon code"
              placeholderTextColor={colors.font1}
              // Add onChangeText prop to update the coupon state
            />
            
            {/* Apply button */}
            <TouchableOpacity
              style={{ backgroundColor: colors.ServiceProvider_buttonBackground, paddingHorizontal: 20, paddingVertical: 10 }}
            >
              <Text style={{ fontSize: fo(2), color: colors.background }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
      <Text style={{ fontSize: fo(2), marginTop: Rw(2), color: colors.font1, marginLeft: Rw(6) }}>Total Amount: PKR {totalAmount} </Text>
      </View>
      {/* Confirm Button */}
      <View style={{ marginTop:Platform.OS=='ios'?Rh(8): Rh(8)}}>
        <BookingButtons backgroundColor={colors.ServiceProvider_buttonBackground} titlenext={'Book Now' } pressnext={()=>handleBooking()} />
      </View>
      {/* {Model for transaction confirming} */}
      {model&&(
      <Modal isVisible={false} transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Select Payment Method</Text>
      <TouchableOpacity style={[styles.paymentMethodContainer, {borderColor: 'black'}]}>
      <Image style={styles.bankCardImg} source={require('../../assets/Payment/bankcard.png')}/>
        <Text style={styles.paymentMethodText1}>Bank Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity 
  style={[styles.paymentMethodContainer, { borderColor: 'black' }]}
  onPress={() => setJazzCash(true)}
>
<Image style={styles.jazzCashImg} source={require('../../assets/Payment/Jazzcash.png')}/>
  <Text style={styles.paymentMethodText}>JazzCash Transfer</Text>
  
</TouchableOpacity>
{/* Additional details for JazzCash Transfer */}
{JazzCash && (
  <View style={styles.paymentDetailsContainer}>
    <TextInput
      style={styles.transactionInput}
      placeholder="Enter Transaction ID"
      placeholderTextColor={colors.font1}
      // Add onChangeText prop to update the transaction ID state
    />
  </View>
)}
      {/* Additional details for Bank Transfer */}
      <View style={styles.paymentDetailsContainer}>
        <Text style={styles.paymentDetailsTitle}>Account No:</Text>
        <Text style={styles.paymentDetails}>123456789</Text>
      </View>
      {/* Additional details for JazzCash Transfer */}
    
    </View>
  </View>
</Modal>
)}

    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({

  EmailText: {
    fontSize: fo(1.3),
    color: colors.font1,
    fontWeight: 'bold',
    marginLeft: Rw(1),
    marginBottom:Rh(1)
  },
  backButton: {
    position: 'absolute',
    top: Rh(0.5),
    left: Rw(0.2),
    zIndex: 1,
    marginTop:Rh(2),
    marginLeft:Rw(4)
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: 'auto', 
    height:'50%'
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: colors.font1
  },
  paymentMethodContainer: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
    top: Rh(0.7),
    color: colors.font1
  },
  paymentMethodText1: {
    fontSize: 16,
    fontWeight: 'bold',
    top: Rh(0),
    left:2,
    color: colors.font1
  },
  paymentDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  paymentDetailsTitle: {
    fontSize: 16,
    marginRight: 5,
    color: colors.font1
  },
  paymentDetails: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.font1
  },
  transactionInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: fo(2),
    color: colors.font1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 10,
  },
  jazzCashImg:{
    width: Rw(8),
    height: Rw(8),
    
  },
  bankCardImg:{
    width: Rw(8),
    height: Rw(5),
  }
});
export default RecptBooking;