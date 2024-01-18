import React from 'react';
import {useNavigate} from 'react-router-dom';
import SideNav, {NavItem, NavIcon, NavText, Nav} from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {SideNavButton, ButtonContainer, HeaderImg, SiteNavContainer, SiteNavBackgroundFill} from './MySidebarElements';
import MenuIcon from '@mui/icons-material/Menu';

const MySidebar = ({showSideNav}) => {

    // change selected tab
    const onSelect = (selected) => {
        navigate('/' + selected);
        showSideNav();
    }

    // navigate
    const navigate = useNavigate();

    // styles
    const sideNavStyle = {
        zIndex: 10000,
        backgroundColor: '#A20066',
        fontFamily: "Helvetica",
        position: 'relative',
        opacity: 1
    }

    if (['/login', '/register'].includes(window.location.pathname)) {
        return null;
    }
    return (
        <SiteNavContainer>
            <SideNav
                onSelect={onSelect}
                style={sideNavStyle}
                defaultExpanded={true}
            >
                <ButtonContainer>
                    <SideNavButton size='small' variant='text' onClick={showSideNav} disableRipple>
                        <MenuIcon style={{color: 'white', fontSize: '35px'}}></MenuIcon>
                    </SideNavButton>
                    <HeaderImg
                        src={require('../../images/uniting-icon.png')}
                        style={{filter: 'brightness(0) invert(1)'}}
                        alt="Logo"></HeaderImg>
                </ButtonContainer>

                <Nav defaultSelected="home">
                    <NavItem eventKey="">
                        <NavIcon>
                            <i className="fa-solid fa-search" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Search</NavText>
                    </NavItem>

                    <NavItem eventKey="program">
                        <NavIcon>
                            <i className="fa-solid fa-list" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Program</NavText>

                    </NavItem>

                    <NavItem eventKey="programtype">
                        <NavIcon>
                            <i className="fa-solid fa-list-check" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Program Type</NavText>
                    </NavItem>

                    <NavItem eventKey="servicetype">
                        <NavIcon>
                            <i className="fa-solid fa-hand" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Service Type</NavText>
                    </NavItem>

                    <NavItem eventKey="servicestream">
                        <NavIcon>
                            <i className="fa-regular fa-hand" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Service Stream</NavText>
                    </NavItem>
                    <NavItem eventKey="group">
                        <NavIcon>
                            <i className="fa-solid fa-user-group" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Group</NavText>
                    </NavItem>
                    <NavItem eventKey="division">
                        <NavIcon>
                            <i className="fa-solid fa-shield" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Division</NavText>
                    </NavItem>
                    <NavItem eventKey="site">
                        <NavIcon>
                            <i className="fa-solid fa-globe" style={{fontSize: "1.5em"}}></i>
                        </NavIcon>
                        <NavText>Site</NavText>
                    </NavItem>
                </Nav>
            </SideNav>
            <SiteNavBackgroundFill onClick={showSideNav}/>
        </SiteNavContainer>

    )
}

export default MySidebar