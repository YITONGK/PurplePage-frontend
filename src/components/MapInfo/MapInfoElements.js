import styled from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';


export const InfoContainer = styled.div`
  ${'' /* margin-left: 1rem; */}
  border: 1px solid #CCC;
  padding-left: 1.2rem;
  padding-bottom: 1rem;
  border-radius: 5px;
  width: 100%;
  height: 63vh;
  overflow: hidden;
`;

export const InfoDetail = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 2px solid #CCC;
    max-height: 100%;
`;


export const InfoH1 = styled.h1`
  font-size: 32px;
  margin-left: 0.5rem;
`;

export const InfoH2 = styled.h2`
    font-size: 24px;
    color: #41424C;
    margin: 1rem 0 1rem 0;
    pading: 0;
`;

export const InfoP = styled.p`
    color: #5C5C66;
    font-size: 18px;
    margin: 0 0 0.5rem 0;
    padding: 0;
`;

export const InfoP2 = styled.p`
    color: #5C5C66;
    font-size: 16px;
    margin: 0;
    pardding: 0;
    vertical-align: middle;
`;

export const ProgramInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.2rem;
  background-color: white;
  justify-content: center; 
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

export const SiteContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
`;

export const SiteInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

export const ListItemButton = styled.div`
    display: flex;
    flex-direction: space-between;
    align-items: center;
    min-width: 21vw;
    max-width: 21vw;
    margin: 0 0 0.3rem 0;
    padding: 0.3rem 0 0 0.3rem;
    border-radius: 10px;
    background-color: #f2f2f2; /* Light background color */
    transition: all 0.2s ease-in-out; /* Smooth transition on hover */
    cursor: pointer;
    
    &:hover {
        box-shadow: 4px -5px 10px #5C5C66; /* Add the box-shadow */
        /*background-color: #e0e0e0;*/ /* Darker background color on hover */
    }
`;

export const CollapseInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    margin: -0.1rem 0 0rem 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;

export const ProgramDetailsContainer = styled.div`
    box-shadow: 6px 10px 10px #5C5C66; /* Add the box-shadow */
    margin: 0rem 0 1rem 0;
    border-radius: 10px;
`;

export const CustomPersonIcon = styled(PersonIcon)`
  color: #A20066; /* Example: Change the icon color */
  vertical-align: middle;
`;

// Customize CallIcon
export const CustomCallIcon = styled(CallIcon)`
  color: #FF9900; /* Example: Change the icon color */
  vertical-align: middle;
`;

