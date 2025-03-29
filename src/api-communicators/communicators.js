import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth",
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