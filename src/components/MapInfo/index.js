import React, { useEffect, useState, useRef } from 'react'
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
    SiteInfoDetailContainer,
    ListItemButton, 
    CollapseInfoContainer, 
    ProgramDetailsContainer, 
    InfoP2, 
    CustomCallIcon, 
    CustomPersonIcon, 
    CustomListItemText, 
    InfoAndPopupContainer, 
    AnimatedModalContent,
    AnimatedModalContent_2,
    ProgramCardContainer, 
    ProgramCardHeader, 
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
    ProgramCardHeader_2
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
import CodeIcon from '@mui/icons-material/Code';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import Map from '../Map';


const MapInfo = ({site, advanceFilteredPrograms, groupList, programTypeList}) => {
    
    const [relatedPrograms, setRelatedPrograms] = useState([]);

    const [programPopUpOpen, setProgramPopUpOpen] = useState(false);

    const [selectedPrograms, setSelectedPrograms] = useState({});
    const [popUpSite, setPopUpSite] = useState({});

    const [sitePopUpOpen, setSitePopUpOpen] = useState(false);
    const [selectedSite, setSelectedSite] = useState({});

    const mapRef = useRef();

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
                    (relatedPrograms && relatedPrograms.length > 0) ?
                        relatedPrograms.map((program, index) =>{
                            return (
                                <React.Fragment key={index}>
                                    <ListItemButton key={index} onClick= {() => onClickProgram(program)}>
                                        <ListItemText primary= {program.program_nme}/>
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
                            <InfoH2>
                                {site.street_name} - {site.suburb}
                            </InfoH2>
                        </SiteTitle>
                        <SiteInfo>
                            <SiteInfoDetailContainer>
                                <InfoP>Address</InfoP>
                                <InfoP2>
                                    {site.street_nbr} {site.street_name}, <br/>
                                    {site.suburb}, <br/>
                                    {site.state} {site.postcode}
                                </InfoP2>
                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Hours</InfoP>
                                <InfoP2>
                                    Opening- {(stringFilterPrefix(site.site_open) === 'None') ? 'TBA' : stringFilterPrefix(site.site_open)} <br/>
                                    Closing- {(stringFilterPrefix(site.site_close) === 'None') ? 'TBA' : stringFilterPrefix(site.site_close)}
                                </InfoP2>
                            </SiteInfoDetailContainer>
                            <SiteInfoDetailContainer>
                                <InfoP>Accessibility</InfoP>
                                <InfoP2>
                                    {(site.accessibility) ? stringFilterPrefix(site.accessibility.accessibility) : 'None'}
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

                            <InfoP>Program Offer:</InfoP>
                            <List style={{marginTop: '-0.3rem'}}>
                                <ProgramInfo></ProgramInfo>
                            </List>

                            <SiteInfoDetailContainer style={{marginTop: '-5px'}}>
                                <InfoP>Local Government Area:</InfoP>
                                <InfoP2>{stringFilterPrefix(site.lga)}</InfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <InfoP>Department of Families, Fairness and Housing:</InfoP>
                                <InfoP2>{stringFilterPrefix(site.dffh_area)}</InfoP2>
                            </SiteInfoDetailContainer>

                        </SiteInfo>
                        <SiteButtonContainer>
                            <Button style={{borderRadius: '20px', display: 'flex', justifyContent: 'center' , marginBottom: '0.2rem',color: 'white', backgroundColor: '#A20066', width: '10rem', fontWeight: 'bold'}} onClick={(e) => onClickSiteDetail(site)}>Show More</Button>
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
                        backgroundColor: '#A20066'
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
                                <IconContainer style={{minWidth: '70px'}}>
                                    <CodeIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Program</ProgramViewCaption>
                                    <ProgramViewCaption>Name</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription style={{padding: "1rem", textAlign: 'justify'}}>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.program_nme)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>

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
                                    <ProgramViewCaption>Program</ProgramViewCaption>
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
                                    <PersonIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>General</ProgramViewCaption>
                                    <ProgramViewCaption>Manager</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.gm)}</ProgramViewP2>
                                </IconDescription>
                            </Icon>

                            <Icon>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <PersonIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Executive</ProgramViewCaption>
                                    <ProgramViewCaption>Officer</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{stringFilterPrefix(selectedPrograms.eo)}</ProgramViewP2>
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
                                <IconContainer style={{minWidth: '70px'}}>
                                    <VpnKeyIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Access</ProgramViewCaption>
                                    <ProgramViewCaption>Type</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{(selectedPrograms.at) ? stringFilterPrefix(selectedPrograms.at.at) : 'None'}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>
                        <ProgramInfoDetail>
                            <Icon style={{minWidth:'100%'}}>
                                <IconContainer style={{minWidth: '70px'}}>
                                    <LocalShippingIcon style={{fontSize: '25px', margin: '0'}}/>
                                    <ProgramViewCaption>Delivery</ProgramViewCaption>
                                    <ProgramViewCaption>Method</ProgramViewCaption>
                                </IconContainer>
                                <IconDescription>
                                    <ProgramViewP2>{(selectedPrograms.sdm) ? stringFilterPrefix(selectedPrograms.sdm.sdm) : 'None'}</ProgramViewP2>
                                </IconDescription>
                            </Icon>
                        </ProgramInfoDetail>
                    </ProgramInfoDetailContainer>
                </ProgramCardContainer>
            </AnimatedModalContent>

            <AnimatedModalContent_2
                appElement={document.getElementById('root')}
                isOpen={sitePopUpOpen}
                contentLabel="Site Information Modal"
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
                    <ProgramCardHeader_2>
                        <ProgramCardHeaderLeft>
                            <h2 style={{margin: '0', padding: '0', color: 'white'}}>Site Detail</h2>
                            </ProgramCardHeaderLeft>
                            <ProgramCardHeaderRight>
                            <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeSiteModal}>
                                <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                            </Button>
                        </ProgramCardHeaderRight>
                    </ProgramCardHeader_2>

                    { (selectedSite) ?

                        <SiteViewMapAndInfoContainer>

                            <SiteViewInfoContainer>
                                <SiteViewH1>{ selectedSite.site_id}</SiteViewH1>
                                <SiteViewInfoDetailContainer style={{backgroundColor: '#f5f5f5', marginRight: '-10px', gap: '20px'}}>
                                
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
                                    <SiteViewP>{ selectedSite.street_nbr}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>STREET NAME</SiteViewP2>
                                    <SiteViewP>{ selectedSite.street_name}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>SUBURB</SiteViewP2>
                                    <SiteViewP>{ selectedSite.suburb}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>STATE</SiteViewP2>
                                    <SiteViewP>{ selectedSite.state}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>POSTCODE</SiteViewP2>
                                    <SiteViewP>{ selectedSite.postcode}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>LOCAL GOVERNMENT AREA</SiteViewP2>
                                    <SiteViewP>{stringFilterPrefix(selectedSite.lga)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SiteViewInfoDetailContainer>

                                    <SiteViewInfoDetailColumn>
                                    <SiteViewP2>DEPARTMENT OF FAMILIES,FAIRNESS AND HOUSING</SiteViewP2>
                                    <SiteViewP>{stringFilterPrefix(selectedSite.dffh_area)}</SiteViewP>
                                    </SiteViewInfoDetailColumn>

                                </SiteViewInfoDetailContainer>

                                <SperateLine></SperateLine>

                                <SiteViewH2>Full Address:</SiteViewH2>

                                <SiteViewP style={{paddingLeft: '0.8rem', marginBottom: '0.3rem'}}>{stringFilterPrefix(`${selectedSite.street_nbr} ${selectedSite.street_name}, ${selectedSite.suburb}, ${selectedSite.state}, ${selectedSite.postcode}`)}</SiteViewP>

                            </SiteViewInfoContainer>

                            <SiteViewMapContainer>
                                <Map sites={[selectedSite]} exportSite={null} exportRef={mapRef} mapWidth={54} mapHeight={70} mapZoom={15} centerLng={selectedSite.lng} centerLat={selectedSite.lat}/>
                            </SiteViewMapContainer>

                        </SiteViewMapAndInfoContainer>

                        : null
                    }

                </ProgramCardContainer>
            </AnimatedModalContent_2>
        </InfoAndPopupContainer>
    );
}

export default MapInfo;
