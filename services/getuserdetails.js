import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from "./supabase.js"

export async function getUser() {
  console.log("Loading")
  try {

    const token = await AsyncStorage.getItem('AuthToken');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }
 
   
    const response = await fetch(`${baseUrl}/api/userAuth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${token}`, 
      },
    });

   
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    // Parse the response JSON
    const data = await response.json();

    // console.log("This is api call Data",data);
    return data;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching user data:', error);
    throw error;
  }
}
///Update User Data
const updateUser = async ({firstName,  lastName, email, phoneNumber,userImage,Gender }) => {
  console.log(firstName,lastName, email, phoneNumber);
  try {
    const token = await AsyncStorage.getItem('AuthToken');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }
    const formData = new FormData();
    if (userImage!=null) {
    /* This code snippet is part of a function that updates user data. Here's what it does: */
     const fileType = userImage?.endsWith('.jpg') || userImage?.endsWith('.jpeg') ? 'image/jpeg' : 'image/png';
 
    
 
     formData?.append('ProfiePhoto', {
       uri: userImage,
       type: fileType,
       name: Platform.OS === 'android' ? userImage?.split('/').pop() : 'userImage', 
     });
   }
   formData.append('FirstName', firstName);
   formData.append('LastName', lastName);
   formData.append('Email', email);
   formData.append('PhoneNo', phoneNumber);
   formData.append('Gender', Gender);
    const response = await fetch(`${baseUrl}/api/userAuth/UpdateUser`, {
      method: 'PUT',
      headers: {
        'auth-token': token, 
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
export default updateUser;