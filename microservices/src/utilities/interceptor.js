import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const isTokenValid = (token) => {
  try {
    return token && Date.now() < jwtDecode(token).exp * 1000;
  } catch {
    return false;
  }
};

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
