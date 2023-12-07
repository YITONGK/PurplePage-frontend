import styled from "styled-components";
import Typography from "@mui/material/Typography";

export const ExportInfoContainer =  styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: rgba(0, 123, 255, 0.2); /* Primary blue color */
  border: 1px solid #007bff; /* Border color same as background color */
  border-radius: 4px;
  margin: 1rem 0.3vw 0 0;
  gap: 8px;
`;

export const ExportInfoText =  styled(Typography)`
  && {
    text-align: center;
    flex-grow: 1;
    color: #3d3d3d;
    font-size: 14px;
    font-weight: bold;

    @media (min-width: 360px) and (max-width: 450px) {
      font-size: 14px;
    }
  }
`;