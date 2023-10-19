import axios from "axios";
import React, { useState, useEffect } from 'react';
import { GroupCreateContainer, GroupCreateH1, GroupCreateForm, GroupCreateDiv } from "./GroupCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const GroupCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    group_name: '',
    eo: '',
    division_name: '',
    status: ''
  });
  const [divisionList, setDivisionList] = useState([]);

  // useEffect
  useEffect(() => {
    getDivisions();
  }, []);

  // handle the change for the states
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  /* get list of divisions from the backend and display them */
  const getDivisions = async () => {
    const BASE_URL = 'https://api.wernmachine.art';
    await axios.get(BASE_URL + '/division').then(res => {
      const list = res.data;
      setDivisionList(list);
    })
  }

  // handle submitting the data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'https://api.wernmachine.art';
    const url = BASE_URL + '/group';
    const { group_name, eo, division_name, status } = values;
    await axios.post(url, {group_name, eo, division_name, status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Group has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/group';
      }, 1500);
    })
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
    <GroupCreateContainer>
      <GroupCreateH1>
        Add Group
      </GroupCreateH1>
      <GroupCreateForm onSubmit={onSubmit}>
        <GroupCreateDiv>
          Group name:
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
        </GroupCreateDiv>
        <GroupCreateDiv>
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
        </GroupCreateDiv>
        <GroupCreateDiv>
          Division name:
          <DivisionSelect />
        </GroupCreateDiv>
        <GroupCreateDiv>
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
        </GroupCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </GroupCreateForm>
    </GroupCreateContainer>
  )
}

export default GroupCreate;