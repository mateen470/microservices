import React, { createContext, useReducer } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

const initialState = {
  user: null,
  isAdmin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ADMIN":
      return { ...state, isAdmin: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    dispatch({
      type: "SET_USER",
      payload: { name: decoded.name, email: decoded.email },
    });

    const adminEmail = process.env.REACT_APP_ADMIN_ID;
    if (decoded.email === adminEmail) {
      dispatch({ type: "SET_ADMIN", payload: true });
    }

    localStorage.setItem("jwtToken", jwtToken);
  };

  const logoutUser = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAdmin: state.isAdmin,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
