import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const ProgramTypeViewContainer = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  padding-left: 2rem;
  margin-bottom: 2%;
`;

export const ProgramTypeViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
`;

export const ProgramTypeViewH2 = styled.h1`
  font-size: 28px;
  color: #A60A6C;
`;

export const ProgramTypeViewP = styled.p`
  font-size: 18px;
`;

export const ActionsButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;