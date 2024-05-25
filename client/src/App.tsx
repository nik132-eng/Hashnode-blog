import { Box } from "@mui/material";
import "./App.css";
import Login from "./components/account/Login";
import { createContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";

interface AccountType {
  name: string;
  username: string;
}

interface DataContextType {
  account: AccountType;
  setAccount: (account: AccountType) => void;
}

export const DataContext = createContext<DataContextType | null>(null);

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated, ...props }: PrivateRouteProps) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {
  const [account, setAccount] = useState<AccountType>({
    name: "",
    username: "",
  });
  const [isAuthenticated, isUserAuthenticated] = useState<boolean>(false);

  return (
    <>
      <DataContext.Provider
        value={{
          account,
          setAccount,
        }}
      >
        <BrowserRouter>
          <Box style={{ marginTop: 64 }}>
            <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}

export default App;
