// App.js
import React from 'react';
import {AppRegistry} from 'react-native';
import { ProductProvider } from './contexprovider/ProduxtContext'; // Import the ProductProvider
import App from './App';
import { name as appName } from './app.json';

const AppWrapper = () => {
  return (
    <ProductProvider> 
      <App />
    </ProductProvider>
  );
};

export default AppWrapper;


AppRegistry.registerComponent(appName, () => AppWrapper);
