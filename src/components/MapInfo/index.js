import React, { useEffect, useState, useRef } from 'react'
import {
    InfoContainer,
    InfoTitleContainer,
    InfoH1, 
    InfoH2, 
    InfoP, 
    ProgramInfoContainer,
    InfoDetail, 
    SiteTitle, 
    SiteContainer, 
    SiteInfo, 
    SiteInfoDetailContainer,
    ListItemButton,
    InfoP2,
    InfoAndPopupContainer, 
    AnimatedModalContent,
    AnimatedModalContent2,
    ProgramCardContainer, 
    ProgramCardHeader, 
    ProgramCardHeaderLeft, 
    ProgramCardHeaderRight, 
    CustomClearIcon,
    ProgramInfoDetail,
    ProgramInfoDetailContainer,
    Icon,
    IconContainer,
    IconDescriptionContainer,
    IconDescription,
    ProgramViewCaption,
    ProgramViewP2,
    SiteButtonContainer,
    SiteViewH1, 
    SiteViewP, 
    SiteViewMapAndInfoContainer, 
    SiteViewInfoContainer, 
    SiteViewMapContainer, 
    SiteViewIconContainer, 
    SiteViewInfoDetailColumn, 
    SiteViewInfoDetailContainer, 
    SiteViewInfoDetailRow, 
    SiteViewH2, 
    SiteViewP2, 
    SperateLine,
    ProgramCardHeader2
} from './MapInfoElements';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import CodeIcon from '@mui/icons-material/Code';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';

import Map from '../Map';
import AccessTimeIcon from "@mui/icons-material/AccessTime";


const MapInfo = ({site, advanceFilteredPrograms, groupList, programTypeList, departureLocation}) => {

    // Initialise Variable
    const [relatedPrograms, setRelatedPrograms] = useState([]);

    const [programPopUpOpen, setProgramPopUpOpen] = useState(false);

    const [selectedPrograms, setSelectedPrograms] = useState({});

    const [sitePopUpOpen, setSitePopUpOpen] = useState(false);
    const [selectedSite, setSelectedSite] = useState({});

    const mapRef = useRef();

    // site program sorting
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

    const programNameProcess = (program_nme) => {
        let nameString = program_nme.split('-');
        if (nameString.length > 1) {
            return (
                <>
                    {nameString.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < nameString.length - 1 && <>-<br/></>}
                        </React.Fragment>
                    ))}
                </>
            );
        } else {
            return program_nme;
        }
    }


    // showing program info of a site
    const ProgramInfo = () => {

        return (
            <ProgramInfoContainer>
                {
                    (relatedPrograms && relatedPrograms.length > 0) ?
                        relatedPrograms.map((program, index) =>{
                            return (
                                <React.Fragment key={index}>
                                    <ListItemButton key={index} onClick= {() => onClickProgram(program)}>
                                        <ListItemText primary= {programNameProcess(program.program_nme)}/>
                                        <ExpandMore style={{transform: 'rotate(-90deg)'}}></ExpandMore>
                                    </ListItemButton>
                                </React.Fragment>

                            )
                        })
                        :
                        <React.Fragment>
                            <ListItemButton>
                                <ListItemText primary= {'No Program'}/>
                            </ListItemButton>
                        </React.Fragment>

                }
            </ProgramInfoContainer>
        )
    }

    //============================== Event Trigger ============================================

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
        document.body.style.overflow = 'hidden';
    };

    const onClickSiteDetail = (site) => {
        setSelectedSite(site);
        setSitePopUpOpen(true);
        document.body.style.overflow = 'hidden';
    }

    const closeProgramModal = () => {
        setProgramPopUpOpen(false);
        setSelectedPrograms({});
        document.body.style.overflow = 'auto';
    };

    const closeSiteModal = () => {
        setSitePopUpOpen(false);
        setSelectedSite({});
        document.body.style.overflow = 'auto';
    };

    //============================== End Event Trigger ============================================

    // String Prefix Checking
    const stringFilterPrefix = (string) => {

        if(!string) return 'None';

        // Extract the local part of the email (before '@')
        const localPart = string.split('@')[0];

        // Replace all '.' with spaces in the local part
        const result = localPart.replace(/\./g, ' ');

        return result.trim(); // trim() to remove any leading/trailing spaces
    }


    // Return UI
    return (
        <InfoAndPopupContainer>
            <InfoContainer>
                <InfoTitleContainer>
                    <InfoIcon className= "" style={{padding: "0", margin: "0"}} fontSize="large" />
                    <InfoH1>Site Information</InfoH1>
                </InfoTitleContainer>
                <InfoDetail>
                    {site ? (
                    <SiteContainer>
                        <SiteTitle>
                            <InfoH2>
                                {site.site_id}
                            </InfoH2>
                        </SiteTitle>
                        <SiteInfo>
                            <SiteInfoDetailContainer>
                                <InfoP>Address</InfoP>
                                <InfoP2>
                                    {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ? (
                                        <>
                                            {site.street_nbr} {site.street_name}, <br/>
                                            {site.suburb}, <br/>
                                            {site.state} {site.postcode}
                                        </>
                                    ) : (
                                        'None'
                                    )}
                                </InfoP2>
                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Hours (Holiday Open Hours in Brackets)</InfoP>
                                <SiteViewInfoDetailRow style={{justifyContent: 'start', gap:'0.5rem'}}>
                                    <AccessTimeIcon></AccessTimeIcon>
                                    <InfoP2>
                                        Opens {(stringFilterPrefix(site.site_open) === 'None') ? 'TBA' : stringFilterPrefix(site.site_open)}
                                         - {(stringFilterPrefix(site.site_close) === 'None') ? 'TBA' : stringFilterPrefix(site.site_close)}
                                    </InfoP2>
                                </SiteViewInfoDetailRow>

                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Accessibility</InfoP>
                                <InfoP2>
                                    {(site.accessibility && site.accessibility.length > 0)
                                        ? site.accessibility.map(site => site.accessibility).join(', ')
                                        : 'None'}
                                </InfoP2>
                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Contact Name:</InfoP>
                                <InfoP2>{stringFilterPrefix(site.site_contact_name)}</InfoP2>
                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Contact Number</InfoP>
                                <InfoP2>
                                    {stringFilterPrefix(site.site_contact_nbr)}
                                </InfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <InfoP>Program Offer:</InfoP>
                                <List>
                                    <ProgramInfo></ProgramInfo>
                                </List>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer style={{marginTop: '-5px'}}>
                                <InfoP>Local Government Area:</InfoP>
                                <InfoP2>{stringFilterPrefix(site.lga)}</InfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <InfoP>Department of Families, <br/>Fairness and Housing:</InfoP>
                                <InfoP2>{stringFilterPrefix(site.dffh_area)}</InfoP2>
                            </SiteInfoDetailContainer>

                        </SiteInfo>

                        <SiteButtonContainer>
                            <Button style={{borderRadius: '20px', marginBottom: '0.2rem',color: 'white', backgroundColor: '#A20066', width: '10rem',fontWeight: 'bold'}} onClick={(e) => onClickSiteDetail(site)}>Show More</Button>
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
                appElement={document.getElementById('root')}
                isOpen={programPopUpOpen}
                contentLabel="Program Information Modal"
                style={{
                    content: {
                        width: '75vw', // Set the desired width
                        height: 'fit-content', // Set the desired height
                        maxHeight: '70vh',
                        margin: 'auto', // Center the modal horizontally
                        borderRadius: '15px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    },
                }}
            >
                <ProgramCardContainer>
                    <ProgramCardHeader>
                        <ProgramCardHeaderLeft>
                            <h2 style={{margin: '0', padding: '0', color: 'white'}}>Program Info</h2>
                            </ProgramCardHeaderLeft>
                            <ProgramCardHeaderRight>
                            <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeProgramModal}>
                                <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                            </Button>
                        </ProgramCardHeaderRight>
                    </ProgramCardHeader>

                    <ProgramInfoDetailContainer>
                        <ProgramInfoDetail>
                            <Icon style={{minWidth:'100%'}}>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <CodeIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Program ID And Name: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.title) + " - " + stringFilterPrefix(selectedPrograms.program_nme)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>
                        </ProgramInfoDetail>

                        <ProgramInfoDetail>
                            <Icon style={{minWidth:'100%', paddingBottom: '10px'}}>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <DescriptionIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer style={{maxWidth: '92%'}}>
                                    <ProgramViewCaption>Program Description: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2 style={{lineHeight: '1.5'}}>{stringFilterPrefix(selectedPrograms.service_desc)}.</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>
                        </ProgramInfoDetail>


                        <ProgramInfoDetail>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Program Manager: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_mgr)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <CallIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Program Contact: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_cont_no)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                        </ProgramInfoDetail>

                        <ProgramInfoDetail>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>General Manager: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.gm)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Executive Officer: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.eo)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                        </ProgramInfoDetail>
                        <ProgramInfoDetail>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <CategoryIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Program Type: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>{stringFilterPrefix(selectedPrograms.prgm_type)}</ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <VpnKeyIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Access Type: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>
                                            {(selectedPrograms.at && selectedPrograms.at.length > 0)
                                            ? selectedPrograms.at.map(program => program.at).join(', ')
                                            : 'None'}
                                        </ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                        </ProgramInfoDetail>
                        <ProgramInfoDetail>

                            <Icon style={{minWidth:'100%'}}>
                                <IconContainer style={{minWidth: '2%'}}>
                                    <LocalShippingIcon style={{fontSize: '40px', margin: '0'}}/>
                                </IconContainer>
                                <IconDescriptionContainer>
                                    <ProgramViewCaption>Delivery Method: </ProgramViewCaption>
                                    <IconDescription style={{ textAlign: 'justify'}}>
                                        <ProgramViewP2>
                                            {(selectedPrograms.sdm && selectedPrograms.sdm.length > 0)
                                                ? selectedPrograms.sdm.map(program => program.sdm).join(', ')
                                                : 'None'}
                                        </ProgramViewP2>
                                    </IconDescription>
                                </IconDescriptionContainer>
                            </Icon>

                        </ProgramInfoDetail>
                    </ProgramInfoDetailContainer>
                </ProgramCardContainer>
            </AnimatedModalContent>

            <AnimatedModalContent2
                appElement={document.getElementById('root')}
                isOpen={sitePopUpOpen}
                contentLabel="Site Information Modal" // Site
                style={{
                    content: {
                        width: '90vw', // Set the desired width
                        height: '75vh', // Set the desired height
                        margin: 'auto', // Center the modal horizontally
                        borderRadius: '15px',
                        zIndex: '10000',
                    },
                }}
            >
                <ProgramCardContainer>
                    <ProgramCardHeader2>
                        <ProgramCardHeaderLeft>
                            <h2 style={{margin: '0', padding: '0', color: 'white'}}>Site Detail</h2>
                            </ProgramCardHeaderLeft>
                            <ProgramCardHeaderRight>
                            <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeSiteModal}>
                                <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                            </Button>
                        </ProgramCardHeaderRight>
                    </ProgramCardHeader2>

                    { (selectedSite) ?

                        <SiteViewMapAndInfoContainer>

                            <SiteViewInfoContainer>
                                <SiteViewH1>{ selectedSite.site_id}</SiteViewH1>
                                <SiteViewInfoDetailContainer style={{ width:'42rem', backgroundColor: '#f5f5f5', marginRight: '-10px', justifyContent: '20px'}}>
                                
                                    <SiteViewInfoDetailRow style={{maxWidth: '50%'}}>

                                        <SiteViewIconContainer>
                                            <PersonIcon style={{fontSize: '55px'}}></PersonIcon>
                                        </SiteViewIconContainer>

                                        <SiteViewInfoDetailColumn>
                                            <SiteViewP><strong>Site Manager:</strong></SiteViewP>
                                            <SiteViewP>{ stringFilterPrefix(selectedSite.site_contact_name)}</SiteViewP>

                                        </SiteViewInfoDetailColumn>

                                    </SiteViewInfoDetailRow>

                                    <SiteViewInfoDetailRow style={{maxWidth:'50%'}}>

                                        <SiteViewIconContainer>
                                            <CallIcon style={{fontSize: '55px'}}></CallIcon>
                                        </SiteViewIconContainer>

                                        <SiteViewInfoDetailColumn>
                                            <SiteViewP><strong>Contact Number:</strong></SiteViewP>

                                            <SiteViewP>{ stringFilterPrefix(selectedSite.site_contact_nbr)}</SiteViewP>
                                        </SiteViewInfoDetailColumn>

                                    </SiteViewInfoDetailRow>

                                </SiteViewInfoDetailContainer>
                                
                                <SiteViewH2>National Address:</SiteViewH2>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>STREET NUMBER</SiteViewP2>
                                    <SiteViewP>{ stringFilterPrefix(selectedSite.street_nbr)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>STREET NAME</SiteViewP2>
                                    <SiteViewP>{ stringFilterPrefix(selectedSite.street_name)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>SUBURB</SiteViewP2>
                                    <SiteViewP>{ stringFilterPrefix(selectedSite.suburb)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>STATE</SiteViewP2>
                                    <SiteViewP>{ stringFilterPrefix(selectedSite.state)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>POSTCODE</SiteViewP2>
                                    <SiteViewP>{ stringFilterPrefix(selectedSite.postcode+"")}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>LOCAL GOVERNMENT AREA</SiteViewP2>
                                    <SiteViewP>{stringFilterPrefix(selectedSite.lga)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>DEPARTMENT OF FAMILIES, FAIRNESS AND HOUSING</SiteViewP2>
                                    <SiteViewP>{stringFilterPrefix(selectedSite.dffh_area)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SperateLine></SperateLine>

                                <SiteViewH2>Full Address:</SiteViewH2>

                                <SiteViewP style={{ paddingLeft: '0.8rem', marginBottom: '0.3rem' }}>
                                    {selectedSite.street_nbr && selectedSite.street_name && selectedSite.suburb && selectedSite.state && selectedSite.postcode ?
                                        `${selectedSite.street_nbr} ${selectedSite.street_name}, ${selectedSite.suburb}, ${selectedSite.state}, ${selectedSite.postcode}` : 'None'
                                    }
                                </SiteViewP>

                            </SiteViewInfoContainer>

                            <SiteViewMapContainer>
                                <Map sites={[selectedSite]} exportSite={null} exportRef={mapRef} mapWidth={54} mapHeight={70} mapZoom={15} centerLng={selectedSite.lng} centerLat={selectedSite.lat} departureLocation={departureLocation}/>
                            </SiteViewMapContainer>

                        </SiteViewMapAndInfoContainer>

                        : null
                    }

                </ProgramCardContainer>
            </AnimatedModalContent2>
        </InfoAndPopupContainer>
    );
}

export default MapInfo;
