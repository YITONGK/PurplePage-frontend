import styled from 'styled-components';

export const MapFilterRowContainer = styled.div`
    margin-right: 1.5rem;
    height: 64.5vh;
    display: flex;
    width: 15.5vw;
    flex-direction: row;
    gap: 10px; 
`;

export const ResultContainer = styled.div`
    border: 1px solid #CCC;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 64.5vh;
    position: relative;
    overflow: hidden;
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

export const BreakingLine2 = styled.div`
    width: 90%;
    border-radius: 10px;
    max-height: 0;
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;

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
    margin-top: 0.5rem;
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

