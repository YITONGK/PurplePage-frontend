import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {SiteEditContainer, SiteEditH1, SiteEditForm, SiteEditDiv} from './SiteEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const SiteEdit = (props) => {
    // initial values
    const initialValues = {
        id: '',
        lat: '',
        lng: '',
        street_nbr: '',
        street_name: '',
        suburb: '',
        state: '',
        postcode: '',
        status: ''
    }

    // useState hooks
    const [values, setValues] = useState(initialValues);

    const {id} = useParams();

    useEffect(() => {
        getSite();
    }, []);

    /* get a site from the backend based on the id and display it */
    const getSite = async () => {
        const BASE_URL = "https://purplepagesbackend.vt.uniting.org";
        await axios.get(BASE_URL + '/site/' + id, {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data;
            setValues({
                id: data.id,
                lat: data.lat,
                lng: data.lng,
                street_nbr: data.street_nbr,
                street_name: data.street_name,
                suburb: data.suburb,
                state: data.state,
                postcode: data.postcode,
                status: data.status
            })
        })
    }

    /* Handle any changes to the input text fields
     *
     * @param e Event
     */
    const onChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    /* Handle saving the changes to text field and sending it to the Backend
     *
     * @param e Event
     */
    const onSubmit = async (e) => {
        e.preventDefault();
        const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
        const url = BASE_URL + '/site/edit';
        await axios.post(url, {...values}).then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Site has been successfully updated!',
                icon: 'success',
                showClass: {
                    icon: ''
                }
            });
            setTimeout(() => {
                window.location = '/site/' + id;
            }, 1500);
        })
    }

    /* Handle cancelling the edit */
    const onCancel = () => {
        window.location = '/site/' + id;
    }

    // styles
    const textFieldStyle = {minWidth: "200px", marginLeft: "1%"};

    return (
        <SiteEditContainer>
            <SiteEditH1>Edit Site</SiteEditH1>
            <SiteEditForm onSubmit={onSubmit}>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <SiteEditDiv>
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
                </SiteEditDiv>
                <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
                <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
            </SiteEditForm>
        </SiteEditContainer>
    )
}

export default SiteEdit;