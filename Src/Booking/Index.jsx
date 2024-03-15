import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, ScrollView, Text,TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useProductContext } from '../../contexprovider/ProduxtContext';
import BookingButtons from '../../components/bookingButton';
import ScreenWrapper from '../../components/ScreenWrapper';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { colors } from '../../theme';
import { serviceProviderList } from '../../services/beautationData';
import {
  responsiveScreenFontSize as Rf, responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Platform } from 'react-native';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import BackButton from '../../components/backbutton';
const ServiceListShow = () => {
  const { addProduct } = useProductContext();
  const [selectedServiceProvider, setSelectedServiceProvider] = useState({});
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const route = useRoute();
  const { beauticianId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await serviceProviderList(beauticianId);
        setServiceData(data.services);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log('chllaa')
    setSelectedSubServices([]);
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const options = serviceData?.map(service => ({
    item: service.categoryName,
    id: service._id,
    subServices: service.Types.map(type => ({
      item: `${type.Name} - ${type.Price}`,
      id: type._id
    })),
  }));

  const saveBookingData = () => {
    const selectedService = serviceData.find(service => service._id === selectedServiceProvider.id);
    const bookingData = {
    
      service: {

        id: selectedServiceProvider.id,
        name: selectedService?.categoryName,
        realPrice: selectedService?.Types.reduce((total, type) => total + parseFloat(type.Price), 0), // Calculating total price of all sub-services
      },
      subServices: selectedSubServices.map(subService => ({
        id: subService.id,
        name: subService.item.split(' - ')[0], // Extracting name from item
        realPrice: parseFloat(subService.item.split(' - ')[1]), // Extracting realPrice from item
      })),
    
    };
    addProduct(bookingData);
    navigation.navigate('Schedule',{saloonId:beauticianId});
  };
  
  return (
   
      <ScreenWrapper style={styles.container}>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:colors.topbackground,height:Rh(8),width:'100%',marginTop:Platform.OS=='android'? 0: Rh(1.3)}}>
      <TouchableOpacity
          style={styles.backButton}
        >
          <BackButton onPress={()=> navigation.navigate('BottomNavigation')}/>
        </TouchableOpacity>
        <Text style={styles.loginText}>Select Service</Text> 
        </View>
        <View style={styles.content}>
          <SelectBox
            label="Select Service"
            options={options}
            value={selectedServiceProvider}
            onChange={onChange()}
            hideInputFilter={false}
            toggleIconColor={colors.ServiceProvider_buttonBackground}
            arrowIconColor={colors.ServiceProvider_buttonBackground}
            width={Rw(85)}
          />
          <View style={{ height: 40 }} />
          <SelectBox
            label="Select Sub Service"
            options={selectedServiceProvider.subServices || []}
            selectedValues={selectedSubServices}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
            toggleIconColor={colors.ServiceProvider_buttonBackground}
            arrowIconColor={colors.ServiceProvider_buttonBackground}
            width={Rw(85)}
            labelStyle={{ color: 'black' }} 
          />
         
        </View>
        <View style={styles.bottomButtonContainer}>
            <BookingButtons backgroundColor={colors.ServiceProvider_buttonBackground} titlenext={'Book Now'} pressnext={saveBookingData} />
          </View>
      </ScreenWrapper>
   
  );

  function onMultiChange() {
    return (item) => setSelectedSubServices(xorBy(selectedSubServices, [item], 'id'));
  }

  function onChange() {
    return (val) => {
      setSelectedServiceProvider(val);
      setSelectedSubServices([]); // Reset selected sub-services when changing the service provider
    };
  }
};

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? Rh(1) : Rh(2),
    alignItems: 'center',
    marginBottom: Rh(2),
  },
  headerText: {
    fontSize: Rf(3.5),
    fontWeight: 'bold',
    color: colors.font1,
  },
  content: {
    marginLeft: Rw(8),
    marginTop:Rh(2.6)
  },
  bottomButtonContainer: {
    position:'absolute',
    marginTop:Platform.OS=='android'?Rh(60): Rh(58),
    bottom: 10,
    width: '100%',
    height: 50, // Fixed height
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

export default ServiceListShow;
