import styled, { keyframes }from 'styled-components';
import Modal from 'react-modal';
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
    transform: translate(0%, 10%);
  }
`;

const fadeIn2 = keyframes`
  from {
    opacity: 0;
    transform: translate(-10%, 0%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 20%);
  }
`;

// Create a styled component for the modal content with the animation
export const AnimatedModalContent = styled(Modal)`
  
  
  &.ReactModal__Content {
    animation: ${fadeIn} 0.3s ease-in-out;
    transform: translate(0%, 10%);
    background-color: white;
    display: flex;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export const AnimatedModalContent2 = styled(Modal)`
  
  &.ReactModal__Content {
    animation: ${fadeIn2} 0.3s ease-in-out;
    transform: translate(0%, 20%);
    background-color: white;
    display: flex;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export const ModalContentBodyContainerRow = styled.div `
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  gap: 1rem;
`;

export const ModalContentBodyContainerColumn = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalContentInfoH2 = styled.h2`
  font-size: 24px; // origin 24
  color: #41424C;
  margin: 1rem 0 1rem 0;
  padding: 0;
`;

export const ModalContentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ModalContentInfoP = styled.p`
  color: #494949;
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

export const ModalContentInfoP2 = styled.p`
  color: #262626;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const ModalContentInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const ModalContentListItemButton = styled.div`
  display: none;

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 0 0;
    padding: 0.3rem 0 0 0.3rem;
    min-width: 32vw;
    max-width: 32vw;
    border-radius: 10px;
    background-color: #f2f2f2;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const CustomClearIcon = styled(ClearIcon)`
  color: white;

  &:hover {
    color: black; /* Your hover effect color */
  }
`;

export const ModalInfoOfferedProgramsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0;
  background-color: rgb(227,227,227);
  justify-content: center;
  gap: 0.3rem;
`;



