import {createSlice} from "@reduxjs/toolkit"

export const authSlice=createSlice({
    name:"user",
    initialState:{
        token:null,
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
            localStorage.setItem('access-token',action.payload.token)
            console.log("Store login user",state.user)
            console.log("Store login token",state.token)
        },
        logout:(state)=>{
            state.user=null
            state.token=null
            localStorage.removeItem('access-token')
            console.log("Store logout user",state.user)
            console.log("Store logout token",state.token)
        }
    }
});

export const {login,logout}=authSlice.actions;
export const selectUser=(state)=>state.user.user;
export default authSlice.reducer;