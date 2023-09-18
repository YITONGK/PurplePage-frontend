import React, { useEffect, useState } from 'react'
import { Grid} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { InfoContainer, 
    InfoH1, 
    InfoH2, 
    InfoP, 
    ProgramInfoContainer, 
    ProgramInfoItem, 
    InfoDetail, 
    SiteTitle, 
    SiteContainer, 
    SiteInfo, 
    ListItemButton, 
    CollapseInfoContainer, 
    ProgramDetailsContainer, 
    InfoP2, CustomCallIcon, 
    CustomPersonIcon, 
    CustomListItemText, 
    InfoAndPopupContainer, 
    AnimatedModalContent, 
    ProgramCardContainer, 
    ProgramCardHaader, 
    ProgramCardHeaderLeft, 
    ProgramCardHeaderRight, 
    CustomClearIcon,
    ProgramInfoDetail,
    ProgramInfoDetailContainer,
    Icon,
    IconContainer,
    IconDescription,
    ProgramViewCaption,
    ProgramViewP2,
    ProgramViewGreenP,
    SiteButtonContainer
} from './MapInfoElements';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const MapInfo = ({site, advanceFilteredPrograms, groupList, programTypeList}) => {
    
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

            if (distinctProgram[0] && distinctProgram[0].program_nme !== null) {
                distinctProgram.sort((a, b) => {
                    if (a.program_nme === null && b.program_nme === null) return 0; // both are null, they are equal
                    if (a.program_nme === null) return -1; // a comes first
                    if (b.program_nme === null) return 1;  // b comes first
                    return a.program_nme.localeCompare(b.program_nme);
                });
            }
            
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

        let group_name = '';
        let program_type_name = '';

        if(program) {
            if(program.prgm_type_id) {

                const tmpFilteredProgramType = programTypeList.filter((programType) => programType.prgm_type_id === program.prgm_type_id);
                program_type_name = tmpFilteredProgramType[0].prgm_type;
            }

            if(program.group_id) {

                const tmpFilteredGroup = groupList.filter((group) => group.group_id === program.group_id);
                group_name = tmpFilteredGroup[0].group_name;

            }
        }

        const newProgram = {...program, group_name: group_name, prgm_type: program_type_name};
        setSelectedPrograms(newProgram);

        setProgramPopUpOpen(true);
    };

    const onClickSiteDetail = (site) => {
        setSelectedSite(site);
        setSitePopUpOpen(true);
    }

    const closeProgramModal = () => {
        setProgramPopUpOpen(false);
        setSelectedPrograms({});
    };

    const closeSiteModal = () => {
        setSitePopUpOpen(false);
    };

    const stringFilterPrefix = (string) => {

        if(!string) return 'None';

        // Extract the local part of the email (before '@')
        const localPart = string.split('@')[0];

        // Replace all '.' with spaces in the local part
        const result = localPart.replace(/\./g, ' ');

        return result.trim(); // trim() to remove any leading/trailing spaces
    }


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
                        <SiteButtonContainer>
                            <Button style={{display: 'flex', justifyContent: 'center' , marginBottom: '1rem',color: 'white', backgroundColor: '#A20066', width: '10rem'}} onClick={onClickSiteDetail}>Show More</Button>
                        </SiteButtonContainer>
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
                        height: '65vh', // Set the desired height
                        margin: 'auto', // Center the modal horizontally
                        borderRadius: '15px'
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

                    <ProgramInfoDetailContainer>
                        <ProgramInfoDetail>
                            <Icon style={{minWidth:'100%'}}>
                                <IconContainer>
                                    <DescriptionIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Program</ProgramViewCaption>
                                    <ProgramViewCaption>Description</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription style={{padding: "1rem", textAlign: 'justify'}}>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.service_desc)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>

                        <ProgramInfoDetail>
                            <Icon>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <PersonIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Program</ProgramViewCaption>
                                    <ProgramViewCaption>Manager</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_mgr)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <CallIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Manager</ProgramViewCaption>
                                    <ProgramViewCaption>Contact</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_cont_no)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>

                        <ProgramInfoDetail>
                            <Icon>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <CategoryIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Program</ProgramViewCaption>
                                    <ProgramViewCaption>Type</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_type)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '70px', minHeight: '55px'}}>
                                    <WorkIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Group</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.group_name)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>
                        <ProgramInfoDetail>
                            <Icon style={{minWidth:'100%'}}>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <QueryStatsIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Status</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2><ProgramViewGreenP><strong>{stringFilterPrefix(selectedPrograms.prgm_status)}</strong></ProgramViewGreenP></ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>
                    </ProgramInfoDetailContainer>
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
