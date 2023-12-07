import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { mkConfig, generateCsv, download } from "export-to-csv";
import Button from '@mui/material/Button';
import {ExportInfoContainer, ExportInfoText} from './ExportCSVElements';
import WarningIcon from "@mui/icons-material/Warning";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const ExportCSV = ({advanceFilteredPrograms, advanceFilteredSites, groupsList, divisionList, serviceStreamList, serviceTypeList, programTypeList}) => {

    const [csvData, setCsvData] = useState([{"Data": 'Unknown'}]);


    useEffect(() => {

        const CSVData = advanceFilteredPrograms.map(program => {

            const tmpProgramType = programTypeList.find(type => type.prgm_type_id === program.prgm_type_id);

            const tmpServiceTypeId = (tmpProgramType) ? tmpProgramType.ser_type_id : null;
            const tmpServiceType = (tmpServiceTypeId) ? serviceTypeList.find(type => type.ser_type_id === tmpServiceTypeId) : null;

            const tmpServiceStreamId = (tmpServiceType) ? tmpServiceType.ser_stream_id : null;
            const tmpServiceStream = (tmpServiceStreamId) ? serviceStreamList.find(stream => stream.ser_stream_id === tmpServiceStreamId) : null;

            const tmpGroup = groupsList.find(group => group.group_id === program.group_id);

            const tmpDivisionId = (tmpGroup)? tmpGroup.division_id : null;
            const tmpDivision = (tmpDivisionId) ? divisionList.find((division) => division.division_id === tmpDivisionId) : null;

            const tmpSite = advanceFilteredSites.find((site) => site.site_id === program.site_id);




            return {
                Title: program.title,
                'Service Stream': (tmpServiceStream) ? tmpServiceStream.ser_stream : 'None',
                'Service Type' : (tmpServiceStream) ? tmpServiceType.ser_type : 'None',
                'Program Type': (tmpProgramType) ? tmpProgramType.prgm_type : 'None',
                'Division': (tmpDivision) ? tmpDivision.division_name : 'None',
                'Cluster/Group': (tmpGroup) ? tmpGroup.group_name : 'None',
                'Program Name': program.program_nme,
                'Service Basic Description': program.service_desc,
                'Program Manager': program.prgm_mgr,
                'Program Contact Number': program.prgm_cont_no,
                'Group Manager/Executive Officer': (tmpGroup) ? tmpGroup.eo : 'None',
                'General Manager': (tmpDivision) ? tmpDivision.gm : 'None',
                'Site ID': (tmpSite)? tmpSite.site_id: 'None',
                'Long Form Address': (tmpSite && tmpSite.street_nbr && tmpSite.street_name && tmpSite.suburb && tmpSite.state && tmpSite.postcode) ?
                        `${tmpSite.street_nbr} ${tmpSite.street_name}, ${tmpSite.suburb}, ${tmpSite.state}, ${tmpSite.postcode}` : 'None',
                'State' : (tmpSite)? tmpSite.state : 'None',
                'Postcode' : (tmpSite)? tmpSite.postcode: 'None',
                'Site Contact' : (tmpSite)? tmpSite.site_contact_name: 'None',
                'Site Contact Number' : (tmpSite)? tmpSite.site_contact_nbr: 'None',
                'Site Manager Contact Number' : (tmpSite)? tmpSite.site_mgr_cont_nbr: 'None',
                'Site Opening Time': (tmpSite && tmpSite.site_open) ? tmpSite.site_open : 'None',
                'Site Closing Time' : (tmpSite && tmpSite.site_close) ? tmpSite.site_close : 'None',
                'Local Government Area': (tmpSite)? tmpSite.lga : 'None',
                'Department of Families, Fairness and Housing' : (tmpSite)? tmpSite.dffh_area : 'None'
            }
        });

        setCsvData(CSVData);

    },[advanceFilteredPrograms, advanceFilteredSites])

    // mkConfig merges your options with the defaults
    // and returns WithDefaults<ConfigOptions>
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}${month}${year}`;
    const fileName = `PurplePage_Filtered_ServiceDirectory_${formattedDate}`;

    const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: fileName });


    // Converts your Array<Object> to a CsvOutput string based on the configs
    const csv = generateCsv(csvConfig)(csvData);

    const onClickDownload = () => {
        download(csvConfig)(csv);
    }

    return (
        <ExportInfoContainer>
            <SaveAltIcon sx={{color: '#3d3d3d'}} />
            <ExportInfoText>
                Require to export data?{' '}
                <a onClick={onClickDownload} style={{ color: '#3d3d3d', textDecoration: 'underline' }}>
                    Please click here to export your filtered data to CSV format.
                </a>
            </ExportInfoText>
        </ExportInfoContainer>
    )

}

export default ExportCSV;