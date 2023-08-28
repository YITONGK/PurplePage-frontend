import styled from 'styled-components';

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
  flex-direction: row;
  margin-left: 2rem;
  min-width: 25%;
  max-width: 25%;
`;