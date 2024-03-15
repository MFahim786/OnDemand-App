import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';
import { sendOTP } from '../../services/OtpService';
import { verifyOTP } from '../../services/OtpService';
import { useNavigation } from '@react-navigation/native';
const OtpVerification = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const handleResendOTP = () => {
    setSendingOTP(true);
    sendOTP()
      .then(response => {
        Alert.alert('Otp Sent Successfully on Your Email Address');
        console.log('OTP sent successfully:', response);
      })
      .catch(error => {
        Alert.alert('Network Error');
        console.error('Error sending OTP:', error);
      })
      .finally(() => setSendingOTP(false));
  };

  const handleVerifyOTP = () => {
    setVerifyingOTP(true);
    verifyOTP(otp)
      .then(response => {
        navigation.navigate('BottomNavigation');
        console.log('OTP verification successful:', response);
      })
      .catch(error => {
        console.error('Error verifying OTP:', error);
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      })
      .finally(() => setVerifyingOTP(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter OTP"
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleResendOTP} disabled={sendingOTP}>
        {sendingOTP ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Resend OTP</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleVerifyOTP} disabled={verifyingOTP}>
        {verifyingOTP ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: colors.font1,
    textAlign:'center'
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#28a745',
  },
  secondaryButtonText: {
    color: '#fff',
  },
});

export default OtpVerification;
