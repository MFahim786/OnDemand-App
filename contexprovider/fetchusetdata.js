import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserData = async () => {
   
  try {
    console.log('chlla 2+++++++++++++++++++++++++++++')
    const  user= await AsyncStorage.getItem('userData');
    const userDataJson = JSON.parse(user);
    if (userDataJson) {
      return userDataJson;
    } else {
      console.log('User data not found in AsyncStorage');
      return null; 
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; 
  }
};

export default fetchUserData;


