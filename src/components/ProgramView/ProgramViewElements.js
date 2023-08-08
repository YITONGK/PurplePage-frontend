import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const ProgramViewContainer = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  padding-left: 2rem;
`;

export const ProgramViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
`;

export const ProgramViewP = styled.p`
  font-size: 18px;
  display: flex;
  align-items: start;
`;

export const ProgramViewGreenP = styled.p`
  color: green;
  font-size: 18px;
  text-transform: uppercase;
  margin-left: 5px;
  margin-top: 1px;
  margin-bottom: 0;
`;

export const ActionsButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;