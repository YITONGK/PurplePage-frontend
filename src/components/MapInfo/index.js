import React from 'react'
import { Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { InfoContainer, InfoH1, InfoH2, InfoP} from './MapInfoElements';

const MapInfo = ({site}) => {

    // styles
    const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066" };

    return (
        <InfoContainer>
            <Grid style={gridStyle}>
            <InfoIcon fontSize="large" /> 
            <InfoH1>Site Information</InfoH1>
            </Grid>
            {site ? (
            <>
                <InfoH2>{site.site_id}</InfoH2>
                {site.site_contact_name ? (
                    <InfoP><strong>Contact Name:</strong> {site.site_contact_name.replace(".", " ")}</InfoP>
                ) : (
                    <InfoP><strong>Contact Name:</strong>  -</InfoP>
                )}
                <InfoP><strong>Address:</strong> {site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</InfoP>
                <InfoP><strong>Latitude:</strong> {site.lat}</InfoP>
                <InfoP><strong>Langitude:</strong> {site.lng}</InfoP>
                <InfoP><strong>Local Government Area:</strong> {site.lga}</InfoP>
                <InfoP><strong>Department of Families, Fairness and Housing:</strong> {site.dffh_area}</InfoP>
            </>
            ) : (
                <InfoH2>No selected site.</InfoH2>
            )}
        </InfoContainer>
    );
}

export default MapInfo;
