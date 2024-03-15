import { baseUrl } from "./supabase";

export async function searchBeauticians(searchQuery) {
    console.log("Search function called");
    try {
        const url = new URL(`${baseUrl}/api/userAuth/searchBeauticians`);
        url.searchParams.append('search', searchQuery);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

      

        if (!response.ok) {
            throw new Error('Failed to search');
        }

        const data = await response.json();
        return data;
      
    } catch (error) {
        console.error('Error in search:', error);
        throw error;
    }
}
export async function searchCategorey(searchQuery) {
    console.log("Search Categorey called");
    try {
        const url = new URL(`${baseUrl}/api/userAuth/searchservice`);
        url.searchParams.append('search', searchQuery);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

      

        if (!response.ok) {
            throw new Error('Failed to search');
        }

        const data = await response.json();
        console.log(data);
        return data;
       
    } catch (error) {
        console.error('Error in search:', error);
        throw error;
    }
}
