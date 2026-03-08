import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;




export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl  + url, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
                'Content-Type': 'application/json', // Adjust the content type as needed
            },
            body: JSON.stringify(formData),
        });
        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }   
};

export const fetchDataFromApi = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
                'Content-Type': 'application/json', // Adjust the content type as needed
            }
        };
    
        const {data} = await axios.get(apiUrl + url, params);
        return data;
    }catch (error) {
        console.error("Error fetching data:", error);
        return error;
    }

};


export const uploadImage = async (url, updatedData) => {
    const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
                'Content-Type': 'multipart/form-data', // Adjust the content type as needed
            }
        };
        var response;
        await axios.put(apiUrl + url, updatedData, params).then((res)=>{  
            response =  res;
        })
        return response;
    
}


export const uploadImages = async (url, formData) => {
    const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
                'Content-Type': 'multipart/form-data', // Adjust the content type as needed
            }
        };
        var response;
        await axios.post(apiUrl + url, formData, params).then((res)=>{  
            response =  res;
        })
        return response;
}


export const editData = async (url, updatedData) => {
    const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
                'Content-Type': 'application/json', // Adjust the content type as needed
            }
        };
        var response;
        await axios.put(apiUrl + url, updatedData, params).then((res)=>{  
            response =  res;
        })
        return response;
    
}


// export const deleteImages = async (url, image) => {
//     const params = {
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Include your API key in the authorizatin header
//                 'Content-Type': 'application/json', // Adjust the content type as needed
//             }
//         };
//         const {  res } = await axios.delete(apiUrl + url,image,params)
//         return res;
    
// }

export const deleteImages = async (url) => {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};


export const deleteData = async (url) => {
  try {
    const response = await axios.delete(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};



