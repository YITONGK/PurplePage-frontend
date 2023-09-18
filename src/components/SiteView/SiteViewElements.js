import styled from 'styled-components';

export const SiteViewContainer = styled.div`
  margin-top: 2%;
  padding-left: 2rem;
`;

export const SiteViewH1 = styled.h1`
  font-size: 32px;
  color: #A60A6C;
  padding: 0 0 0 0.8rem;
`;

export const SiteViewH2 = styled.h1`
  font-size: 20px;
  color: #444444;
  padding: 0 0 0 0.8rem;
  font-weight: bold;
`;

export const SiteViewP = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 0;
`;

export const SiteViewP2 = styled.p`
  font-size: 12px;
  color: #555555;
  margin: 0;
  padding: 0;
`;

export const SiteViewMapAndInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 80vh;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
`;

export const SiteViewInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 40%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SiteViewMapContainer = styled.div`
  width: 60%;
`;

export const SiteViewInfoDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
  padding: 0.5rem;
`;

export const SiteViewInfoDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SiteViewInfoDetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 0 0.5rem;
  min-width: 10rem;

  @media screen and (min-height: 1080px) {
        /* Apply new styles for screens with a minimum width of 768px */
        min-width: 15rem; /* New height on larger screens */
  }
`;

export const SiteViewIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  border-radius: 50px;
  border: 1px solid black;
  padding: 0.3rem;
`;

export const SperateLine = styled.div`
  display: flex;
  width: 97%;
  border-bottom: 2px solid #7777;
  margin: 0.8rem 0.8rem 0.5rem 0.8rem;
`;

export const ScrollContainer = styled.div`
  max-height: 55vh:
  overflow-y: auto;
  overflow-x: hidden;
`;