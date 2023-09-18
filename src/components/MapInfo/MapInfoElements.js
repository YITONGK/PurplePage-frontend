import styled, {keyframes} from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import Modal from 'react-modal';
import ClearIcon from '@mui/icons-material/Clear';

export const InfoContainer = styled.div`
  ${'' /* margin-left: 1rem; */}
  border: 1px solid #CCC;
  padding-left: 1.2rem;
  padding-bottom: 1rem;
  border-radius: 5px;
  min-width: 22rem;
  max-width: 22rem;
  height: 63vh;
  overflow: hidden;
`;

export const InfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 2px solid #CCC;
    max-height: 100%;
    overflow: auto;
`;


export const InfoH1 = styled.h1`
  font-size: 32px;
  margin-left: 0.5rem;
`;

export const InfoH2 = styled.h2`
    font-size: 24px;
    color: #41424C;
    margin: 1rem 0 1rem 0;
    pading: 0;
`;

export const InfoP = styled.p`
    color: #5C5C66;
    font-size: 18px;
    margin: 0 0 0.5rem 0;
    padding: 0;
`;

export const InfoP2 = styled.p`
    color: #5C5C66;
    font-size: 16px;
    margin: 0;
    pardding: 0;
    vertical-align: middle;
`;

export const ProgramInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0rem;
  background-color: white;
  justify-content: center; 
`;

export const ProgramInfoItem = styled.div`
    display: flex;
    flex-direction: row;

`;

export const SiteTitle = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
`;

export const SiteInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

export const ListItemButton = styled.div`
    display: flex;
    flex-direction: space-between;
    align-items: center;
    margin: 0 0 0.3rem 0;
    padding: 0.3rem 0 0 0.3rem;
    min-width: 320px;
    max-width: 320px;
    border-radius: 10px;
    background-color: #f2f2f2; /* Light background color */
    transition: all 0.2s ease-in-out; /* Smooth transition on hover */
    cursor: pointer;
    
    &:hover {
        box-shadow: 8px 5px 8px #5C5C66; /* Add the box-shadow */
        background-color: #A20066;
        color: white;
    }
`;

export const CollapseInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    margin: -0.1rem 0 0rem 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

export const ProgramDetailsContainer = styled.div`
    box-shadow: 6px 10px 10px #5C5C66; /* Add the box-shadow */
    margin: 0rem 0 1rem 0;
    border-radius: 10px;
`;

export const CustomPersonIcon = styled(PersonIcon)`
  color: #A20066; /* Example: Change the icon color */
  vertical-align: middle;
`;

// Customize CallIcon
export const CustomCallIcon = styled(CallIcon)`
  color: #FF9900; /* Example: Change the icon color */
  vertical-align: middle;
`;

export const InfoAndPopupContainer = styled.div`
    display: flex;
`;

// Define the animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(0%, 0%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 30%);
  }
`;

// Create a styled component for the modal content with the animation
export const AnimatedModalContent = styled(Modal)`
  &.ReactModal__Content {
    animation: ${fadeIn} 0.3s ease-in-out;
    transform: translate(0%, 30%);
    background-color: white;
    display: flex;
    background-color: white;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
`;

export const ProgramCardHaader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid grey;
  background-color: #A20066;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const ProgramCardHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${'' /* border: 1px solid yellow; */}
  width: 50%;
`;

export const ProgramCardHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  ${'' /* border: 1px solid red; */}
`;

export const CustomClearIcon = styled(ClearIcon)`
  color: white;

  &:hover {
    color: black; /* Your hover effect color */
  }
`;

export const ProgramInfoDetail = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 0.5rem;
  align-items: center;
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
  box-shadow: 5px 0px 8px rgba(0, 0, 0, 0.4);
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

export const ProgramInfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${'' /* border: 1px solid grey; */}
  padding: 1rem;
  min-height: 53vh;
  overflow-y: auto;
  gap: 0.7rem;
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

export const SiteButtonContainer= styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

