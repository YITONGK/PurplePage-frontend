import styled, {keyframes} from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import Modal from 'react-modal';
import ClearIcon from '@mui/icons-material/Clear';

// export const InfoContainer = styled.div`
//   ${'' /* margin-left: 1rem; */}
//   border: 1px solid #CCC;
//   padding-left: 1.2rem;
//   padding-bottom: 1rem;
//   border-radius: 5px;
//   min-width: 22rem;
//   max-width: 22rem;
//   height: 63vh;
//   overflow: hidden;
// `;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #CCC;
  padding-left: 0.5rem;
  //padding-bottom: 1rem;
  border-radius: 5px;
  min-width: 18vw;
  max-width: 18vw;
  min-height: 63vh;
  max-height: 63vh;
  //overflow: hidden;
`;


export const InfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    //border-top: 2px solid #CCC;
    border: 2px solid red;
    max-height: 100%;
    overflow: auto;
`;


export const InfoH1 = styled.h1`
  font-size: 32px;
  margin-left: 0.5rem;
`;

export const InfoH2 = styled.h2`
    font-size: 24px; // origin 24
    color: #41424C;
    margin: 1rem 0 1rem 0;
    padding: 0;
`;

export const InfoP = styled.p`
    color: #5C5C66;
    font-size: 18px;
    margin: 0;
    padding: 0;

  @media (max-width: 768px) {
    font-size: 16px; // Smaller font size on medium screens
  }

  @media (max-width: 480px) {
    font-size: 14px; // Even smaller font size on small screens
  }
`;

export const InfoP2 = styled.p`
    color: #5C5C66;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

export const ProgramInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0;
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
    //margin-bottom: 3rem;
`;

export const SiteInfo = styled.div`
    display: flex;
    border: 2px solid green;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 10px;
    flex: 1;
`;

export const SiteInfoDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

// export const ListItemButton = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     margin: 0 0 0.3rem 0;
//     padding: 0.3rem 0 0 0.3rem;
//     min-width: 320px;
//     max-width: 320px;
//     border-radius: 10px;
//     background-color: #f2f2f2; /* Light background color */
//     transition: all 0.2s ease-in-out; /* Smooth transition on hover */
//     cursor: pointer;
//
//     &:hover {
//         box-shadow: 8px 5px 8px #5C5C66; /* Add the box-shadow */
//         background-color: #A20066;
//         color: white;
//     }
// `;

export const ListItemButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0.3rem 0;
  padding: 0.3rem 0 0 0.3rem;
  min-width: 320px;
  max-width: 320px;
  border-radius: 10px;
  background-color: #f2f2f2;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
 
  &:hover {
      box-shadow: 8px 5px 8px #5C5C66;
      background-color: #A20066;
      color: white;
  }

  @media (max-width: 600px) {
    min-width: 280px;
    max-width: 280px;
  }

  @media (max-width: 400px) {
    min-width: 250px;
    max-width: 250px;
  }
`;


export const CollapseInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    margin: -0.1rem 0 0 0;
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

// Define the animation keyframes
const fadeIn_2 = keyframes`
  from {
    opacity: 0;
    transform: translate(-10%, 0%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 10%);
  }
`;

// Create a styled component for the modal content with the animation
export const AnimatedModalContent2 = styled(Modal)`
  &.ReactModal__Content {
    animation: ${fadeIn_2} 0.3s ease-in-out;
    transform: translate(0%, 10%);
    background-color: white;
    display: flex;
    background-color: white;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
    index: 10000;
  }
`;

export const ProgramCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
`;

// export const ProgramCardHeader = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   padding: 0.5rem 0.5rem 0.5rem 1rem;
//   border-bottom: 1px solid grey;
//   background-color: #A20066;
//
//   @media (max-width: 600px) {
//     // Your small screen styles go here
//     width: 97%;
//   }
// `;

export const ProgramCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid grey;
  background-color: #A20066;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;


export const ProgramCardHeader2 = styled.div`
  position: sticky;
  top: 0;
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
  align-items: center;
  min-width: 49.5%;
  max-width: 49.5%;
  border-bottom: 2px solid grey;
  padding-bottom: 5px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border-top: 1px solid transparent;
  //border-left: 1px solid transparent;
  //border-bottom: 1px solid transparent;
  //border-right: 1px solid transparent;
  border-radius: 50px;
  padding: 0.8rem 0.8rem 0.8rem 0.8rem;
  color: black;
  //background-color: #333333;
  margin-right: 0.5rem;
  //box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.4);
`;

export const IconDescriptionContainer =  styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
`;

export const IconDescription = styled.div`
  display: flex;
  justify-content: start;
  align-items: end; /* Center vertically */
  width: 100%;
  padding: 0rem 0rem 0rem 0rem;
  //min-height: 40px;
`;

export const ProgramInfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem 1rem 1rem;
  background-color: white;
  gap: 0.7rem;
  //border: 1px solid red;
  flex: 1;
`;

export const ProgramViewP2 = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const ProgramViewCaption = styled.p`
  font-size: 16px;
  color: #333333;
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

export const SiteButtonContainer= styled.div`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid yellow;
  flex: 1;
`;

export const SiteViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
  padding: 0 0 0 0.8rem;
`;

export const SiteViewH2 = styled.h1`
  font-size: 20px;
  color: #444444;
  padding: 0 0 0 0.8rem;
  font-weight: bold;
`;

export const SiteViewP = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

export const SiteViewP2 = styled.p`
  font-size: 12px;
  color: #555555;
  margin: 0;
  padding: 0;
`;

export const SiteViewMapAndInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 80vh;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
`;

export const SiteViewInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40%;
  max-height: 80vh;
  overflow: auto;
`;

export const SiteViewMapContainer = styled.div`
  width: 60%;
  overflow: hidden;
`;

export const SiteViewInfoDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  padding: 0.5rem;
`;

export const SiteViewInfoDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SiteViewInfoDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 0.5rem;
  min-width: 10rem;

  @media screen and (min-height: 1080px) {
        /* Apply new styles for screens with a minimum width of 768px */
        min-width: 15rem; /* New height on larger screens */
  }
`;

export const SiteViewIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  border-radius: 50px;
  border: 1px solid black;
  padding: 0.3rem;
`;

export const SperateLine = styled.div`
  display: flex;
  width: 97%;
  border-bottom: 2px solid #7777;
  margin: 0.8rem 0.8rem 0.5rem 0.8rem;
`;

