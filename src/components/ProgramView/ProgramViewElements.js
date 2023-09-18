import styled, { keyframes } from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import TableCell from '@mui/material/TableCell';

export const ProgramViewContainer = styled.div`
  margin-top: 2%;
  padding-left: 2rem;
  margin-bottom: 2rem;
`;

export const ProgramViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
  margin: 0 0 5% 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TitleContainer = styled.div`
  margin: 0 0 0 0;
  padding: 0;
`;

export const ProgramViewP = styled.p`
  font-size: 18px;
  display: flex;
  margin: 0;
  padding: 0;
`;

export const ProgramViewP2 = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const ProgramViewCaption = styled.p`
  font-size: 12px;
  color: white;
  font-weight: bold;
  margin: 0;
  padding: 0;
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

export const MapAndInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: 20px 15px 20px rgba(0, 0, 0, 0.2);
  background-color: transparent;
  border-radius: 5px;
  margin-right: 2rem;
  width: 95%;
  height: 50vh;
`;

export const ProgramViewInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-width: 43.6%;
  max-width: 43.6%;
  max-height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;

   /* Styling for the scrollbar */
  &::-webkit-scrollbar {
    width: 8px; /* Adjust the width as needed */
    background-color: purple;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0); /* Scrollbar thumb color */
    border-radius: 4px; /* Rounder corners */
  }

  &:hover {
      &::-webkit-scrollbar-thumb {
      background-color: rgba(209, 209, 209, 0.7); /* Scrollbar thumb color */
      border-radius: 4px; /* Rounder corners */
    }
  }
`;

export const InfoDetail = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  border-radius: 50px;
  min-width: 48%;
  max-width: 48%;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-right: 1px solid transparent;
  border-radius: 50px;
  padding: 0.8rem 0.8rem 0.8rem 0.8rem;
  color: white;
  background-color: #333333;
  margin-right: 0.2rem;
`;

export const IconDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  text-align: center; /* Center horizontally */
  width: 100%;
  padding: 0rem 0.8rem 0rem 0rem;
  min-height: 40px;
`;

export const ProgramViewMapContainer = styled.div`
  border-radius: 10px;
`;

export const InfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  padding-right: 3%;
`;

const rightSlide = keyframes`
  0%, 100% {
    transform: rotate(90deg) translateY(-10px);
  }
  50% {
    transform: rotate(90deg) translateY(30px);
  }
`;

export const AnimatedRoomIcon = styled(RoomIcon)`
  color: #A60A6C;
  animation: ${rightSlide} 2s ease infinite;
`;

export const AnimatedTableCell = styled(TableCell)`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

