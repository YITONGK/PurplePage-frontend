import React, { useEffect, useState } from 'react'
import { Grid} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { InfoContainer, InfoH1, InfoH2, InfoP, ProgramInfoContainer, ProgramInfoItem, InfoDetail, SiteTitle, SiteContainer, SiteInfo, ListItemButton, CollapseInfoContainer, ProgramDetailsContainer, InfoP2, CustomCallIcon, CustomPersonIcon, CustomListItemText} from './MapInfoElements';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

const MapInfo = ({site, advanceFilteredPrograms, exportProgram}) => {
    
    const [relatedPrograms, setRelatedPrograms] = useState([]);

    const [selectedPrograms, setSelectedPrograms] = useState([]);

    useEffect (() => {

        if(advanceFilteredPrograms && site) {
           
            const tmpFilteredProgram = advanceFilteredPrograms.filter((program) => {
                return program.site_id === site.site_id ;
            })

            const distinctProgram = tmpFilteredProgram.filter((program, index, self) => {
                return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
            });

            distinctProgram.sort ((a, b) => a.program_nme.localeCompare(b.program_nme));
            
            setRelatedPrograms(distinctProgram);
        }

    }, [advanceFilteredPrograms, site]);

    const ProgramInfo = () => {

        return (
            <ProgramInfoContainer>
                {
                    relatedPrograms.map((program) =>{
                        return (
                            <>
                                <ListItemButton onClick= {() => onClickProgram(program)}>
                                    <ListItemText primary= {program.program_nme}/>
                                    <ExpandMore style={{transform: 'rotate(-90deg)'}}></ExpandMore>
                                </ListItemButton>
                            </>
                        
                        )
                    })
                }
            </ProgramInfoContainer>
        )
    }

    const onClickProgram = (program) => {
        exportProgram(program);
    };


    // styles
    const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066"};

    return (
        <InfoContainer>
            <Grid style={gridStyle}>
                <InfoIcon fontSize="large" /> 
                <InfoH1>Site Information</InfoH1>
            </Grid>
            <InfoDetail>
                {site ? (
                <SiteContainer>
                    <SiteTitle>
                        <InfoH2>{site.site_id}</InfoH2>
                    </SiteTitle>
                    <SiteInfo>
                        {site.site_contact_name ? (
                            <InfoP><strong>Contact Name:</strong> <br/> {site.site_contact_name.replace(".", " ")}</InfoP>
                        ) : (
                            <InfoP><strong>Contact Name:</strong>  -</InfoP>
                        )}
                        <InfoP><strong>Address:</strong> <br/> {site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</InfoP>
                        <InfoP><strong>Program Offer: </strong></InfoP>
                        <List style={{marginTop: '-0.3rem'}}>
                            <ProgramInfo></ProgramInfo>
                        </List>
                        <InfoP><strong>Local Government Area:</strong> <br/>{site.lga}</InfoP>
                        <InfoP><strong>Department of Families, Fairness and Housing:</strong> <br/>{site.dffh_area}</InfoP>
                    </SiteInfo>
                </SiteContainer>
                ) : (
                    <SiteTitle>
                        <InfoH2>No selected site.</InfoH2>
                    </SiteTitle>
                )}
            </InfoDetail>
        </InfoContainer>
    );
}

export default MapInfo;
