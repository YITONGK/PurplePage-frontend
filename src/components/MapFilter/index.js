import React, {useEffect, useState} from 'react';
import {
    MapFilterRowContainer,
    FilterContainer,
    ColumnFilterContainer,
    FilterLabel,
    SelectDiv,
    ButtonContainer,
    ProgramDropDownContainer,
    BreakingLine2,
    Arrow,
    LabelContainer,
    ResetButton,
    ButtonLabel,
    SMFilterNavigationContainer,
    SMFilterNavigationButtonDefault,
    SMFilterNavigationButtonActive,
    SMFilterContainer,
    DropdownSelect,
    SMFilterButton,
    SMMapFilterContainer,
    SMMapFilterHeader,
    SMMapFilterHeaderLeft,
    SMMapFilterHeaderRight,
    AnimatedModalContent,
    CustomClearIcon

} from './MapFilterElements';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from "@mui/material/MenuItem";

import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MapFilter = ({
                       filteredPrograms,
                       filteredSites,
                       programTypes,
                       serviceTypes,
                       serviceStreams,
                       groups,
                       divisions,
                       importRef,
                       importSite,
                       exportSite,
                       exportAdvanceFilteredSites,
                       exportAdvanceFilteredPrograms,
                       exportDepartureAddress,
                       loadingChecking,
                       collapseChecking,
                       loadingSignal,
                       mapFilterUsed
                   }) => {


    // user's input value
    const [serviceStreamValue, setServiceStreamValue] = useState('');
    const [serviceTypeValue, setServiceTypeValue] = useState('');
    const [programTypeValue, setProgramTypeValue] = useState('');
    const [programValue, setProgramValue] = useState('');

    const [divisionValue, setDivisionValue] = useState('');
    const [groupValue, setGroupValue] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    // drop down option
    const [filteredServiceStreams, setFilteredServiceStreams] = useState([]);
    const [filteredServiceTypes, setFilteredServiceTypes] = useState([]);
    const [filteredProgramTypes, setFilteredProgramTypes] = useState([]);
    const [localFilteredProgram, setLocalFilteredProgram] = useState([]);

    const [filteredDivisions, setFilteredDivisions] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);


    // program data filtered by drop down option
    const [advancedFilteredPrograms, setAdvancedFilteredPrograms] = useState([]);


    const [clickedProgramService, setClickedProgramService] = useState(true);
    const [clickedGroupDivision, setClickedGroupDivision] = useState(false);

    const [smFilterPopup, setSMFilterPopup] = useState(false);

    // style
    const dropDownStyle = {minWidth: '16vw', maxWidth: '16vw', fontSize: '15px'};

    // Loading all data on the first load
    useEffect(() => {

        setServiceStreamValue('All Service Stream');
        setServiceTypeValue('All Service Type');
        setProgramTypeValue('All Program Type');
        setProgramValue('All Program');
        setDivisionValue('All Divisions');
        setGroupValue('All Group');

        setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
        setFilteredServiceTypes(filteringServiceTypes(filteredPrograms));
        setFilteredProgramTypes(filteringProgramTypes(filteredPrograms));

        //remove dueplicate
        const distinctPrograms = filteredPrograms.filter((program, index, self) => {
            return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
        });

        setLocalFilteredProgram(distinctPrograms);

        setFilteredDivisions(filteringDivisions(filteredPrograms));
        setFilteredGroups(filteringGroups(filteredPrograms));


    }, [filteredPrograms])


    useEffect(() => {

        if (filteredServiceStreams.length > 0 &&
            filteredServiceTypes.length > 0 &&
            filteredProgramTypes.length > 0 &&
            filteredDivisions.length > 0 &&
            filteredGroups.length > 0) {

            setIsLoading(false);
            loadingChecking(false);
        }

    }, [filteredServiceStreams, filteredServiceTypes, filteredProgramTypes, filteredDivisions, filteredGroups])


    // Filtering the Program Based on the filter
    useEffect(() => {

        if (serviceStreamValue === '' || serviceTypeValue === '' || programTypeValue === '' || divisionValue === '' || groupValue === '') {
            return;
        }

        // Upper
        const selectedServiceStreamIds = [];
        for (let i = 0; i < serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if (serviceStreamValue !== 'All Service Stream') {
                if (serviceStream.ser_stream === serviceStreamValue) {
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            } else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for (let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if (serviceTypeValue !== 'All Service Type') {
                if (serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            } else if (serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for (let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if (programTypeValue !== 'All Program Type') {
                if (programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            } else if (programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        // Lower

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
            const division = divisions[i];
            if (divisionValue !== 'All Divisions') {
                if (division.division_name === divisionValue) {
                    selectedDivisionIds.push(division.division_id);
                }
            } else {
                selectedDivisionIds.push(division.division_id);
            }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (groupValue !== 'All Group') {
                if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
                    selectedGroupIds.push(group.group_id);
                }
            } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
                selectedGroupIds.push(group.group_id);
            }
        }

        // Combination

        const finalFilteredPrograms = filteredPrograms.filter((program) =>
            selectedProgramTypeIds.includes(program.prgm_type_id) &&
            selectedGroupIds.includes(program.group_id)
        );

        setAdvancedFilteredPrograms(finalFilteredPrograms);

        if (programValue !== 'All Program') {
            const tmpProgram = finalFilteredPrograms.filter((program) => program.program_nme === programValue);
            if (tmpProgram.length <= 0) {
                setProgramValue('All Program');
            }
        }

        //remove redundent
        const distinctPrograms = finalFilteredPrograms.filter((program, index, self) => {
            return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
        });


        setLocalFilteredProgram(distinctPrograms);

        if (serviceStreamValue === 'All Service Stream' &&
            serviceTypeValue === 'All Service Type' &&
            programTypeValue === 'All Program Type' &&
            programValue === 'All Program' &&
            divisionValue === 'All Divisions' &&
            groupValue === 'All Group') {
            mapFilterUsed(false)

        } else {

            mapFilterUsed(true)
        }

    }, [serviceStreamValue, serviceTypeValue, programTypeValue, divisionValue, groupValue])


    useEffect(() => {
        applyingFilter();
    }, [advancedFilteredPrograms, programValue])


    //===================================== Filter Component =====================================================

    const filteringServiceStreams = (programList) => {

        const tmpProgramTypeIds = []
        for (let i = 0; i < programList.length; i++) {
            tmpProgramTypeIds.push(programList[i].prgm_type_id)
        }

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return tmpProgramTypeIds.includes(type.prgm_type_id);
        });

        const tmpFilteredServiceTypeIds = [];
        for (let i = 0; i < tmpFilteredProgramTypes.length; i++) {
            tmpFilteredServiceTypeIds.push(tmpFilteredProgramTypes[i].ser_type_id);
        }

        const tmpFilteredServiceTypes = serviceTypes.filter((type) => {
            return tmpFilteredServiceTypeIds.includes(type.ser_type_id);
        })

        const tmpFilteredServiceStreamIds = [];
        for (let i = 0; i < tmpFilteredServiceTypes.length; i++) {
            tmpFilteredServiceStreamIds.push(tmpFilteredServiceTypes[i].ser_stream_id);
        }

        const tmpFilteredServiceStreams = serviceStreams.filter((stream) => {
            return tmpFilteredServiceStreamIds.includes(stream.ser_stream_id);
        });

        return tmpFilteredServiceStreams;
    }

    const filteringServiceTypes = (programsList) => {

        const programTypeIds = programsList.map((program) => program.prgm_type_id);

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

        const tmpFilteredServiceTypeIds = tmpFilteredProgramTypes.map((type) => type.ser_type_id);

        const tmpFilteredServiceTypes = serviceTypes.filter((type) => {
            return tmpFilteredServiceTypeIds.includes(type.ser_type_id);
        })

        return tmpFilteredServiceTypes;
    }

    const filteringProgramTypes = (programsList) => {

        const programTypeIds = programsList.map((program) => program.prgm_type_id);

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

        return tmpFilteredProgramTypes;
    }

    const filteringDivisions = (programList) => {

        const groupIds = [];
        for (let i = 0; i < programList.length; i++) {
            groupIds.push(programList[i].group_id);
        }

        const filteredGroups = groups.filter((group) => {
            return groupIds.includes(group.group_id);
        });

        const divisionIds = [];
        for (let i = 0; i < filteredGroups.length; i++) {
            divisionIds.push(filteredGroups[i].division_id);
        }

        const filteredDivisions = divisions.filter((division) => {
            return divisionIds.includes(division.division_id);
        })

        return filteredDivisions;
    }

    const filteringGroups = (programList) => {
        const groupIds = programList.map((program) => program.group_id);

        const tmpFilteredGroups = groups.filter((group) => {
            return groupIds.includes(group.group_id);
        });

        return tmpFilteredGroups;
    }

    //============================== Filter Dropdown ==============================================
    const ServiceStreamDropdown = () => {
        return (

            (isLoading === false) ?

                <DropdownSelect
                    name="Service Stream"
                    size='small'
                    value={serviceStreamValue}
                    onChange={onChangeServiceStream}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Service Stream'}> --All Service Stream-- </MenuItem>
                    {
                        filteredServiceStreams && filteredServiceStreams.map((serviceStream, index) => {
                            return <MenuItem key={index}
                                             value={serviceStream.ser_stream}>{serviceStream.ser_stream} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>


        )

    }

    const ServiceTypeDropdown = () => {
        return (

            (isLoading === false) ?

                <DropdownSelect
                    name="Service Type"
                    size='small'
                    value={serviceTypeValue}
                    onChange={onChangeServiceType}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Service Type'}> --All Service Type-- </MenuItem>
                    {
                        filteredServiceTypes && filteredServiceTypes.map((serviceType, index) => {
                            return <MenuItem key={index} value={serviceType.ser_type}>{serviceType.ser_type} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>
        )
    }

    const ProgramTypeDropdown = () => {
        return (

            (isLoading === false) ?

                <DropdownSelect
                    name="Program Type"
                    size='small'
                    value={programTypeValue}
                    onChange={onChangeProgramType}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Program Type'}> --All Program Type-- </MenuItem>
                    {
                        filteredProgramTypes && filteredProgramTypes.map((programType, index) => {
                            return <MenuItem key={index} value={programType.prgm_type}>{programType.prgm_type} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>
        )
    }

    const ProgramDropdown = () => {
        return (

            (isLoading === false) ?

                <DropdownSelect
                    name="Program"
                    size='small'
                    value={programValue}
                    onChange={onChangeProgram}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Program'}> --All Program-- </MenuItem>
                    {
                        localFilteredProgram && localFilteredProgram.map((program, index) => {
                            return <MenuItem key={index} value={program.program_nme}>{program.program_nme} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>
        )
    }

    const DivisionDropdown = () => {

        return (
            (isLoading === false) ?

                <DropdownSelect
                    name="Division"
                    size='small'
                    value={divisionValue}
                    onChange={onChangeDivision}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Divisions'}> --All Divisions-- </MenuItem>
                    {
                        filteredDivisions && filteredDivisions.map((division, index) => {
                            return <MenuItem key={index}
                                             value={division.division_name}> {division.division_name} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>
        )

    }

    const GroupDropdown = () => {

        return (

            (isLoading === false) ?

                <DropdownSelect
                    name="Group"
                    size='small'
                    value={groupValue}
                    onChange={onChangeGroup}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: 2,
                            horizontal: 0,
                        },
                        transformOrigin: {
                            vertical: -40,
                            horizontal: 0,
                        },
                    }}
                >
                    <MenuItem key={-1} value={'All Group'}> --All Group-- </MenuItem>
                    {
                        filteredGroups && filteredGroups.map((group, index) => {
                            return <MenuItem key={index} value={group.group_name}> {group.group_name} </MenuItem>
                        })
                    }

                </DropdownSelect>

                :

                <div>
                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                        <Skeleton style={dropDownStyle} height={30}/>
                    </SkeletonTheme>
                </div>
        )

    }

    //============================= End Filter Dropdown ===================================


    //================================= Filter Assistance Method ====================================

    const currentDToPG = (DValue) => {

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
            const division = divisions[i];
            if (DValue !== 'All Divisions') {
                if (division.division_name === DValue) {
                    selectedDivisionIds.push(division.division_id);
                }
            } else {
                selectedDivisionIds.push(division.division_id);
            }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (groupValue !== 'All Group') {
                if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
                    selectedGroupIds.push(group.group_id);
                }
            } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
                selectedGroupIds.push(group.group_id);
            }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;


    }

    const currentGToPG = (GValue) => {

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
            const division = divisions[i];
            if (divisionValue !== 'All Divisions') {
                if (division.division_name === divisionValue) {
                    selectedDivisionIds.push(division.division_id);
                }
            } else {
                selectedDivisionIds.push(division.division_id);
            }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (GValue !== 'All Group') {
                if (group.group_name === GValue && selectedDivisionIds.includes(group.division_id)) {
                    selectedGroupIds.push(group.group_id);
                }
            } else if (GValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
                selectedGroupIds.push(group.group_id);
            }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;
    }

    const currentDGToPG = () => {

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
            const division = divisions[i];
            if (divisionValue !== 'All Divisions') {
                if (division.division_name === divisionValue) {
                    selectedDivisionIds.push(division.division_id);
                }
            } else {
                selectedDivisionIds.push(division.division_id);
            }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            if (groupValue !== 'All Group') {
                if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
                    selectedGroupIds.push(group.group_id);
                }
            } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
                selectedGroupIds.push(group.group_id);
            }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;
    }

    const currentSSToPG = (SSValue) => {

        const selectedServiceStreamIds = [];
        for (let i = 0; i < serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if (SSValue !== 'All Service Stream') {
                if (serviceStream.ser_stream === SSValue) {
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            } else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for (let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if (serviceTypeValue !== 'All Service Type') {
                if (serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            } else if (serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for (let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if (programTypeValue !== 'All Program Type') {
                if (programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            } else if (programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const ssToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return ssToPG;
    }

    const currentSTToPG = (STValue) => {
        const selectedServiceStreamIds = [];
        for (let i = 0; i < serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if (serviceStreamValue !== 'All Service Stream') {
                if (serviceStream.ser_stream === serviceStreamValue) {
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            } else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for (let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if (STValue !== 'All Service Type') {
                if (serviceType.ser_type === STValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            } else if (STValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for (let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if (programTypeValue !== 'All Program Type') {
                if (programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            } else if (programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const stToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return stToPG;
    }

    const currentPTToPG = (PTValue) => {
        const selectedServiceStreamIds = [];
        for (let i = 0; i < serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if (serviceStreamValue !== 'All Service Stream') {
                if (serviceStream.ser_stream === serviceStreamValue) {
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            } else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for (let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if (serviceTypeValue !== 'All Service Type') {
                if (serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            } else if (serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for (let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if (PTValue !== 'All Program Type') {
                if (programType.prgm_type === PTValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            } else if (PTValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const ptToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return ptToPG;
    }

    const currentPSToPG = () => {
        const selectedServiceStreamIds = [];
        for (let i = 0; i < serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if (serviceStreamValue !== 'All Service Stream') {
                if (serviceStream.ser_stream === serviceStreamValue) {
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            } else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for (let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if (serviceTypeValue !== 'All Service Type') {
                if (serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            } else if (serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for (let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if (programTypeValue !== 'All Program Type') {
                if (programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            } else if (programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const psToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return psToPG;
    }

    //================================= End Filter Assistance Method ====================================


    //============================== Event Trigger Section ==================================

    // reset the filters
    const clear = () => {
        setServiceStreamValue('All Service Stream');
        setServiceTypeValue('All Service Type');
        setProgramTypeValue('All Program Type');
        setProgramValue('All Program');
        setDivisionValue('All Divisions');
        setGroupValue('All Group');

        mapFilterUsed(false);

        setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
        setFilteredServiceTypes(filteringServiceTypes(filteredPrograms));
        setFilteredProgramTypes(filteringProgramTypes(filteredPrograms));
        setLocalFilteredProgram(filteredPrograms);

        setFilteredDivisions(filteringDivisions(filteredPrograms));
        setFilteredGroups(filteringGroups(filteredPrograms));

        exportAdvanceFilteredPrograms(filteredPrograms);
        exportAdvanceFilteredSites(filteredSites);

    }

    const onChangeServiceStream = (e) => {

        setServiceStreamValue(e.target.value);


        const tmpDGFilteredProgram = currentDGToPG();
        const tmpPSFilteredProgram = currentSSToPG(e.target.value);

        if (e.target.value === 'All Service Stream') {


            const tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            const tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if (serviceTypeValue !== 'All Service Type') {

                const selectedServiceTypeIds = [];

                for (let i = 0; i < serviceTypes.length; i++) {
                    const serviceType = serviceTypes[i];
                    if (serviceType.ser_type === serviceTypeValue) {
                        selectedServiceTypeIds.push(serviceType.ser_type_id);
                    }
                }

                setFilteredProgramTypes(tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id)));

            }

            if (serviceTypeValue === 'All Service Type') {

                setFilteredProgramTypes(tmpFilteredProgramTypes);
            }


            const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
            let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);


            if (divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if (tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });

                }

            }

            if (groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if (tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);

        }

        if (e.target.value !== 'All Service Stream') {


            const tmpSelectedServiceStreamIds = [];
            for (let i = 0; i < serviceStreams.length; i++) {
                const serviceStream = serviceStreams[i];
                if (serviceStream.ser_stream === e.target.value) {
                    tmpSelectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }

            const tmpFilteredServiceTypeIds = [];
            for (let i = 0; i < serviceTypes.length; i++) {
                const serviceType = serviceTypes[i];
                if (tmpSelectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    tmpFilteredServiceTypeIds.push(serviceType.ser_type_id);
                }
            }

            const tmpFilteredProgramTypeIds = [];
            for (let i = 0; i < programTypes.length; i++) {
                const programType = programTypes[i];
                if (tmpFilteredServiceTypeIds.includes(programType.ser_type_id)) {
                    tmpFilteredProgramTypeIds.push(programType.prgm_type_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpFilteredProgramTypeIds.includes(program.prgm_type_id));

            const tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);

            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if (serviceTypeValue !== 'All Service Type') {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if (tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type'); // IF THERE IS NO RESULT THEN SET IT TO ALL...
                } else {
                    // NO RESULT FILTERING THE PT
                    const tmpServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => tmpServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            if (programTypeValue !== 'All Program Type') // SETTING THE THE PT
            {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);
            setFilteredProgramTypes(tmpFilteredProgramTypes);

            // division and group

            const tmpFilteredDivisions = filteringDivisions(tmpFilteredPrograms);
            let tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);


            if (divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if (tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });

                }

            }

            if (groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if (tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);
        }

    }

    const onChangeServiceType = (e) => {

        setServiceTypeValue(e.target.value);

        // checking for the division adn group first.... 

        // if divisions and group are exist then filtering program... 

        const tmpDGFilteredProgram = currentDGToPG();
        const tmpPSFilteredProgram = currentSTToPG(e.target.value);

        // else if division and group are not exist then 

        if (e.target.value === 'All Service Type') {

            //checking whether the division or group is selected...if selected the program should be additional filtered....

            if (serviceStreamValue === 'All Service Stream') {

                setFilteredProgramTypes(filteringProgramTypes(tmpDGFilteredProgram));
            }

            if (serviceStreamValue !== 'All Service Stream') {

                const serviceStreamIds = [];
                for (let i = 0; i < serviceStreams.length; i++) {
                    const serviceStream = serviceStreams[i];
                    if (serviceStream.ser_stream === serviceStreamValue) {
                        serviceStreamIds.push(serviceStream.ser_stream_id);
                    }
                }


                const tmpFilteredServiceTypes = serviceTypes.filter((serviceType) => serviceStreamIds.includes(serviceType.ser_stream_id));

                const serviceTypeIds = tmpFilteredServiceTypes.map((serviceType) => serviceType.ser_type_id);

                const tmpFilteredProgramTypes = programTypes.filter((programType) => serviceTypeIds.includes(programType.ser_type_id));

                const programTypeIds = tmpFilteredProgramTypes.map((programType) => programType.prgm_type_id);

                const tmpFilteredPrograms = tmpDGFilteredProgram.filter((program) => programTypeIds.includes(program.prgm_type_id));

                setFilteredProgramTypes(filteringProgramTypes(tmpFilteredPrograms));
            }


            const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
            let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);

            if (divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if (tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });

                }

            }

            if (groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if (tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);

        }

        if (e.target.value !== 'All Service Type') {

            //change happen
            // the provided options should already be filtered by the division and group
            // the service stream will need to change at here...
            // just need to set the reset of the program type & program
            // because the stream will only provided the available service type

            const selectedServiceTypeIds = [];
            for (let i = 0; i < serviceTypes.length; i++) {
                const serviceType = serviceTypes[i];
                if (serviceType.ser_type === e.target.value) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }

            const tmpFilteredProgramTypeIds = [];
            for (let i = 0; i < programTypes.length; i++) {
                const programType = programTypes[i];
                if (selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    tmpFilteredProgramTypeIds.push(programType.prgm_type_id);
                }
            }


            const tmpFilteredPrograms = filteredPrograms.filter((program) => {
                return tmpFilteredProgramTypeIds.includes(program.prgm_type_id);
            })

            // setServiceStreams(filteringServiceStreams(tmpFilteredPrograms)); // more restriction...
            const tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if (programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);

            // need to check for both division and group

            const tmpFilteredDivisions = filteringDivisions(tmpFilteredPrograms);
            let tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);


            if (divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if (tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });

                }

            }

            if (groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if (tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);

        }


    }

    const onChangeProgramType = (e) => {

        setProgramTypeValue(e.target.value);

        const tmpPSFilteredProgram = currentPTToPG(e.target.value);


        const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
        let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);


        if (divisionValue !== 'All Divisions') {

            const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
            if (tmpDivision.length <= 0) {
                setDivisionValue('All Divisions');
            } else {
                const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);
                tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                    return tmpSelectedDivisionIds.includes(group.division_id);
                });

            }

        }

        if (groupValue !== 'All Group') {
            const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
            if (tmpGroup.length <= 0) {
                setGroupValue('All Group');
            }
        }

        setFilteredDivisions(tmpFilteredDivisions);
        setFilteredGroups(tmpFilteredGroups);

    }

    const onChangeProgram = (e) => {
        setProgramValue(e.target.value);
    }

    const onChangeDivision = (e) => {

        setDivisionValue(e.target.value);

        // need to use both use the data of the upper table to set division and group
        // use the data that seted on the down table to set the upper table (program type and ....)

        const tmpPSFilteredProgram = currentPSToPG();
        const tmpDGFilteredProgram = currentDToPG(e.target.value);

        if (e.target.value === 'All Divisions') {
            const tmpFilteringGroups = filteringGroups(tmpPSFilteredProgram);
            setFilteredGroups(tmpFilteringGroups);

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpDGFilteredProgram);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            if (serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if (tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if (serviceTypeValue !== 'All Service Type') {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if (tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if (programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);

        }

        if (e.target.value !== 'All Divisions') {

            const tmpSelectedDivisionIds = [];
            for (let i = 0; i < divisions.length; i++) {
                const division = divisions[i];
                if (division.division_name === e.target.value) {
                    tmpSelectedDivisionIds.push(division.division_id);
                }
            }

            const tmpSelectedGroupIds = [];
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if (tmpSelectedDivisionIds.includes(group.division_id)) {
                    tmpSelectedGroupIds.push(group.group_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpSelectedGroupIds.includes(program.group_id));

            const tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);

            if (groupValue === 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if (tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredGroups(tmpFilteredGroups);

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpFilteredPrograms);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if (serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if (tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if (serviceTypeValue !== 'All Service Type') {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if (tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if (programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);
        }

    };

    const onChangeGroup = (e) => {

        setGroupValue(e.target.value);

        const tmpDGFilteredProgram = currentGToPG(e.target.value);

        if (e.target.value === 'All Group') {

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpDGFilteredProgram);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            if (serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if (tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if (serviceTypeValue !== 'All Service Type') {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if (tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if (programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);
        }

        if (e.target.value !== 'All Group') {


            const tmpSelectedGroupIds = [];
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if (group.group_name === e.target.value) {
                    tmpSelectedGroupIds.push(group.group_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpSelectedGroupIds.includes(program.group_id));

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpFilteredPrograms);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if (serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if (tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if (serviceTypeValue !== 'All Service Type') {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if (tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if (programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if (tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);


        }

    }


    const openFilterPopup = () => {
        setSMFilterPopup(true);
        document.body.style.overflow = 'hidden';
    }

    const closeFilterPopup = () => {
        setSMFilterPopup(false);
        document.body.style.overflow = 'auto';
    }

    //============================== End Event Trigger Section ==================================


    //============================ Apply Filter ====================================
    const applyingFilter = () => {

        let tmpAdvancedFilteredPrograms = advancedFilteredPrograms;
        // console.log(tmpAdvancedFilteredPrograms);

        if (programValue !== 'All Program') {
            tmpAdvancedFilteredPrograms = tmpAdvancedFilteredPrograms.filter((program) => program.program_nme === programValue);
        }

        const sitesIds = [];
        for (let i = 0; i < tmpAdvancedFilteredPrograms.length; i++) {
            sitesIds.push(tmpAdvancedFilteredPrograms[i].site_id);
        }

        const tmpAdvanceFilteredSites = filteredSites.filter((site) => sitesIds.includes(site.site_id));


        exportAdvanceFilteredPrograms(tmpAdvancedFilteredPrograms);
        exportAdvanceFilteredSites(tmpAdvanceFilteredSites);


    }


    const ProgramServiceFilter = () => {

        return (

            <ProgramDropDownContainer>
                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Service Stream</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <ServiceStreamDropdown></ServiceStreamDropdown>
                    }
                </SelectDiv>

                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Service Type</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <ServiceTypeDropdown></ServiceTypeDropdown>

                    }
                </SelectDiv>

                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Program Type</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <ProgramTypeDropdown></ProgramTypeDropdown>
                    }
                </SelectDiv>

                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Program</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <ProgramDropdown></ProgramDropdown>

                    }
                </SelectDiv>

            </ProgramDropDownContainer>
        )
    };

    const GroupDivisionFilter = () => {

        return (

            <ProgramDropDownContainer>

                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Division</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <DivisionDropdown></DivisionDropdown>
                    }
                </SelectDiv>

                <SelectDiv>
                    <InputLabel style={{fontSize: '16px'}}>Group</InputLabel>
                    {
                        (loadingSignal) ?
                            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                <Skeleton style={dropDownStyle} height={37}/>
                            </SkeletonTheme>
                            :
                            <GroupDropdown></GroupDropdown>

                    }
                </SelectDiv>
            </ProgramDropDownContainer>
        )
    };

    const onClickProgramServiceNav = () => {
        setClickedProgramService(true);
        setClickedGroupDivision(false);
    }

    const onClickGroupDivisionNav = () => {
        setClickedProgramService(false);
        setClickedGroupDivision(true);
    }


    // Main Return of the APP
    return (
        <MapFilterRowContainer>
            <SMFilterButton style={{display: setSMFilterPopup ? 'none' : 'block'}} disableRipple
                            endIcon={<ArrowForwardIosIcon style={{padding: '0', margin: '0'}}/>}
                            onClick={openFilterPopup}>Search Filter</SMFilterButton>
            <LabelContainer>
                <FilterLabel>Map Filter</FilterLabel>
                {/*<InputLabel style={textStyle}>Map Filter</InputLabel>*/}
            </LabelContainer>
            <FilterContainer>
                <ProgramDropDownContainer>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Service Stream</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <ServiceStreamDropdown></ServiceStreamDropdown>
                        }
                    </SelectDiv>
                </ProgramDropDownContainer>
                <ProgramDropDownContainer>
                    <BreakingLine2></BreakingLine2>
                </ProgramDropDownContainer>
                <ProgramDropDownContainer>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Service Type</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <ServiceTypeDropdown></ServiceTypeDropdown>

                        }
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Division</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <DivisionDropdown></DivisionDropdown>
                        }
                    </SelectDiv>
                </ProgramDropDownContainer>
                <ProgramDropDownContainer>
                    <BreakingLine2></BreakingLine2>
                    <BreakingLine2></BreakingLine2>
                </ProgramDropDownContainer>
                <ProgramDropDownContainer>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program Type</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <ProgramTypeDropdown></ProgramTypeDropdown>
                        }
                    </SelectDiv>

                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Group</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <GroupDropdown></GroupDropdown>

                        }
                    </SelectDiv>
                </ProgramDropDownContainer>

                <ProgramDropDownContainer style={{justifyContent: "center", alignItems: "center"}}>
                    <Arrow></Arrow>
                </ProgramDropDownContainer>

                <ProgramDropDownContainer style={{justifyContent: "center", alignItems: "start"}}>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program</InputLabel>
                        {
                            (loadingSignal) ?
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={dropDownStyle} height={37}/>
                                </SkeletonTheme>
                                :
                                <ProgramDropdown></ProgramDropdown>

                        }
                    </SelectDiv>
                </ProgramDropDownContainer>
                <ButtonContainer>
                    <ResetButton onClick={clear} style={(loadingSignal) ? {pointerEvents: 'none'} : {}}>
                        <ClearIcon style={{fontSize: '16px', marginRight: '5px', color: '#A20066'}}></ClearIcon>
                        <ButtonLabel style={{color: '#A20066'}}>Reset Filter</ButtonLabel>
                    </ResetButton>
                </ButtonContainer>
            </FilterContainer>

            <AnimatedModalContent
                appElement={document.getElementById('root')}
                isOpen={smFilterPopup}
                contentLabel="Filter Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(91,91,91,0.28)', // Set the desired overlay background color
                    },
                    content: {
                        width: '90vw', // Set the desired width
                        height: '55vh', // Set the desired height
                        maxHeight: '80vh',
                        margin: 'auto', // Center the modal horizontally
                        borderRadius: '15px',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    },
                }}
            >
                <SMMapFilterContainer>
                    <SMMapFilterHeader>
                        <SMMapFilterHeaderLeft>
                            <h2 style={{margin: '0', padding: '0', color: 'white'}}>Search Filter</h2>
                        </SMMapFilterHeaderLeft>
                        <SMMapFilterHeaderRight>
                            <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}
                                    disableRipple onClick={closeFilterPopup}>
                                <CustomClearIcon style={{fontSize: '30px'}}></CustomClearIcon>
                            </Button>
                        </SMMapFilterHeaderRight>
                    </SMMapFilterHeader>

                    <ColumnFilterContainer>
                        <SMFilterNavigationContainer>

                            {
                                (clickedProgramService === true && clickedGroupDivision === false) ?
                                    <>
                                        <SMFilterNavigationButtonActive variant="text" disableRipple
                                                                        onClick={onClickProgramServiceNav}> Service /
                                            Program </SMFilterNavigationButtonActive>
                                        <SMFilterNavigationButtonDefault variant="text" disableRipple
                                                                         onClick={onClickGroupDivisionNav}> Group /
                                            Division</SMFilterNavigationButtonDefault>
                                    </>
                                    :
                                    <>
                                        <SMFilterNavigationButtonDefault variant="text" disableRipple
                                                                         onClick={onClickProgramServiceNav}> Service /
                                            Program </SMFilterNavigationButtonDefault>
                                        <SMFilterNavigationButtonActive variant="text" disableRipple
                                                                        onClick={onClickGroupDivisionNav}> Group /
                                            Division</SMFilterNavigationButtonActive>
                                    </>
                            }
                        </SMFilterNavigationContainer>
                        <SMFilterContainer>
                            {
                                (clickedProgramService === true && clickedGroupDivision === false) ?
                                    <ProgramServiceFilter></ProgramServiceFilter> :
                                    <GroupDivisionFilter></GroupDivisionFilter>
                            }
                        </SMFilterContainer>

                        <ButtonContainer>
                            <ResetButton onClick={clear} style={(loadingSignal) ? {pointerEvents: 'none'} : {}}>
                                <ClearIcon style={{fontSize: '16px', marginRight: '5px', color: '#A20066'}}></ClearIcon>
                                <ButtonLabel style={{color: '#A20066'}}>Reset Filter</ButtonLabel>
                            </ResetButton>
                        </ButtonContainer>
                    </ColumnFilterContainer>
                </SMMapFilterContainer>


            </AnimatedModalContent>


        </MapFilterRowContainer>


    )
}

export default MapFilter;