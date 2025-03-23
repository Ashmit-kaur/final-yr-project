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
        },
        logout:(state)=>{
            state.user=null
            state.token=null
            localStorage.removeItem('access-token')
        }
    }
});

export const {login,logout}=authSlice.actions;
export const selectUser=(state)=>state.user.user;
export default authSlice.reducer;