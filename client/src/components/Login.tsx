import { Box, Button, TextField, Typography, styled } from "@mui/material";
import Logo from "../../public/hashnode.png";
import { useState, FC } from "react";

const Login: FC = () => {
  const [account, setAccount] = useState<"login" | "signup">("login");

  const toggleSignup = () => {
    setAccount(prevAccount => (prevAccount === "signup" ? "login" : "signup"));
  };

  return (
    <Component>
      <Box>
        <Image src={Logo} alt="Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              id="email"
              label="Enter Email"
              variant="standard"
            />
            <TextField
              id="password"
              label="Enter Password"
              variant="standard"
              type="password"
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
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
            />
            <Button variant="contained">Signup</Button>
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
  }
`;

export default Login;