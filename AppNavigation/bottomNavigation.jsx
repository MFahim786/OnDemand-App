import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Src/HomeScreen';
import Location from '../Src/Location';
import Profile from '../Src/Profile';
import Booking from '../Src/BookingDetails/Booking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight as Rh,
  responsiveScreenWidth as Rw,
  responsiveScreenFontSize as fo,
} from 'react-native-responsive-dimensions';
import { colors } from '../theme';
import { View, Text, TouchableOpacity } from 'react-native'; // Import View, Text, and TouchableOpacity for customization

const Tab = createBottomTabNavigator();

// Custom TabBar component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white', borderTopLeftRadius: Rw(5.2), 
    borderTopRightRadius: Rw(5.2),height:Rh(8),width:Rw(101) }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={index} style={{ flex: 1, alignItems: 'center', padding: 10,backgroundColor:colors.topbackground }} onPress={onPress}>
            <Ionicons
              name={label === 'Home' ? 'home-sharp' : label === 'Location' ? 'location-sharp' : label === 'Booking' ? 'calendar-clear-sharp' : 'person-sharp'}
              size={25}
              color={isFocused ? colors.button : colors.buttonNonTint}
            />
            <Text style={{ color: isFocused ? colors.button : colors.buttonNonTint, fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Location" component={Location} options={{ headerShown: false }} />
      <Tab.Screen name="Booking" component={Booking} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
