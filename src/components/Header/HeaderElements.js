import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const Nav = styled.nav`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: start;
  background-color: #A20066;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  width: 100%;
  padding: 0 24px;
  position: sticky;
  top: 0;
`;

export const HeaderLogo = styled(LinkRouter)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  margin-left: 5%;
  font-weight: bold;
  text-decoration: none;
`;

export const HeaderImg = styled.img`
  width: 150px;
  height: auto;
`;

export const HeaderLogin = styled(LinkRouter)`
  color: #fff;
  justify-self: flex-end;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-right: 2%;
  font-weight: bold;
  text-decoration: none;
`;
