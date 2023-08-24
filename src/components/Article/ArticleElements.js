import styled from 'styled-components';

export const ArticleContainer = styled.div`
  height: 100%;
  margin-left: 5%;
  padding-left: 2%;
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
  margin-bottom: 5rem;
  min-height: 60vh;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 2rem;
  width: 100%;
  
  /* Customize the scrollbar */
  ::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
    height: 15px; /* Height of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #A20066; /* Color of the thumb */
    border-radius: 20px; /* Rounded corners for the thumb */
  }

  ::-webkit-scrollbar-track {
    background-color: grey; /* Color of the track */
    border-radius: 20px; 
  }
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
  flex-direction: row;
  margin-left: 2rem;
  min-width: 25%;
  max-width: 25%;
`;