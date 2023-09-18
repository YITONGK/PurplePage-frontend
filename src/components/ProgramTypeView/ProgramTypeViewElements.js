import styled, {keyframes} from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const ProgramTypeViewContainer = styled.div`
  margin-top: 2%;
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
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

export const PContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const ProgramTypeViewP2 = styled.p`
  font-size: 18px;
  color: 'green';
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
  padding: 0 0 0.5rem 0;
`;

export const ActionsButtonLink = styled(LinkRouter)`
  text-decoration: none;
  color: #fff;
`;

// Keyframe animation for rotating the loading circle
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled component for the loading circle container
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 60vh;
  border-radius: 10px;
  box-shadow: inset 0px 0px 100px rgba(0, 0, 0, 0.2);
`;

// Styled component for the loading circle itself
export const LoadingCircle = styled.div`
  width: 100px;
  height: 100px ;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #A60A6C;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Styled component for the "loading" text
export const LoadingText = styled.div`
  position: absolute;
  font-size: 16px;
  text-align: center;
`;

export const ProgramsContainer = styled.div`
  display: flex;
  width: 98%;
  height: 60vh;
`;