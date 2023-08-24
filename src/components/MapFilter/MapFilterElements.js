import styled from 'styled-components';

export const MapFilterContainer = styled.div`
    margin-right: 2rem;
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
    justify-content: space-between;
    padding: 1rem 1rem 0rem 1rem;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
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
    ${'' /* border: 1px solid red; */}
    gap: 1.5rem;
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
    /* Outer shadow for a floating effect */
    box-shadow: 0px 5px 5px pink;

    /* Gradient border with a slight inset appearance */
    border: 2px solid grey;
    border-image: linear-gradient(.25turn, #FF6B6B, #A20066, #FF6B6B);
    border-image-slice: 1;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 0.2rem solid;
    padding-bottom: 0.5rem;
    padding-top: 0.2rem;
    border-bottom-color: #A20066;
`;

export const SitesContainer = styled.div`
    overflow-y: auto;
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

export const SearchInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

