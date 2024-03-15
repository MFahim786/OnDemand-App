import { baseUrl } from "./supabase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addReview({rating,description,id}) {
    const token = await AsyncStorage.getItem('AuthToken');
    try {
      const response = await fetch(`${baseUrl}/api/userAuth//AddReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`
        },
        body: JSON.stringify({
            Beautician:id,
          Rating:rating   ,
          Description: description
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed AddReview');
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error sending Adding Review:', error);
      throw error;
    }
  }