import { baseUrl } from "./supabase.js";
//Alll catgories are fetched from the database
const allCategories=async ()=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/Category`, {
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
//beautation with category

   
export {allCategories};