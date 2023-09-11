import React, { useEffect, useState } from 'react'
import { Grid} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { InfoContainer, InfoH1, InfoH2, InfoP, ProgramInfoContainer, ProgramInfoItem, InfoDetail, SiteTitle, SiteContainer, SiteInfo, ListItemButton, CollapseInfoContainer, ProgramDetailsContainer, InfoP2, CustomCallIcon, CustomPersonIcon, CustomListItemText, InfoAndPopupContainer, AnimatedModalContent, ProgramCardContainer, ProgramCardHaader, ProgramCardHeaderLeft, ProgramCardHeaderRight, CustomClearIcon} from './MapInfoElements';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const MapInfo = ({site, advanceFilteredPrograms}) => {
    
    const [relatedPrograms, setRelatedPrograms] = useState([]);

    const [programPopUpOpen, setProgramPopUpOpen] = useState(false);
    const [selectedPrograms, setSelectedPrograms] = useState({});

    const [sitePopUpOpen, setSitePopUpOpen] = useState(false);
    const [selectedSite, setSelectedSite] = useState(false);

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
        setSelectedPrograms(program);
        setProgramPopUpOpen(true);
    };

    const onClickSiteDetail = (site) => {
        setSelectedSite(site);
        setSitePopUpOpen(true);
    }

    const closeProgramModal = () => {
        setProgramPopUpOpen(false);
    };

    const closeSiteModal = () => {
        setSitePopUpOpen(false);
    };


    // styles
    const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066"};

    return (
        <InfoAndPopupContainer>
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
                        <Button style={{display: 'flex', justifyContent: 'center' , marginBottom: '1rem',color: 'white', backgroundColor: '#A20066'}} onClick={onClickSiteDetail}>Show More</Button>
                    </SiteContainer>
                    ) : (
                        <SiteTitle>
                            <InfoH2>No selected site.</InfoH2>
                        </SiteTitle>
                    )}
                </InfoDetail>
            </InfoContainer>
            <AnimatedModalContent
                isOpen={programPopUpOpen}
                contentLabel="Program Information Modal"
                style={{
                content: {
                    width: '50vw', // Set the desired width
                    height: '50vh', // Set the desired height
                    margin: 'auto', // Center the modal horizontally
                },
                }}
            >
                <ProgramCardContainer>
                <ProgramCardHaader>
                    <ProgramCardHeaderLeft>
                        <h2 style={{margin: '0', padding: '0', color: 'white'}}>Program Info</h2>
                        </ProgramCardHeaderLeft>
                        <ProgramCardHeaderRight>
                        <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeProgramModal}>
                            <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                        </Button>
                    </ProgramCardHeaderRight>
                </ProgramCardHaader>
                </ProgramCardContainer>
            </AnimatedModalContent>
            <AnimatedModalContent
                isOpen={sitePopUpOpen}
                contentLabel="Site Information Modal"
                style={{
                content: {
                    width: '50vw', // Set the desired width
                    height: '50vh', // Set the desired height
                    margin: 'auto', // Center the modal horizontally
                },
                }}
            >
                <ProgramCardContainer>
                <ProgramCardHaader>
                    <ProgramCardHeaderLeft>
                        <h2 style={{margin: '0', padding: '0', color: 'white'}}>Site Detail</h2>
                        </ProgramCardHeaderLeft>
                        <ProgramCardHeaderRight>
                        <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeSiteModal}>
                            <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                        </Button>
                    </ProgramCardHeaderRight>
                </ProgramCardHaader>
                </ProgramCardContainer>
            </AnimatedModalContent>
        </InfoAndPopupContainer>
    );
}

export default MapInfo;
