import { Box, Button, TextField, Typography, styled } from "@mui/material";
import Logo from "../../../public/hashnode.png";
import { useState, FC, ChangeEvent } from "react";
import { API } from "../../service/api";

const signupInitValues = {
  name: "",
  username: "",
  password: "",
};
const Login: FC = () => {
  const [account, setAccount] = useState<"login" | "signup">("login");
  const [signup, setSignup] = useState(signupInitValues);

  const toggleSignup = () => {
    setAccount((prevAccount) =>
      prevAccount === "signup" ? "login" : "signup"
    );
  };

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setSignup({ ...signupInitValues, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    const res = await API.userSignup(signup);
    console.log("res", res);
  };

  return (
    <Component>
      <Box>
        <Image src={Logo} alt="Logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField id="email" label="Enter Email" variant="standard" />
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
              name="name"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              name="email"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              name="passowrd"
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

export default Login;
