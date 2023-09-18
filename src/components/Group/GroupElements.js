import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const GroupContainer = styled.div`
  margin-top: 2%;
  margin-bottom: 5%;
  padding-left: 3%;
`;

export const GroupH1 = styled.h1`
  font-size: 40px;
  margin-bottom: 2%;
  color: #A60A6C;

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

export const GroupButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;