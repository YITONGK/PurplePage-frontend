import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const ProgramTypeContainer = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  margin-bottom: 5%;
  padding-left: 3%;
`;

export const ProgramTypeH1 = styled.h1`
  font-size: 40px;
  color: #A60A6C;
  margin-bottom: 2%;
`;

export const ButtonWrapper = styled.div`
  text-align: right;
  margin-right: 5%;
`;

export const DataGridWrapper = styled.div`
  margin-top: 1%;
  margin-right: 5%;
  margin-bottom: 2%;
`;

export const ActionsColumnWrapper = styled.div`

`;


export const ActionsButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;

export const ProgramTypeButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;