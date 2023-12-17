import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: {},
  setUser: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  getUser: () => {},
});

export const Provider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const loginHandler = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + `api/v1/auth/refetch`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Data fetching failed!");
      }
      const data = await response.json();
      if (data.userId) {
        loginHandler(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUser,
        user: user,
        setUser: setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
