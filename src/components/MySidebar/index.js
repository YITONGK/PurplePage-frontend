import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText, Nav } from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const MySidebar = () => {
  // change selected tab
  const onSelect = (selected) => {
    navigate('/' + selected)
  }

  // navigate
  const navigate = useNavigate();

  // styles
  const sideNavStyle = { zIndex: 10000, backgroundColor: "#A20066", fontFamily: "Helvetica", position: 'fixed' }

  if (['/login', '/register'].includes(window.location.pathname)) {
    return null;
  }
  return (
    <SideNav
      onSelect={onSelect}
      style={sideNavStyle}
    >
      <Toggle />
      <Nav defaultSelected="home">
        <NavItem eventKey="">
          <NavIcon>
            <i className="fa-solid fa-house" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavIcon>
            <i className="fa-solid fa-list" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Program</NavText>
          <NavItem eventKey="program">
            <NavText>Program</NavText>
          </NavItem>
          <NavItem eventKey="programtype">
            <NavText>Program Type</NavText>
          </NavItem>
        </NavItem>
        <NavItem>
          <NavIcon>
            <i className="fa-solid fa-hand" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Service</NavText>
          <NavItem eventKey="servicetype">
            <NavText>Service Type</NavText>
          </NavItem>
          <NavItem eventKey="servicestream">
            <NavText>Service Stream</NavText>
          </NavItem>
        </NavItem>
        <NavItem eventKey="group">
          <NavIcon>
            <i className="fa-solid fa-user-group" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Group</NavText>
        </NavItem>
        <NavItem eventKey="division">
          <NavIcon>
            <i className="fa-solid fa-shield" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Division</NavText>
        </NavItem>
        <NavItem eventKey="site">
          <NavIcon>
            <i className="fa-solid fa-globe" style={{ fontSize: "1.5em" }}></i>
          </NavIcon>
          <NavText>Site</NavText>
        </NavItem>
      </Nav>
    </SideNav>
  )
}

export default MySidebar