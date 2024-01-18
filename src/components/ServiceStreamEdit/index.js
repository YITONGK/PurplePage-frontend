import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    ServiceStreamEditContainer,
    ServiceStreamEditH1,
    ServiceStreamEditForm,
    ServiceStreamEditDiv
} from './ServiceStreamEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const ServiceStreamEdit = (props) => {
    // initial values
    const initialValues = {
        ser_stream_id: '',
        ser_stream: '',
        status: ''
    }

    // useState hooks
    const [values, setValues] = useState(initialValues);

    const {id} = useParams();

    useEffect(() => {
        getServiceStream();
    }, []);

    /* get a service stream from the backend based on the id and display it */
    const getServiceStream = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        await axios.get(BASE_URL + '/servicestream/' + id, {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data;
            setValues({
                ser_stream_id: data.ser_stream_id,
                ser_stream: data.ser_stream,
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
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        const url = BASE_URL + '/servicestream/edit';
        await axios.post(url, {...values}).then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Service Stream has been successfully updated!',
                icon: 'success',
                showClass: {
                    icon: ''
                }
            });
            setTimeout(() => {
                window.location = '/servicestream/' + id;
            }, 1500);
        })
    }

    /* Handle cancelling the edit */
    const onCancel = () => {
        window.location = '/servicestream/' + id;
    }

    // styles
    const textFieldStyle = {minWidth: "200px", marginLeft: "1%"};

    return (
        <ServiceStreamEditContainer>
            <ServiceStreamEditH1>Edit Service Stream</ServiceStreamEditH1>
            <ServiceStreamEditForm onSubmit={onSubmit}>
                <ServiceStreamEditDiv>
                    Service stream:
                    <TextField
                        name="ser_stream"
                        type="text"
                        variant="outlined"
                        size="small"
                        style={textFieldStyle}
                        value={values.ser_stream}
                        onChange={onChange}
                        required
                    />
                </ServiceStreamEditDiv>
                <ServiceStreamEditDiv>
                    Status:
                    <Select
                        name='status'
                        size='small'
                        style={textFieldStyle}
                        value={values.status}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value={'active'}>active</MenuItem>
                        <MenuItem value={'inactive'}>inactive</MenuItem>
                    </Select>
                </ServiceStreamEditDiv>
                <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
                <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
            </ServiceStreamEditForm>
        </ServiceStreamEditContainer>
    )
}

export default ServiceStreamEdit;