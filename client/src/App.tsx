import { Box } from "@mui/material";
import "./App.css";
import Login from "./components/account/Login";
import { createContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";

export interface AccountType {
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
  return isAuthenticated ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/account' />
  );
};

function App() {
  const [account, setAccount] = useState<AccountType>({
    name: "",
    username: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("accessToken") !== null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

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
              <Route
                path='/account'
                element={
                  <Login
                    isUserAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                }
              />
              <Route
                path='/'
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path='/' element={<Home />} />
              </Route>

              <Route
                path='/create'
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path='/create' element={<CreatePost />} />
              </Route>

              <Route
                path='/details/:id'
                element={<PrivateRoute isAuthenticated={isAuthenticated} />}
              >
                <Route path='/details/:id' element={<DetailView />} />
              </Route>
            </Routes>
          </Box>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}

export default App;
