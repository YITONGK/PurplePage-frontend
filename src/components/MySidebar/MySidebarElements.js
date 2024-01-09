import styled from 'styled-components';
import Button from '@mui/material/Button';


export const SideNavButton = styled(Button)`
  &&{
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    padding: 0;

    &:hover {
      && svg {
        filter: drop-shadow(0px 0px 10px black);
      }
    }
  }
  
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
`;

export const HeaderImg = styled.img`
  width: 150px;
  height: auto;
`;

export const SiteNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
`;

export const SiteNavBackgroundFill = styled.div`
    flex: 1;
    background-color: transparent;
    width: 90vw;
    height: 100vh;
`;