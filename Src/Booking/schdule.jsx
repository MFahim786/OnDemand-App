import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import BookingButtons from '../../components/bookingButton';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as Rf,
} from 'react-native-responsive-dimensions';
import { colors } from '../../theme';
import { useRoute } from '@react-navigation/native';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [time, setTime]= useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { saloonId } = route?.params;
console.log(time)
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const onMonthChange = (month) => {
    setSelectedYear(month.year);
    setSelectedMonth(month.month + 1);
  };

  // Function to handle button press and navigate
  const handleButtonPress = (selectedTime) => {
    setTime(selectedTime.format())
    navigation.navigate('RecptBooking', {
      saloonId: saloonId,
      selectedDate: selectedDate,
      selectedTime: selectedTime.format(),
    });
  };
handleNavigation = () => {
  if(time==null){
    Alert.alert('Please select Time For Booking');
    return;
  }
  navigation.navigate('RecptBooking', {
  saloonId: saloonId,
  selectedDate: selectedDate,
  selectedTime: time,
});}
  // Generate buttons for each hour of the day
  const generateTimeButtons = () => {
    const buttons = [];
    for (let i = 0; i < 24; i++) {
      const time = moment().startOf('day').add(i, 'hours');
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.timeButtonContainer,
            time.format('YYYY-MM-DD HH:mm') === selectedDate ? styles.selectedTimeButton : null,
          ]}
          onPress={() => handleButtonPress(time)}
        >
          <Text style={styles.timeButtonText}>
            {time.format('h:mm A')}
          </Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  return (
    <View style={styles.container}>
     
      <Calendar
      style={{  height: Rh(28) }}
        current={`${selectedYear}-${selectedMonth.toString().padStart(2, '0')}`}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        disableMonthChange={false}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
      />

      {/* Table of time buttons */}
      <View style={styles.timeButtonTable}>{generateTimeButtons()}</View>

      {/* Booking button */}
      <View style={styles.bookingButtonContainer}>
        <BookingButtons backgroundColor={colors.ServiceProvider_buttonBackground} titlenext={'Book Now'} pressnext={handleNavigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS=='android'?Rh(0): Rh(4) ,
  },
  timeButtonTable: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Rh(15),
    paddingHorizontal: Rw(10),
  },
  timeButtonContainer: {
    width: Rw(26), // Adjust the width as needed
    marginVertical: Rh(0.4),
    marginHorizontal: '0%',
    backgroundColor: colors.ServiceProvider_buttonBackground,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    height:Rh(4.5)
  },
  timeButtonText: {
    color: 'white',
    fontSize: Rf(2.3),
  },
  bookingButtonContainer: {
    alignItems: 'center',
    marginTop: Rh(7),
  },
  selectedTimeButton: {
    backgroundColor: 'blue', // Change the background color to your desired color
  },
});
