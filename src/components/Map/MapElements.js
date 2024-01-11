import styled, { keyframes }from 'styled-components';
import Modal from 'react-modal';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import ClearIcon from "@mui/icons-material/Clear";

export const MapContainer = styled.div`
  display: block;

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    display: none;
  }
`;

export const EMMapContainer = styled.div`
  display: none;

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    display: block;
  }
  
`;


export const MapP = styled.p`
  font-size: 24px;
  margin-top: 2rem;
  color: #90929f;
`;

export const InfoWindowContainer = styled.div`
  padding-left: 0.5rem;
`;

export const InfoWindowContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    margin-bottom: 5px;
    width: 85%;
`;

export const InfoWindowH1 = styled.h1`
  color: #A20066;
  padding-bottom: 0;
  margin-bottom: 15px;
`;

export const InfoWindowP = styled.p`
  font-size: 14px;
  margin:0;
  padding:0;
`;

const moveUpAndBack = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* Move up by 20px */
  }
`;

export const MarkerAnimation = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  animation: ${moveUpAndBack} 1s ease infinite;
`;

export const BasicMarker = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const InterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;


export const MapPopupContainer = styled.div`
  display: none;

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    display: flex;
  }
    
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
`;

export const ModalContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid grey;
  background-color: #A20066;
`;

export const ModalContentHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${'' /* border: 1px solid yellow; */}
  width: 50%;
`;

export const ModalContentHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  ${'' /* border: 1px solid red; */}

`;

// Define the animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-10%, 0%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 15%);
  }
`;

// Create a styled component for the modal content with the animation
export const AnimatedModalContent = styled(Modal)`
  &.ReactModal__Content {
    animation: ${fadeIn} 0.3s ease-in-out;
    transform: translate(0%, 15%);
    background-color: white;
    display: flex;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;




