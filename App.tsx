import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import AppNavigation from './AppNavigation/Appnavigation';
import ServiceProvider from './Src/ServiceProviderInfo/Index';
import SplashScreen from 'react-native-splash-screen';
function App() {
  useEffect(() =>{
    SplashScreen.hide();
  },[])
  return (
    <AppNavigation />
  );
}

export default App;
