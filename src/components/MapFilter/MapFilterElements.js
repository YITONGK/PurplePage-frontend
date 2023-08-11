import styled from 'styled-components';

export const MapFilterContainer = styled.div`
    margin-right: 2rem;
    max-width: 20%;
    min-width: 20%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
`;

export const FilterContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
`;

export const ResultContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 30%;
    z-index:1;
    position: relative;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectDiv = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    align-items: center;
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
    height: 20vh;

    @media screen and (display-mode: fullscreen) {
        height: 24.5vh;
    }

    @media screen and (min-height: 1080px) {
        /* Apply new styles for screens with a minimum width of 768px */
        height: 35.5vh; /* New height on larger screens */
    }
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

export const ToolTips = styled.div`
    background-color: white;
    color: rgba(0, 0, 0, 0.87);
    max-width: 13.5vw;
    font-size: 12rem;
    border: 1px solid #A20066;
    border-radius: 15px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;
