import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button, Alert } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serviceProviderList } from '../../services/beautationData';
import { colors } from '../../theme';
import { useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
const ServiceList = () => {
  const [selectedServiceProvider, setSelectedServiceProvider] = useState({});
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const route = useRoute();
  const { beauticianId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await serviceProviderList(beauticianId);
        console.log('Fetched data:', data);
        setServiceData(data.services);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  // Transform fetched data into the format expected by SelectBox
  const options = serviceData?.map(service => ({
    item: service.categoryName,
    id: service._id,
    subServices: service.Types.map(type => ({
      item: `${type.Name} - ${type.Price}`,
      id: type._id
    })),
  }));

  const saveBookingData = async () => {
    try {
      const bookingData = {
        service: selectedServiceProvider.id,
        Type: selectedSubServices.map(subService => ({ TypeID: subService.id })),
        TotalAmount: '2500' // Assuming total amount is constant or derived from selected services
      };
      await AsyncStorage.setItem('bookingData', JSON.stringify(bookingData));
      Alert.alert('Booking Data Saved', 'Booking data has been saved successfully!');
    } catch (error) {
      console.error('Error saving booking data:', error);
      Alert.alert('Error', 'Failed to save booking data. Please try again.');
    }
  };

  return (
    <View style={{ marginTop: Platform.OS === 'ios' ? Rh(3) : Rh(3),width:Rw(90),marginLeft:Rw(3) }}>
      <SelectBox
        label="Select Service"
        options={options}
        value={selectedServiceProvider}
        onChange={onChange()}
        hideInputFilter={false}
      />
      <View style={{ height: 40 }} />
      <SelectBox
        label="Select multiple"
        options={selectedServiceProvider.subServices || []}
        selectedValues={selectedSubServices}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
    
      
    </View>
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

export default ServiceList;
