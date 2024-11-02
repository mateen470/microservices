import React, { createContext, useReducer } from "react";

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

  return (
    <UserContext.Provider
      value={{ user: state.user, isAdmin: state.isAdmin, dispatch }}
    >
      {children}
    </UserContext.Provider>
  );
};
