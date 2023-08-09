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

export const InfoWindowH1 = styled.h1`
  color: #A20066;
`;

export const InfoWindowP = styled.p`
  font-size: 14px;
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


