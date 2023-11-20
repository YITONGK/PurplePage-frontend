import styled from 'styled-components';

export const ArticleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  overflow: hidden;
  margin-bottom: 75px;

  /* Styling for the scrollbar */
  //&::-webkit-scrollbar {
  //  width: 10px;
  //}
  //
  //&::-webkit-scrollbar-track {
  //  background: #f1f1f1;
  //}
  //
  //&::-webkit-scrollbar-thumb {
  //  background: linear-gradient(135deg, #ff8a00, #e52e71);
  //  border-radius: 10px;
  //  border: 3px solid #f1f1f1;
  //}
  //
  //&::-webkit-scrollbar-thumb:hover {
  //  background: linear-gradient(135deg, #e52e71, #ff8a00);
  //}
`;

export const ArticleH1 = styled.h1`
  color: #A20066;
  font-size: 40px;
  padding-top: 0;
`;

export const WarningContainer =  styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: #ee8e00;
  border-radius: 4px;
  margin: 8px 0.3vw 0 0;
  gap: 8px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  flex: 1;
  //border: 1px solid red;
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
  height: 60vh;
  flex: 1;
  padding-bottom: 1rem;
  //border: 2px solid mediumvioletred;
`;

export const MapP = styled.p`
  font-size: 24px;
  margin-top: 2rem;
  color: #90929f;
`;

export const SelectDiv = styled.div`
  margin-right: 0.5rem;
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
  flex-direction: column;
  margin-left: 1.2vw;
  padding: 0;
  justify-content: start;
  flex: 1;
`;

export const LoadindContainer = styled.div`
  display: flex;
  min-width: 55vw; 
  min-height: 64.5vh;
  max-width: 55vw;
  max-height: 64.5vh;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;

