import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GroupEditContainer, GroupEditH1, GroupEditForm, GroupEditDiv } from './GroupEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const GroupEdit = (props) => {
  // initial values
  const initialValues = {
    group_id: '',
    group_name: '',
    eo: '',
    division_name: '',
    status: ''
  }

  // useState hooks
  const [values, setValues] = useState(initialValues);
  const [divisionList, setDivisionList] = useState([]);

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    getGroup();
    getDivisions();
  }, []);

  /* get a group from the backend based on the id and display it */
  const getGroup = async () => {
    const BASE_URL = "https://myapi.hhzhu.art";
    await axios.get(BASE_URL + '/group/' + id).then(res => {
      const data = res.data[0];
      const division_name = res.data[1];
      setValues({
        group_id: data.group_id,
        group_name: data.group_name,
        eo: data.eo,
        division_name: division_name,
        status: data.status
      });
    })
  }

  /* get list of divisions from the backend and display them */
  const getDivisions = async () => {
    const BASE_URL = 'https://myapi.hhzhu.art';
    await axios.get(BASE_URL + '/division').then(res => {
      const list = res.data;
      setDivisionList(list);
    })
  }

  /* Handle any changes to the input text fields
   *
   * @param e Event
   */
  const onChange = (e) => {
    const { name, value } = e.target;
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
    const BASE_URL = 'https://myapi.hhzhu.art';
    const url = BASE_URL + '/group/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Group has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/group/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/group/' + id;
  }

  // division dropdown
  const DivisionSelect = () => {
    return (
      <Select
        name='division_name'
        size='small'
        style={textFieldStyle}
        value={values.division_name}
        onChange={onChange}
        required
      >
        {divisionList.map((division, index) => (
          <MenuItem
            key={index}
            value={division.division_name}
          >
            {division.division_name}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <GroupEditContainer>
      <GroupEditH1>Edit Group</GroupEditH1>
      <GroupEditForm onSubmit={onSubmit}>
        <GroupEditDiv>
          Name:
          <TextField
            name="group_name"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.group_name}
            onChange={onChange}
            required
          />
        </GroupEditDiv>
        <GroupEditDiv>
          Executive Officer:
          <TextField
            name="eo"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.eo}
            onChange={onChange}
            required
          />
        </GroupEditDiv>
        <GroupEditDiv>
          Division name:
          <DivisionSelect />
        </GroupEditDiv>
        <GroupEditDiv>
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
        </GroupEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </GroupEditForm>
    </GroupEditContainer>
  )
}

export default GroupEdit;