import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      async function updateReduxUser() {
        const token = localStorage.getItem("access-token");
        if (!token) {
          // navigate("/signin");
          return;
        }
        try {
          const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
          dispatch(login({ user: res?.data.user, token }));
        } catch (error) {
          console.log(error.message);
          console.log(
            error.response?.data?.message ||
              "Something went wrong. Please try again."
          );
          // navigate("/signin");
          return;
        }
      }
      updateReduxUser();
    }, [navigate,dispatch]);
  
    return children;
  };

  export default ProtectedRoute;