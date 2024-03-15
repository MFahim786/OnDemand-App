import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme';
import { beautaionAbout } from '../../services/beautationData';
import { useRoute } from '@react-navigation/native';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';
const ServiceProviderAbout = () => {
  const [activeSection, setActiveSection] = useState('');
  const [serviceData, setServiceData] = useState(null);
  console.log("+++==",serviceData);
  const [indicater, setIndicater] = useState(false);
  const route = useRoute();
  const { beauticianId } = route.params;
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await beautaionAbout(beauticianId); // Assuming beauticianId is defined somewhere
       
        setServiceData(data);
        
        setIndicater(true);
      } catch (error) {
        setIndicater(false);
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!indicater) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }
  const renderContent = () => {
    switch (activeSection) {
      case 'About Us':
        return (
          <View>
            
            {serviceData && serviceData.about && serviceData.about.Contact && (
              <Text style={styles.contentText}>
                Address: {serviceData.about.Contact.Address}
              </Text>
            )}
          </View>
        );
      case 'Open-Closed':
        return (
          <View>
            {serviceData && serviceData.about && serviceData.about.Timings ? (
              serviceData.about.Timings.map(day => (
                <View key={day._id} style={styles.timingRow}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.dayText}>{day.day}</Text>
                    <View style={{marginLeft:Rw(30)}}>
                    <Text style={styles.timingText}>
                      {day.isOpen ? `${day.openTime} - ${day.closeTime}` : 'Closed'}
                    </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.contentText}>Timing is not available</Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => setActiveSection('About Us')}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>About Us</Text>
            <Ionicons
              name={activeSection === 'About Us' ? 'chevron-up' : 'chevron-down'}
              size={20}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        {activeSection === 'About Us' && <Text style={styles.contentText}>{renderContent()}</Text>}
      </View>

    

      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => setActiveSection('Open-Closed')}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Open-Closed</Text>
            <Ionicons
              name={activeSection === 'Open-Closed' ? 'chevron-up' : 'chevron-down'}
              size={20}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        {activeSection === 'Open-Closed' && <Text style={styles.contentText}>{renderContent()}</Text>}
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={() => setActiveSection('Contact Us')}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Contact Us</Text>
            <Ionicons
              name={activeSection === 'Contact Us' ? 'chevron-up' : 'chevron-down'}
              size={20}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        {activeSection === 'Contact Us' && <Text style={styles.contentText}>{renderContent()}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  buttonContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  buttonText: {
   
    fontSize: 20,
    marginRight: 5,
    color: "#1a1a1a",
    fontFamily:colors.fontfaimly_heding,
    
  },
  icon: {
    color: '#333333',
  },
  contentText: {
    marginTop: 10,
    fontSize: 18,
    color: colors.fontSubheadin,
    fontFamily:colors.fontfaimly_text

  },
  dayText:{
    fontFamily:colors.fontfaimly_heding,
    color:colors.font1
  },
  timingText:{
     fontFamily:colors.fontfaimly_text,
    color:colors.font1,
   
  }
});

export default ServiceProviderAbout;
