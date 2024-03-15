import { baseUrl } from "./supabase.js";
//Top beautationses
const topBeautaion=async ()=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/TopRatedBeauticians`, {
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

//All Beautaiones Details
const allBeautaion=async ()=>{
    
 try{
    const response = await fetch(`${baseUrl}/api/userAuth/allBeauticians`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
   console.log("=======",data)
    return data;
  } catch (error) {
 console.error('Error Feting Beautaion in:', error);
 }
}
///beautation with Categories

const beautationCategories=async (categoryId)=>{
   
  try{
     const response = await fetch(`${baseUrl}/api/userAuth/CtgBeautician/${categoryId}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       throw new Error('Failed to log in');
     }
 
     const data = await response.json();
     console.log(data)
     return data;
     
   } catch (error) {
  console.error('Error Feting Beautaion in:', error);
  }
 }
export  {allBeautaion,topBeautaion,beautationCategories}