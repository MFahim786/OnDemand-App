import { baseUrl } from "./supabase.js";
//Service Provider List based on The Location
import AsyncStorage from "@react-native-async-storage/async-storage";
//Service Providet Service List
const serviceProviderList=async (beautationid)=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/BeauticianService/${beautationid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
 console.error('Error Feting Beautaion in:', error);
 }
}
//Top beautationses
const beautaionReview=async (beautationid)=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/BeauticianReviews/${beautationid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    return data;
  } catch (error) {
 console.error('Error Feting Beautaion in:', error);
 }
}
//Beautician About 
const beautaionAbout=async (beautationid)=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/BeauticianAbout/${beautationid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    return data;
  } catch (error) {
 console.error('Error Feting Beautaion in:', error);
 }
}
//Beautations Gallrey Umages
const beautaionGallrey=async (beautationid)=>{
  const authToken = await AsyncStorage.getItem('AuthToken');
  console.log(authToken);
    console.log('Beautations Gallrey',beautationid);
  try{
     const response = await fetch(`${baseUrl}/api/userAuth/AllGalleryPhotos/${beautationid}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'auth-token':authToken,
       },
     });
 

     if (!response.ok) {
       throw new Error('Failed to Fetch Images');
     }
 
     const data = await response.json();
     console.log(data);
     return data;
   } catch (error) {
  console.error('Error Feting Beautaion in:', error);
  }
 }
export { beautaionReview,serviceProviderList,beautaionAbout,beautaionGallrey};