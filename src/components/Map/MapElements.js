import styled, { keyframes }from 'styled-components';

export const MapContainer = styled.div`
`;

export const MapP = styled.p`
  font-size: 24px;
  margin-top: 2rem;
  color: #90929f;
`;

export const InfoWindowContainer = styled.div`
  padding-left: 0.5rem;
`;

export const InfoWindowContainerRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    margin-bottom: 5px;
    width: 85%;
`;

export const InfoWindowH1 = styled.h1`
  color: #A20066;
  padding-bottom: 0;
  margin-bottom: 15px;
`;

export const InfoWindowP = styled.p`
  font-size: 14px;
  margin:0;
  padding:0;
`;

const moveUpAndBack = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px); /* Move up by 20px */
  }
`;

export const MarkerAnimation = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  animation: ${moveUpAndBack} 1s ease infinite;
`;

export const BasicMarker = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const InterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;




