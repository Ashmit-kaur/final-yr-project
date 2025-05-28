import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth`,
    withCredentials: true, 
  });

export async function authLogin(credentials){
    const result=await API.post("/signin",credentials)
    return result.data;
}

export async function authSignUp(credentials){
    console.log(credentials)
    const result = await API.post("/signup",credentials);
    return result.data;
}

export async function checkisAuthenticated(){
    const result=await API.get("/isAuth")
    return result.data;
}

export async function authLogout(){
    const result=await API.post("/logout")
    return result.data
}

export async function createspace(formData){
    try{
        console.log(formData)
        const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/space/addspace`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            }
          );
        return result.data;
    }catch(error){
        console.log(error.response?.data?.message)
        alert("create space failed")
    }
}