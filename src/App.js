import { useLocation } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import useToken from './auth/useToken';
import Page404 from './pages/Page404';
import Traveller from '../src/components/Traveller';
import Driver from '../src/components/Driver';
import Manager from '../src/components/Manager';
import { useEffect, useState } from 'react';


function App() {
  const location = useLocation();
  const { token, setToken } = useToken();
  const [decodedToken, setDecodedToken] = useState()
  useEffect(() => {
    setDecodedToken(decodeToken(token));
  }, [token])

  if (location.pathname === "/404") return <Page404 />

  if (location.pathname === "/signup") {
    return <SignUp />
  }
  if (location.pathname === "/signin") {
    return <SignIn setToken={setToken} />
  }

  // console.log("token", token)

  if (!token) {
    return <SignIn setToken={setToken} />;
  }

  if (isExpired(token)) {
    localStorage.removeItem('token');
    localStorage.removeItem('shouldLoad');
    return <SignIn setToken={setToken} />;
  }

  
  // console.log("decode", decodedToken)

//   if (decodedToken && decodedToken.role === "traveller" ) return <ScholarProvider><Scholar notMtech={true}/></ScholarProvider>
//   if (decodedToken && decodedToken.role === "manager" ) return <ScholarProvider><Scholar notMtech={false}/></ScholarProvider>
//   if (decodedToken && decodedToken.role === "driver") return <FacultyProvider><Faculty /></FacultyProvider>
    if (decodedToken && decodedToken.role === "traveller" ) return <Traveller/>
    if (decodedToken && decodedToken.role === "manager" ) return <Manager/>
    if (decodedToken && decodedToken.role === "driver" ) return <Driver/>
  return <Page404 />
}

export default App;
