import { LOGOUT, LOGIN, ACCESS_TOKEN } from "./actionTypes";
import axios from "axios";
import { BASE_URL } from "../../components/api/axio";
import Cookies from "js-cookie";




export const userLogin = (userData, navigate) => async (dispatch) => {
  
  try {
      const response = await axios.post(`${BASE_URL}/api/auth/jwt/create/`, userData);
      const responseData = response.data;

      // If login is successful
      if (responseData) {
          const accessToken = responseData.user.access;
          const refreshToken = responseData.user.refresh;
          const user = responseData.user;
          localStorage.setItem("refreshToken", refreshToken);

          // Store access token in cookie
          Cookies.set("accessToken", accessToken);

          // Dispatch actions to update Redux state
          dispatch({ type: ACCESS_TOKEN, payload: accessToken });
          dispatch({ type: LOGIN, payload: responseData });
          

          
            navigate('/profile');
          
          
      }
  } catch (error) {
      console.error("Login error:", error);
      // Handle login failure here
      // For example, dispatch an action to show an error message
  }
};

export const logOut = () => async (dispatch) => {
  // Clear tokens and rememberMe from local storage
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("rememberMe");

  // Remove access token from cookie
  Cookies.remove("accessToken");
  // Dispatch logout action
  dispatch({ type: LOGOUT });
};
