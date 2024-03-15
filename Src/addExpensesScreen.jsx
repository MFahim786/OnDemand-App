import {View, Text, TouchableOpacity,
    Image, 
    FlatList,
   StyleSheet
   } from 'react-native';
 import React from 'react';
 import ScreenWrapper from '../components/ScreenWrapper';
 import {colors} from '../theme';
 import randomImage from '../assets/Banner/randomImage';
 import EmptyList from '../components/emptylist';
 import { useIsFocused, useNavigation } from '@react-navigation/native';
 const items = [
   {
     id: 1,
     place: 'Gujrat',
     country: 'Pakistan',
   },
   {
     id: 2,
     place: 'London Eye',
     country: 'England',
   },
   {
     id: 3,
     place: 'Washington dc',
     country: 'America',
   },
   {
     id: 4,
     place: 'New york',
     country: 'America',
   },
   {
     id: 2,
     place: 'London Eye',
     country: 'England',
   },
   {
     id: 3,
     place: 'Washington dc',
     country: 'America',
   },
   {
     id: 4,
     place: 'New york',
     country: 'America',
   },
 ];
 export default function HomeScreen() {
   const navigation=useNavigation();
   return (
     // {/*main menu*/}
     <ScreenWrapper className="flex-1 ">
       <View className="flex-row justify-between items-center p-4">
         <Text className={`${colors.heading}  font-bold text-3xl shadow-sm`}>
           Expensify
         </Text>
         <TouchableOpacity className="p-2 bg-white border border-gray-200 rounded-full">
           <Text className={`${colors.heading}`}>Logout</Text>
         </TouchableOpacity>
       </View>
 
       <View className="flex-row justify-center bg-blue-200 rounded-xl mx-4 mb-4">
         <Image
           source={require('../assets/banner.png')}
           className="w-60 h-60"></Image>
       </View>
 
       <View className="px-4 space-y-3">
         <View className="flex-row justify-between items-center">
           <Text className={`${colors.heading} text-bold text-xl`}>
             Recent Trips
           </Text>
           <TouchableOpacity 
            onPress={()=> navigation.navigate('AddTrip')}  
           className="p-2 bg-white border border-gray-200 rounded-full">
             <Text className={`${colors.heading}` } >Add Trip</Text>
           </TouchableOpacity>
         </View>
         <View style={{height: 600}}>
           <FlatList className="mx-1 "
             data={items}
             ListEmptyComponent={<EmptyList meddage={"You haven't recorded any trips yet"}/>}
             columnWrapperStyle={{
               justifyContent:"space-between"
             }}
             keyExtractor={item=>item.id}
             numColumns={2}
             showsVerticalScrollIndicator={false}
             renderItem={({item}) => {
               return (
                 <TouchableOpacity onPress={()=>navigation.navigate('AddExpensesScreen')} className="bg-white p-3  rounded-xl  mb-3 shadow-sm">
                   <View>
                     <Image source={randomImage()} className="h-36 w-36  mb-2"/>
                     <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                     <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                   </View>
                 </TouchableOpacity>
               );
             }}
           />
         </View>
       </View>
     </ScreenWrapper>
   );
 }
 