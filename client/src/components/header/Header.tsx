import { AppBar, Toolbar, styled, Button } from '@mui/material';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {

}

const Component = styled(AppBar)`
  background: #FFFFFF;
  color: black;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const logout = async () => {
    navigate('/account', { replace: true });
  };

  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Button onClick={logout}>LOGOUT</Button>
      </Container>
    </Component>
  );
};

export default Header;