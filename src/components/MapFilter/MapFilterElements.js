import styled from 'styled-components';

export const MapFilterContainer = styled.div`
    margin-right: 1rem;
    height: 64.5vh;
    display: flex;
    flex-direction: row;
    gap: 10px; 
`;

export const FilterContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 0rem 1rem 0rem 1rem;
    align-items: center;
    overflow-y: auto;
`;

export const ResultContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hiddden;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  flex:1;
  gap: 20px;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
`;

export const SelectDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${'' /* border: 1px solid; */}
`;

export const ProgramDropDownContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    gap: 1rem;
`;

export const GroupDropDownContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${'' /* border: 1px solid yellow; */}
    gap: 1.5rem;
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
    width: 90%;
    border-radius: 10px;
    max-height: 0;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;

    /* Gradient border with a slight inset appearance */
    border: 2px solid #A20066;
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
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
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
    width: fix-content;
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
   color: 'white';
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

