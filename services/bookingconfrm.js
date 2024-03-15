import { baseUrl } from "./supabase.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function bookingConfirm({ saloonId, selectedDate, formattedTime, mainServiceIds, subServiceIds,totalAmount,location}) {
    try {
        // Fetch user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const userId = userData?.userData?._id;
        const authToken = await AsyncStorage.getItem('AuthToken');
        // Dynamically calculate the month from the selected date
        const bookingDate = new Date(selectedDate);
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const selectedMonth = monthNames[bookingDate.getMonth()]; // Get the month name
        // Construct the booking payload
        const bookingPayload = {
            Beautician: saloonId, // Beautician ID
            User: userId, // User ID
            Promotion: '65903f9cb1054fb6505ba5be', // Dummy promotion ID
            Service: [
              {
                service: mainServiceIds[0], // Assuming only one main service ID is selected
                Type: subServiceIds?.map(subServiceId => ({
                  TypeID: subServiceId
                }))
              }
            ],
            Payment: {
              Type: "Online",
              OnlinePayment: "65ba0b2f48eebf5d107259c7" // Dummy online payment ID
            },
            BookingTime: {
              Date: selectedDate,
              Month: selectedMonth, // Dynamically calculated month
              Time: formattedTime
            },
            TotalAmount: totalAmount, // Dummy total amount
            Status: "Pending",
            BookingAddress: {
              Address: location,
              City: "",
              lat: "12.345",
              lan: "67.890"
            }
          };
          

        // Send the booking payload to the server
        const response = await fetch(`${baseUrl}/api/userAuth/createBooking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authToken}`
            },
            body: JSON.stringify(bookingPayload),
        });

        if (!response.ok) {
            throw new Error('Failed to create booking');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
//get Alla Booking data from the server
export async function getAllBooking() {
    try {
        // Fetch user data from AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const userId = userData?.userData?._id;
        const authToken = await AsyncStorage.getItem('AuthToken');
      
        // Send the booking payload to the server
        const response = await fetch(`${baseUrl}/api/userAuth/AllBookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authToken}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create booking');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
//get Completed Booking data from the server
export async function CompletedBooking() {
  try {
      // Fetch user data from AsyncStorage
      
      const authToken = await AsyncStorage.getItem('AuthToken');
    
      // Send the booking payload to the server
      const response = await fetch(`${baseUrl}/api/userAuth/CompletedBooking`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': `${authToken}`
          },
      });

      if (!response.ok) {
          throw new Error('Failed to create booking');
      }

      const data = await response.json();

      return data;
  } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
  }
}
//get Upcomming Booking data from the server
export async function upcomingBooking() {
  try {
      // Fetch user data from AsyncStorage
      
      const authToken = await AsyncStorage.getItem('AuthToken');
    
      // Send the booking payload to the server
      const response = await fetch(`${baseUrl}/api/userAuth/UpcomingBooking`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': `${authToken}`
          },
      });

      if (!response.ok) {
          throw new Error('Failed to create booking');
      }

      const data = await response.json();

      return data;
  } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
  }
}
//get Upcomming Booking data from the server
export async function bookingReciptDetails(bookingid) {
  try {
      // Fetch user data from AsyncStorage
      
      const authToken = await AsyncStorage.getItem('AuthToken');
    
      // Send the booking payload to the server
      const response = await fetch(`${baseUrl}/api/userAuth/BookingDetail/${bookingid}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': `${authToken}`
          },
      });

      if (!response.ok) {
          throw new Error('Failed to get booking');
      }

      const data = await response.json();

      return data;
  } catch (error) {
      console.error('Error geting booking:', error);
      throw error;
  }
}