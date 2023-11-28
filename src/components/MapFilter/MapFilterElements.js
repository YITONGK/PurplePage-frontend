import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

export const MapFilterRowContainer = styled.div`
    height: 16rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border: 1px solid #CCC;
    border-radius: 10px;
    margin-right: 0.3vw;
    background-color: #FBF4F8;
    overflow: hidden;

    @media (min-width: 375px) and (max-width: 450px) {
      
      height: fit-content;
      margin-right: 0;
    }
  
`;

export const FilterContainer = styled.div`
    //border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 0 0.5rem 1rem 0.5rem;
    align-items: center;
    flex:1;
    width: fit-content;
    gap: 1.2vw;

    @media (min-width: 375px) and (max-width: 450px) {
     display: none;
    }
`;

export const ColumnFilterContainer = styled.div`
  
  display: none;

  @media (min-width: 375px) and (max-width: 450px) {
    //border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 0 0 1rem 0;
    align-items: center;
    flex: 1;
    gap: 1.2vh;
  }
`;

export const SMFilterNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 6vw;
  background-color: white;
`;

export const SMFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0 1vw 0 1vw;
  height: 100%;
  flex: 1;
  gap: 2vh;
  
`;

export const SMFilterNavigationBreakLine = styled.div`
    height: 2vh;
    width: 0.5vw;
    background-color: black;
    border-radius: 10px;
    border: 1px solid black;
`;

export const SMFilterNavigationButtonDefault = styled(Button)`
  && {
    color: #b0b0b0;
    padding: 0;
    font-size: 15px;
  }
`;

export const SMFilterNavigationButtonActive = styled(Button)`
  && {
    
    padding: 0;
    font-size: 15px;
    color: #a20066;
    font-weight: bolder;
    text-decoration: underline;
    text-shadow: 0 6px 4px rgba(0, 0, 0, 0.2); /* Adjust the values as needed */
  }
`;

export const FilterLabel = styled(InputLabel)`
  && {
    font-size: 24px;
    font-weight: bold;
    color: #A20066;
    
    @media (min-width: 375px) and (max-width: 450px) {
      font-size: 20px;
      
    }
    
  }
`;

export const ResultContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 0.5rem;
  margin-top: 2rem;

  @media (min-width: 375px) and (max-width: 450px) {
    margin-top: 1rem;
  }
  //margin-left: 2rem;
`;

export const SelectDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    @media (min-width: 375px) and (max-width: 450px) {
      align-items: flex-start;
      width: 100%;
      
    }
  
`;

export const ProgramDropDownContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    flex: 1;

    @media (min-width: 375px) and (max-width: 450px) {
      justify-content: center;
      gap: 2vh;
    }
    //border: 2px solid grey;
`;

export const GroupDropDownContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1rem;
`;

export const BreakingLine = styled.div`
    width: 100%;
    border-bottom: 5px solid #A20066;
    max-height: 0;
    padding: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

export const BreakingLine2 = styled.div`
    width: 3.5vw;
    border-radius: 10px;
    max-height: 0;
  
    margin-top: 2.5rem;
    margin-bottom: 1rem;

    /* Gradient border with a slight inset appearance */
    border: 2px solid #A20066;
`;

export const BreakingLine3 = styled.div`
  min-height: 1.5vh;
  width: 2px;
  border-radius: 20px;
  background-color: #A20066;
  
  margin-top: 2vh;
`;

export const Arrow = styled.div`
  position: relative;
  //margin: auto; /* Center in column */
  height: 6px; /* Adjust to control the triangle's height */
  width: 40px; /* Adjust to control the triangle's width */
  transform: rotate(90deg) translateY(5px) translateX(10px);

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0;
    background: #A20066;
  }

  &:before {
    left: 0;
    border-radius: 10px 0 0 10px;
    transform: skewY(-45deg); /* Skew for left side */
    transform-origin: top left;
  }

  &:after {
    right: 0;
    border-radius: 0 10px 10px 0;
    transform: skewY(45deg); /* Skew for right side */
    transform-origin: top right;
  }
`;



export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 0.2rem solid;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-bottom-color: #A20066;
`;

export const SitesContainer = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
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
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgb(234, 234, 234);
  padding: 0.5rem;
`;

export const CollapseButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
`;

export const CollapseButton = styled.button`
  width: 30px;
  padding: 0;
  min-width: unset;
  height: 90%;
  background-color: #A20066;
  border-top: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: #A20066;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scaleY(0.9) scaleX(1);
    border-color: #A20066;
    border-left: 1px solid transparent;
  }
`;

export const ApplyButton = styled.button`
    display:flex;
    flex-direction: row;
    text-transform: none;
    color: #FFF;
    background-color: #A20066;
    border: 1px solid #A20066;
    border-radius: 10px;
    width: fit-content;
    height: 2.5rem;
    align-items: center;
    cursor: pointer;
    justify-content: center;

    &:hover {
        box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.4);
    }
`;

export const ResetButton = styled.button`
    display: flex;
    flex-direction: row;
    text-transform: none;
    color: #FFF;
    background-color: transparent; 
    border: 2px solid #A20066;
    border-radius: 10px;
    width: fit-content;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-right: 1rem;

    &:hover {
        box-shadow: 3px 0px 8px rgba(0, 0, 0, 0.4);
    }
`;

export const ButtonLabel = styled.p`
   font-size: 14px;
   color: white;
   font-weight: bold;
   padding: 0;
   margin: 0;
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

export const DropdownSelect = styled(Select)`
    && {
      min-width: 16vw;
      max-width: 16vw;
      font-size: 15px;

      @media (min-width: 375px) and (max-width: 450px) {
        
        min-width: 80vw;
        max-width: 80vw;
        font-size: 14px;
      }
      
    }
`;

