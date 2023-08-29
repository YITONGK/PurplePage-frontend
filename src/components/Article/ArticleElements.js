import styled, {keyframes} from 'styled-components';
import Modal from 'react-modal';
import ClearIcon from '@mui/icons-material/Clear';

export const ArticalAndPopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArticleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  padding-left: 2%;
  overflow-x: auto;
  margin-bottom: 60px;

  /* Styling for the scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #ff8a00, #e52e71);
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #e52e71, #ff8a00);
  }
`;

export const ArticleH1 = styled.h1`
  color: #A20066;
  font-size: 40px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
`;

export const MapElement = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  min-height: 60vh;
  padding-bottom: 1rem;
`;

export const MapP = styled.p`
  font-size: 24px;
  margin-top: 2rem;
  color: #90929f;
`;

export const SelectDiv = styled.div`
  margin-right: 0.1rem;
`;

export const GroupHeader = styled.div`
  position: sticky;
  top: -8px;
  padding: 4px 10px;
  color: white;
  background-color: grey;
`;

export const GroupItems = styled('ul')({
  padding: 0,
});

export const MapInfoContainer = styled.div`
  display: flex;
  margin-left: 1.5rem;
  padding: 0;
  justify-content: start;
  flex: 1;
  width: 'fit-content';
`;

// Define the animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(0%, 0%);
  }
  to {
    opacity: 1;
    transform: translate(0%, 50%);
  }
`;

// Create a styled component for the modal content with the animation
export const AnimatedModalContent = styled(Modal)`
  &.ReactModal__Content {
    animation: ${fadeIn} 0.3s ease-in-out;
    transform: translate(0%, 50%);
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
  gap: 1.5rem;
`;

export const ProgramCardHaader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${'' /* border: 1px solid black; */}
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-bottom: 1px solid grey;
  background-color: #A20066;
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
  font-size: 40px;
  color: white;

  &:hover {
    color: black; /* Your hover effect color */
  }
`;

