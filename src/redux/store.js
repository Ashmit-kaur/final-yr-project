import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/authSlice"

export default configureStore({
    reducer:{
        user:userReducer
    }
})