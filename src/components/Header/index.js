import React from 'react';
import { Nav, HeaderContainer, HeaderLogo, HeaderImg, SideNavButton } from './HeaderElements';
import MenuIcon from '@mui/icons-material/Menu';


// header component
const Header = ({showSideNav}) => {

  const logo = 'http://rev.u22s2101.monash-ie.me/img/uniting-logo-white.png';
  const homeLink = '/';

  return (
    <>
      <Nav>
        <HeaderContainer>
          <SideNavButton size='small' variant='text' onClick={showSideNav} disableRipple>
            <MenuIcon style={{color: 'white', fontSize: '35px'}}></MenuIcon>
          </SideNavButton>

          <HeaderLogo to={homeLink}>
            <HeaderImg src={logo}></HeaderImg>
          </HeaderLogo>

        </HeaderContainer>
      </Nav>
    </>
  )
}

export default Header;