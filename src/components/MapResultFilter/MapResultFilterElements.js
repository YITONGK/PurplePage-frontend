import styled, {keyframes} from 'styled-components';
import Modal from 'react-modal';

import Tooltip from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import ClearIcon from "@mui/icons-material/Clear";

export const MapFilterRowContainer = styled.div`
    margin-right: 1.2vw;
    height: 64.5vh;
    display: flex;
    width: 15.5vw;
    flex-direction: row;
    gap: 10px;

  @media (min-width: 360px) and (max-width: 450px) {
    width: 95vw;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
`;

export const TitleH1 = styled(InputLabel)`

  && {

    font-size: 24px;
    font-weight: bold;
    color: #a20066;

    @media (min-width: 360px) and (max-width: 450px) {
      font-size: 22px;
    }

  }
  


`;

export const ResultContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 64.5vh;
    position: relative;
    overflow: hidden;
  
    @media (min-width: 360px) and (max-width: 450px) {
       border: transparent;
    }
    
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.2rem solid;
  padding: 0.5rem;
  border-bottom-color: #A20066;

  @media (min-width: 360px) and (max-width: 450px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border: transparent;
    background-color: rgba(222, 0, 137, 0.29);
    border-radius: 10px;
    margin-top: 1rem;
  }
`;


export const SitesContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    border: 1px solid #cccccc;
    border-top: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    flex: 1;

    @media (min-width: 360px) and (max-width: 450px) {
      display: none;
    }
`;

export const SMSitesContainer = styled.div`
  
  display: none;

  @media (min-width: 360px) and (max-width: 450px) {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    flex: 1;
  }
`;

export const BreakingLine2 = styled.div`
    width: 80%;
    border-radius: 10px;
    max-height: 0;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    align-self: center;

    /* Gradient border with a slight inset appearance */
    border: 2px solid #A20066;
`;

export const SiteOption = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 10%;
    transition: all 0.3s ease-in-out;
    

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

      @media (min-width: 360px) and (max-width: 450px) {
        &:hover {
          transform: none; /* Reset the transform on hover for this media query range */
          cursor: default; /* Set the cursor to default on hover for this media query range */
        }
      }
  
    
`;

export const SiteOptionRoutingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const SearchInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    flex: 1;
`;

export const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;

    @media (min-width: 360px) and (max-width: 450px) {
      justify-content: start;
    }
  
    
`;


export const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid grey;
    gap: 5px;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    overflow-x: hidden;

    &:hover {
        background-color: #A20066; /* Change this to your desired hover background color */
        color: white;
        cursor: pointer; /* Change cursor to pointer to indicate interactivity */
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2); /* Adjust values as needed */
        transform: scale(1.1);

        img {
            filter: brightness(0) invert(1); /* Change image color to white */
        }
    }
`;

export const OptionIcon = styled.div`
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: center;
`;

export const OptionDetail = styled.div`
    width: 80%;
    justify-content: end;
`;

export const OptionP = styled.p`
    font-size: 13px;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
`;

export const OriginalToolTips = styled(Tooltip)`
    &&{
      background-color: white;
      color: rgba(0, 0, 0, 0.87);
      min-width: 13vw;
      max-width: 13vw;
      font-size: 12rem;
      border: 1px solid #A20066;
      border-radius: 15px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;

      @media (min-width: 360px) and (max-width: 450px) {
        min-width: 85vw;
        max-width: 85vw;
      }
    }
`;

export const ClickedToolTips = styled(Tooltip)`
    &&{
      background-color: #A20066;
      color: white;
      min-width: 13vw;
      max-width: 13vw;
      font-size: 12rem;
      border: 1px solid #A20066;
      border-radius: 15px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;

      @media (min-width: 360px) and (max-width: 450px) {
        min-width: 85vw;
        max-width: 85vw;
      }
      
    }
`;

export const SearchAutocomplete = styled(Autocomplete)`
  
  &&{
    min-width: 16vw;
    font-size: 15px;
    border-radius: 5px;

    @media (min-width: 360px) and (max-width: 450px) {
      min-width: 100%;
      max-width: 100%;
    }
  }
  
`;

export const SearchTextField = styled(TextField)`
  
  &&{

    & .MuiOutlinedInput-root {
      min-width: 14vw;
      max-width: 14vw;
      background-color: white;

      & .MuiOutlinedInput-input {
        font-size: 15px;
      }

      & fieldset {
        border: 0.5px solid grey;
        border-radius: 5px;
      }

      &.Mui-focused fieldset {
        border-color: #a20066;
      }
      
    }

    @media (min-width: 360px) and (max-width: 450px) {
      
      align-items: start;

      & .MuiOutlinedInput-root {
        min-width: 100%;
        max-width: 100%;

      }

    }
    
  }
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

// Define the animation keyframes
const fadeIn2 = keyframes`
  from {
    opacity: 0;
    transform: translate(0%, 100%); /* Start from the bottom of the screen */
  }
  to {
    opacity: 1;
    transform: translate(0%, 30%); /* Move to the middle of the screen */
  }
`;



export const AnimatedModalContent2 = styled(Modal)`
  &.ReactModal__Content {
    animation: ${fadeIn2} 0.3s ease-in-out;
    transform: translate(0%, 30%);
    background-color: white;
    display: flex;
    box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export const SiteCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
`;

export const SiteCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid grey;
  background-color: #A20066;
`;


export const SiteCardHeader2 = styled.div`
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

export const SiteCardHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${'' /* border: 1px solid yellow; */}
  width: 50%;
`;

export const SiteCardHeaderRight = styled.div`
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


export const SitePopupContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  gap: 1rem;
`

export const SitePopupMapContainer = styled.div`
  display: flex;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const SiteInfoH2 = styled.h2`
    font-size: 24px; // origin 24
    color: #41424C;
    margin: 1rem 0 1rem 0;
    padding: 0;
`;

export const SiteInfoP2 = styled.p`
  color: #262626;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

export const SiteInfoP = styled.p`
  color: #494949;
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

export const SiteInfoDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const SiteInfoDetailRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const ListItemButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0.3rem 0;
  padding: 0.3rem 0 0 0.3rem;
  min-width: 15.5vw;
  max-width: 15.5vw;
  border-radius: 10px;
  background-color: #f2f2f2;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  @media (min-width: 360px) and (max-width: 450px) {
    min-width: 80vw;
    max-width: 80vw;
    border: 1px solid #565656;
  }
`;

export const OfferedProgramsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0;
  background-color: white;
  justify-content: center; 
`;