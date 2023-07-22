import React, { useState, useEffect } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Nav, HeaderContainer, HeaderLogo, HeaderImg, HeaderLogin } from './HeaderElements';
import axios from 'axios';
import Swal from 'sweetalert2';

// header component
const Header = () => {
  // useState hooks
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [user, setUser] = useState({});

  const logo = 'http://rev.u22s2101.monash-ie.me/img/uniting-logo-white.png';
  const homeLink = '/';

  const handleClose = () => {
    setAnchor(null);
    setOpen(false);
  }

  const handleClick = (e) => {
    setAnchor(e.target.value);
    setOpen(true);
  }

  const login = () => {
    window.location = '/login';
  }

  const logout = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8888/logout?_method=DELETE', {}, { withCredentials: true }).then(() => {
      handleClose();
      Swal.fire({
        title: "Are you sure you want to logout?",
        showCancelButton: true,
        confirmButtonText: 'Confirm',
        icon: "warning",
        showClass: {
          icon: ''
        }
      }).then((result) => {
        if (result.value) {
          sessionStorage.setItem("isAuthenticated", "false");
          window.location = '/login';
        }
      });
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const BASE_URL = "http://localhost:8888/";
    await axios.get(BASE_URL + sessionStorage.email).then(res => {
      const data = res.data;
      setUser(data);
    })
  }

  // styles
  const menuStyle = { marginTop: '4rem', width: '100%' };

  // navigate to profile
  const profile = () => {
    window.location = '/profile';
  }

  // navigate to users
  const users = () => {
    window.location = '/users';
  }


  const LoginButton = () => {
    if (sessionStorage.getItem("isAuthenticated") !== "true") {
      return (
        <HeaderLogin onClick={login}>
          Login&nbsp;<AccountCircle fontSize='large' />
        </HeaderLogin>
      )
    } else {
      return (
        <>
          <HeaderLogin onClick={handleClick}>
            Hi, { user.name }&nbsp;<AccountCircle fontSize='large' />
          </HeaderLogin>
          <Menu
            open={open}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            style={menuStyle}
          >
            <MenuItem onClick={profile}>Profile</MenuItem>
            <MenuItem onClick={users}>Users</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </>
      )
    }
  }

  if (['/login', '/register'].includes(window.location.pathname)) {
    return null;
  }
  return (
    <>
      <Nav>
        <HeaderContainer>
          <HeaderLogo to={homeLink}>
            <HeaderImg src={logo}></HeaderImg>
          </HeaderLogo>
          <LoginButton />
        </HeaderContainer>
      </Nav>
    </>
  )
}

export default Header;