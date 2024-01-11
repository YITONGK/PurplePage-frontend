import styled from 'styled-components';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Skeleton from 'react-loading-skeleton';

export const ArticleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  overflow: hidden;
  margin-bottom: 75px;

  @media (min-width: 360px) and (max-width: 450px) {
    padding-right: 2%;
    margin-bottom: 65px;
  }

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    
    padding-right: 2%;
    
  }
  
  
`;

export const ArticleH1 = styled.h1`
  color: #A20066;
  font-size: 40px;
  padding-top: 0;

  @media (min-width: 360px) and (max-width: 450px) {
    font-size: 25px;
  }
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

export const WarningText =  styled(Typography)`
  && {
    text-align: center;
    flex-grow: 1;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    
    @media (min-width: 360px) and (max-width: 450px) {
      font-size: 14px;
    }
  }
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
  margin-top: 1rem;
  height: 60vh;
  flex: 1;
  padding-bottom: 1rem;

  @media (min-width: 360px) and (max-width: 450px) {
    display: none;
  }
  
  /* Second media query */
  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
   display: none;
  }
  //border: 2px solid mediumvioletred;
`;

export const SMMapElement = styled.div`
  display: none;

  @media (min-width: 360px) and (max-width: 450px) {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    height: 60vh;
    flex: 1;
  }
  //border: 2px solid mediumvioletred;
`;

export const XMMapElement = styled.div`
  display: none;

  @media (min-width: 667px) and (max-width: 932px) and (min-height: 375px) and (max-height: 430px) {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    flex: 1;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 15px;
  }
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
  min-width: 59.5vw;
  max-width: 59.5vw;
  min-height: 64.5vh;
  max-height: 64.5vh;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;


export const SearchTextField = styled(Autocomplete)`
  min-width: 400px;

  @media (min-width: 360px) and (max-width: 450px) {
    min-width: 73vw;
  }
`;

export const LoadingSkeleton = styled(Skeleton)`
  width: 19vw;

  @media (min-width: 360px) and (max-width: 450px) {   
    width: 75vw;
  }
`;

