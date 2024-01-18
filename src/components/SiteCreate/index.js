import axios from "axios";
import React, {useState} from 'react';
import {SiteCreateContainer, SiteCreateH1, SiteCreateForm, SiteCreateDiv} from "./SiteCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const SiteCreate = () => {
    // useState hooks
    const [values, setValues] = useState({
        lat: '',
        lng: '',
        street_nbr: '',
        street_name: '',
        suburb: '',
        state: '',
        postcode: '',
        status: ''
    });

    // handle the change for the states
    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    // handle submitting the data to the backend
    const onSubmit = async (e) => {
        e.preventDefault();
        const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
        const url = BASE_URL + '/site';
        const {lat, lng, street_nbr, street_name, suburb, state, postcode, status} = values;
        await axios.post(url, {lat, lng, street_nbr, street_name, suburb, state, postcode, status}).then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Site has been successfully created!',
                icon: 'success',
                showClass: {
                    icon: ''
                }
            });
            setTimeout(() => {
                window.location = '/site';
            }, 1500);
        })
    }

    // styles
    const textFieldStyle = {minWidth: "200px", marginLeft: "1%"};

    return (
        <SiteCreateContainer>
            <SiteCreateH1>
                Add Site
            </SiteCreateH1>
            <SiteCreateForm onSubmit={onSubmit}>
                <SiteCreateDiv>
                    Street number:
                    <TextField
                        name="street_nbr"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={textFieldStyle}
                        value={values.street_nbr}
                        onChange={onChange}
                        required
                    />
                </SiteCreateDiv>
                <SiteCreateDiv>
                    Street name:
                    <TextField
                        name="street_name"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={textFieldStyle}
                        value={values.street_name}
                        onChange={onChange}
                        required
                    />
                </SiteCreateDiv>
                <SiteCreateDiv>
                    Suburb:
                    <TextField
                        name="suburb"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={textFieldStyle}
                        value={values.suburb}
                        onChange={onChange}
                        required
                    />
                </SiteCreateDiv>
                <SiteCreateDiv>
                    State:
                    <Select
                        name='state'
                        size='small'
                        style={textFieldStyle}
                        value={values.state}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value={'ACT'}>ACT</MenuItem>
                        <MenuItem value={'NSW'}>NSW</MenuItem>
                        <MenuItem value={'NT'}>NT</MenuItem>
                        <MenuItem value={'QLD'}>QLD</MenuItem>
                        <MenuItem value={'SA'}>SA</MenuItem>
                        <MenuItem value={'TAS'}>TAS</MenuItem>
                        <MenuItem value={'VIC'}>VIC</MenuItem>
                        <MenuItem value={'WA'}>WA</MenuItem>
                    </Select>
                </SiteCreateDiv>
                <SiteCreateDiv>
                    Postcode:
                    <TextField
                        name="postcode"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={textFieldStyle}
                        value={values.postcode}
                        onChange={onChange}
                        required
                    />
                </SiteCreateDiv>
                <SiteCreateDiv>
                    Status:
                    <Select
                        name='status'
                        size='small'
                        style={textFieldStyle}
                        value={values.status}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value={'Active'}>Active</MenuItem>
                        <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    </Select>
                </SiteCreateDiv>
                <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
            </SiteCreateForm>
        </SiteCreateContainer>
    )
}

export default SiteCreate;