import styled from 'styled-components';

export const InfoContainer = styled.div`
  margin-left: 2rem;
  border: 1px solid #CCC;
  padding-left: 1.2rem;
  border-radius: 5px;
  width: 30%;
  height: 60vh;
`;

export const InfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    height: 85%;
    border-top: 2px solid #CCC;
    overflow: auto;
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

export const ProgramInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProgramInfoItem = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SiteTitle = styled.div`
    align-items: center;
    justify-content: center;
    text-align: center;
`;