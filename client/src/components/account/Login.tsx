import { Box, Button, TextField, Typography, styled } from "@mui/material";
import Logo from "../../../public/hashnode.png";
import { useState, FC, ChangeEvent, useEffect } from "react";
import { API } from "../../service/api";

const signupInitValues = {
  name: "",
  username: "",
  password: "",
};
const Login: FC = () => {
  const [account, toggleAccount] = useState<"login" | "signup">("login");
  const [signup, setSignup] = useState(signupInitValues);

  const [error, showError] = useState('');



  const toggleSignup = () => {
    toggleAccount((prevAccount) =>
      prevAccount === "signup" ? "login" : "signup"
    );
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSignup((prevSignup) => ({
      ...prevSignup,
      [e.target.name]: e.target.value
    }));
  };

  const signupUser = async () => {
    console.log("Signup value",signup )
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
        showError('');
        setSignup(signupInitValues);
        toggleAccount('login');
    } else {
        showError('Something went wrong! please try again later');
    }
}

  return (
    <Component>
      <Box>
        <Image src={Logo} alt="Logo" />
        {error && <Error>{error}</Error>}
        {account === "login" ? (
          <Wrapper>
            <TextField id="email" label="Enter Email" variant="standard" name="username"/>
            <TextField
              id="password"
              label="Enter Password"
              variant="standard"
              type="password"
              name="password"
            />
            <Button variant="contained">Login</Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Button variant="text" onClick={toggleSignup}>
              create an account
            </Button>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              name="name"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              name="username"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              name="password"
              onChange={(e) => onInputChange(e)}
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
    width: 100%
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
`
export default Login;
