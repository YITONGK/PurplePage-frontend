import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MapElement = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

export const MapContainer = styled.div`
  width: 55vw;
  height: 60vh;
`;

export const MapP = styled.p`
  font-size: 24px;
  margin-top: 2rem;
  color: #90929f;
`;

export const InfoContainer = styled.div`
  margin-left: 2rem;
  border: 1px solid #CCC;
  padding-left: 1.2rem;
  border-radius: 5px;
  width: 32%;
`;

export const InfoH1 = styled.h1`
  font-size: 32px;
  margin-left: 0.5rem;
`;

export const InfoH2 = styled.h2`
  font-size: 20px;
  color: #5A5C69;
`;

export const InfoP = styled.p`
  color: #858796;
  font-size: 18px;
`;

export const InfoWindowContainer = styled.div`
  padding-left: 0.5rem;
`;

export const InfoWindowH1 = styled.h1`
  color: #A20066;
`;

export const InfoWindowP = styled.p`
  font-size: 14px;
`;

export const SelectDiv = styled.div`
  margin-right: 1.5rem;
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