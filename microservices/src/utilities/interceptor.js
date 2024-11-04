import axios from "axios";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

//THIS WOULD VALIDATE THE JWT'S EXPIRY
const isTokenValid = (token) => {
  try {
    return token && Date.now() < jwtDecode(token).exp * 1000;
  } catch {
    return false;
  }
};

//THIS WOULD INTERCEPT THE REQUESTS AND CHECKS FOR THE JWT'S LIFE SPAN
//AND IF IT IS EXPIRED THEN IT WOULD LOG-OUT THE CURRENT USER AND
//REQUEST THE USER TO LOG-IN AGAIN
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      if (!isTokenValid(token)) {
        localStorage.removeItem("jwtToken");
        toast.error("YOUR SESSION HAS EXPIRED PLEASE LOGIN AGAIN!!");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
        return Promise.reject();
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("FIRST LOGIN SUCCESS!!");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
