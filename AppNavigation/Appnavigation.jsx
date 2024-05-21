import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Src/HomeScreen';
import AddExpensesScreen from '../Src/addExpensesScreen';
import Login from '../Src/Auth/Login';
import BottomNavigation from './bottomNavigation';
import SplashScreen from '../Src/SplashScreen/SplashScreen';
import PopularServiceProvider from '../Src/popularServiceProvider/popularServiceProvider';
import Signup from '../Src/Auth/Signup';
import Profile from '../Src/Profile';
import CurrentLocation from '../Src/Map/CurrentLocation';
import Location from '../Src/Location';
import Changepass from '../Src/Userinfo/Changepass';
import UProfile from '../Src/Userinfo/UProfile';
import ServiceProvider from '../Src/ServiceProviderInfo/Index';
import ServiceListShow from '../Src/Booking/Index';
import RecptPending from '../Src/Receipt/ReceiptPending';
import RecptComplete from '../Src/Receipt/ReceiptComplete';
import OtpVerfication from '../Src/OTP';
import Schedule from '../Src/Booking/schdule';
import CategoreySaloon from '../Src/Catgories/categoreySaloons';
import RecptBooking from '../Src/Receipt/ReceiptBookig';
import Booking from '../Src/BookingDetails/Booking';
import ForgetPassword from '../Src/Auth/ForgetPassword';
import AboutUs from '../Src/AboutUs&PrivicyPolicy/AboutUs';
import FavSaloons from '../Src/FavSaloons';
import PaymentPage from '../Src/PaymentMethod';
import PhotosGallrey from '../Src/ServiceProviderInfo/Gallrey';
import SearchBarResult from '../Src/Search';
import GmailAccountList from '../Src/Auth/GmailAuth';
import FacebookSignIn from '../Src/Auth/FacebookAuth';
import ForgetPasswordEmailOtp from '../Src/Auth/ForgetPasswordEmailOto';
import AddReview from '../Src/AddReview/AddReview';
import PhoneAuth from '../Src/Auth/PhoneAuth';
const Stack = createNativeStackNavigator();
export default function Appnavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{animationEnabled:true}}>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login}  />
        <Stack.Screen options={{headerShown:false}} name="Profile" component={Profile}  />
        <Stack.Screen options={{headerShown:false}} name="Signup" component={Signup}  />
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen}  />
        <Stack.Screen options={{headerShown:false}} name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen options={{headerShown:false}} name="AddExpensesScreen" component={AddExpensesScreen} />
        <Stack.Screen options={{headerShown:false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{headerShown:false}} name="Changepass" component={Changepass} />
        <Stack.Screen options={{headerShown:false}} name="UProfile" component={UProfile} />
        <Stack.Screen options={{headerShown:false}} name="RecptPending" component={RecptPending} />
        <Stack.Screen options={{headerShown:false}} name="RecptComplete" component={RecptComplete} />
        <Stack.Screen options={{headerShown:false}} name="PopularServiceProvider" component={PopularServiceProvider} />
        <Stack.Screen options={{headerShown:false}} name="Location" component={Location} />
        <Stack.Screen options={{headerShown:false}} name="CurrentLocation" component={CurrentLocation} />
        <Stack.Screen options={{headerShown:false}} name="ServiceProvider" component={ServiceProvider} />
        <Stack.Screen options={{headerShown:false}} name="ServiceListShow" component={ServiceListShow} />
        <Stack.Screen options={{headerShown:false}} name="OtpVerfication" component={OtpVerfication} />
        <Stack.Screen options={{headerShown:false}} name="Schedule" component={Schedule} />
        <Stack.Screen options={{headerShown:false}} name="CategoreySaloon" component={CategoreySaloon} />
        <Stack.Screen options={{headerShown:false}} name="RecptBooking" component={RecptBooking} />
        <Stack.Screen options={{headerShown:false}} name="Booking" component={Booking} />
        <Stack.Screen options={{headerShown:false}} name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen options={{headerShown:false}} name="ForgetPasswordEmailOtp" component={ForgetPasswordEmailOtp} />
        <Stack.Screen options={{headerShown:false}} name="AboutUs" component={AboutUs} />
        <Stack.Screen options={{headerShown:false}} name="FavSaloons" component={FavSaloons} />
        <Stack.Screen options={{headerShown:false}} name="PaymentPage" component={PaymentPage} />
        <Stack.Screen options={{headerShown:false}} name="PhotosGallrey" component={PhotosGallrey} />
        <Stack.Screen options={{headerShown:false}} name="SearchBarResult" component={SearchBarResult} />
        <Stack.Screen options={{headerShown:false}} name="GmailAccountList" component={GmailAccountList} />
        <Stack.Screen options={{headerShown:false}} name="FacebookSignIn" component={FacebookSignIn} />
        <Stack.Screen options={{headerShown:false}} name="AddReview" component={AddReview} />
        <Stack.Screen options={{headerShown:false}} name="PhoneAuth" component={PhoneAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}