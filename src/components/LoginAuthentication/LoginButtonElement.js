import styled from 'styled-components';
import Button from '@mui/material/Button';
import MicrosoftIcon from '@mui/icons-material/Microsoft'

export const LoginButton = styled(Button)`
  &&{
    background-color: #a20066;
    color: white;
    margin-top: 10px;
    
    &:hover {
      background-color: #a20066;
      color: white;
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.4);
    }
    
  }
  
`;

export const MicrosoftLogo = styled(MicrosoftIcon)`
    margin-right: 8px; // Adjust margin as needed
`;