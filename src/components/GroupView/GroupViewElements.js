import styled, {keyframes} from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';

export const GroupViewContainer = styled.div`
  margin-top: 2%;
  margin-left: 5%;
  padding-left: 2rem;
  margin-bottom: 2%;
`;

export const GroupViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
`;

export const GroupViewH2 = styled.h1`
  font-size: 28px;
  color: #A60A6C;
`;

export const GroupViewP = styled.p`
  font-size: 18px;
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