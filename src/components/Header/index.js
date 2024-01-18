import React from 'react';
import {Nav, HeaderContainer, HeaderLogo, HeaderImg, SideNavButton} from './HeaderElements';
import MenuIcon from '@mui/icons-material/Menu';


// header component
const Header = ({showSideNav}) => {

    const homeLink = '/';

    return (
        <>
            <Nav>
                <HeaderContainer>
                    <SideNavButton size='small' variant='text' onClick={showSideNav} disableRipple>
                        <MenuIcon style={{color: 'white', fontSize: '35px'}}></MenuIcon>
                    </SideNavButton>

                    <HeaderLogo to={homeLink}>
                        <HeaderImg
                            src={require('../../images/uniting-icon.png')}
                            style={{filter: 'brightness(0) invert(1)'}}
                            alt="Logo"></HeaderImg>
                    </HeaderLogo>

                </HeaderContainer>
            </Nav>
        </>
    )
}

export default Header;