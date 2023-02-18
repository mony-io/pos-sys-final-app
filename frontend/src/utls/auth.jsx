
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
  username: '',
  getUser: () => { },
  getId: () => { },
  id: '',
  isLoading: '',
  Loading: () => { }
});

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthProvider = ({ children }) => {

  // ====== ======== ====== ========
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [user, setUser] = useState("");
  const [token, setToken] = useState(initialToken);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/token", {
        withCredentials: true,
      });
      setToken(response.data.access_token);
      const decoded = jwt_decode(response.data.access_token);

      setId(decoded.userid)
      getUser(decoded.username)
    } catch (error) {
      if (error.response) {
        logoutHandler()
      }
    }
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const getUser = (username) => {
    setUser(username);
  }

  const getId = (id) => {
    setId(id);
  }

  const Loading = (result) => {
    setIsLoading(result);
  }

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
    refreshToken();
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    username: user,
    getUser: getUser,
    Loading: Loading,
    isLoading: isLoading,
    getId: getId,
    id: id
  };
  // = = = == 
  localStorage.setItem("token", "true");


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
