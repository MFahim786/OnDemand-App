import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "./supabase.js";

export async function sendOTP() {
    const token = await AsyncStorage.getItem('AuthToken');
    console.log("This is saved token +++++++++++++++++++++++",token);
    try {
      const response = await fetch(`${baseUrl}/api/userAuth/SendOTPagain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
  
      const data = await response.json();
      console.log('OTP sent successfully:', data.message);
      return data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }
  export async function verifyOTP( otp) {
    console.log("This is saved  +++++++++++++++++++++++",otp);
    const token = await AsyncStorage.getItem('AuthToken');
    try {
      // Send a request to the server to verify the OTP
      const response = await fetch(`${baseUrl}/api/userAuth/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          otp: otp,
        }),
      });
  
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }
  
     
      const data = await response.json();
  
      
      if (data.success) {
        console.log('OTP verified Successfully');
      }
  
      // Return the response data
      return data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }
  //Add email addresses to send otp 
  export async function sendOtpOnEmail({Email}) {
   console.log('Sending',Email);
    try {
      const response = await fetch(`${baseUrl}/api/userAuth/SendOTPemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
     email:Email,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
  
      const data = await response.json();
      console.log('OTP sent successfully:', data.message);
      return data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }