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
`;

export const ActionsButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;