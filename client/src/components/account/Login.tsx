import { Box, Button, TextField, Typography, styled } from "@mui/material";
import Logo from "../../../public/hashnode.png";
import {
  useState,
  ChangeEvent,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { API } from "../../service/api";
import { DataContext } from "../../App.tsx";
import { useNavigate } from "react-router-dom";

const signupInitValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

export interface LoginUserProps {
  isUserAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<LoginUserProps> = ({ setIsAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);

  const [taccount, toggleAccount] = useState<"login" | "signup">("login");
  const [signup, setSignup] = useState(signupInitValues);

  const [error, showError] = useState("");
  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext)!;

  const toggleSignup = () => {
    toggleAccount((prevAccount) =>
      prevAccount === "signup" ? "login" : "signup"
    );
  };

  const onValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSignup((prevSignup) => ({
      ...prevSignup,
      [e.target.name]: e.target.value,
    }));
  };

  const signupUser = async () => {
    console.log("Signup value", signup);
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      const newAccount = {
        name: response.data.name || "",
        username: response.data.username || "",
      };
      setAccount(newAccount);
      localStorage.setItem("account", JSON.stringify(newAccount));
      setIsAuthenticated(true);

      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={Logo} alt="Logo" />
        {error && <Error>{error}</Error>}
        {taccount === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Email"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            <Button variant="contained" onClick={loginUser}>
              Login
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Button variant="text" onClick={toggleSignup}>
              create an account
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              value={signup.name}
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Username"
            />
            <TextField
              variant="standard"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Email"
            />
            <TextField
              variant="standard"
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Password"
              type="password"
            />
            <Button variant="contained" onClick={signupUser}>
              Signup
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Button variant="text" onClick={toggleSignup}>
              Existing Account
            </Button>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  border-radius: 14px;
  box-shadow: -1px 10px 24px -3px rgba(0, 0, 0, 0.58);
`;

const Image = styled("img")({
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div,
  & > button,
  & > p {
    margin-top: 20px;
    width: 100%;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 10px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Login;
