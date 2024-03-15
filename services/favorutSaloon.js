import { baseUrl } from "./supabase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function favSaloons() {
    
    const authToken = await AsyncStorage.getItem('AuthToken');
    const saloonId = await AsyncStorage.getItem('beauticianId');
    console.log(authToken)
    console.log(saloonId,'------------')
    const url = `${baseUrl}/api/userAuth/RemoveFavriote`;
    const options = {
        method: 'POST', // Assuming you're trying to send a PUT request
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${authToken}`
        },
        body: JSON.stringify({
            Beautician: saloonId
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('PUT request successful, response:', data);
    } catch (error) {
        console.error('PUT request failed:', error);
    }
}
export async function removeFavSaloons() {
    
    const authToken = await AsyncStorage.getItem('AuthToken');
    const saloonId = await AsyncStorage.getItem('beauticianId');
    console.log(authToken)
    console.log(saloonId,'------------')
    const url = `${baseUrl}/api/userAuth/AddFavriote`;
    const options = {
        method: 'POST', // Assuming you're trying to send a PUT request
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${authToken}`
        },
        body: JSON.stringify({
            Beautician: saloonId
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('PUT request successful, response:', data);
    } catch (error) {
        console.error('PUT request failed:', error);
    }
}
//Favorite Saloons Called Api Request
export const favSaloonsList=async ()=>{
    const authToken = await AsyncStorage.getItem('AuthToken');
    try{
       const response = await fetch(`https://ods.devfusion.co/api/userAuth/FavrioteBeautician`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'auth-token': `${authToken}`
         },
       });
   
       if (!response.ok) {
         throw new Error('Failed to log in');
       }
   
       const data = await response.json();
       console.log("===========",data[0])
       return data;
    
      
     } catch (error) {
    console.error('Error Feting Beautaion in:', error);
    }
   }