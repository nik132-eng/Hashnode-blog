import { Box } from "@mui/material";
import "./App.css";
import Login from "./components/account/Login";
import { createContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/home/Home";

interface AccountType {
  name: string;
  username: string;
}

interface DataContextType {
  account: AccountType;
  setAccount: (account: AccountType) => void;
}

export const DataContext = createContext<DataContextType | null>(null);

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
              <Route
                path="/account"
                element={<Login isUserAuthenticated={isUserAuthenticated} />}
              />

              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </DataContext.Provider>
    </>
  );
}

export default App;
