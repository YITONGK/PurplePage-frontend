import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ProgramCreateContainer, ProgramCreateH1, ProgramCreateForm, ProgramCreateDiv } from "./ProgramCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ProgramCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    program_nme: '',
    prgm_mgr: '',
    prgm_type: '',
    group_name: '',
    prgm_status: ''
  });
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  // useEffect
  useEffect(() => {
    getProgramTypes();
    getGroups();
  }, []);

  // handle the change for the states
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'https://api.wernmachine.art';
    await axios.get(BASE_URL + '/programtype').then(res => {
      const list = res.data[0];
      setProgramTypeList(list);
    })
  }

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'https://api.wernmachine.art';
    await axios.get(BASE_URL + '/group').then(res => {
      const list = res.data[0];
      setGroupList(list);
    })
  }

  // handle submitting the data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'https://api.wernmachine.art';
    const url = BASE_URL + '/program';
    const { program_nme, prgm_mgr, prgm_type, group_name, prgm_status } = values;
    await axios.post(url, {program_nme, prgm_mgr, prgm_type, group_name, prgm_status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Program has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/program';
      }, 1500);
    })
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  // program type dropdown
  const ProgramTypeSelect = () => {
    return (
      <Select
        name='prgm_type'
        size='small'
        style={textFieldStyle}
        value={values.prgm_type}
        onChange={onChange}
        required
      >
        {programTypeList.map((programType, index) => (
          <MenuItem
            key={index}
            value={programType.prgm_type}
          >
            {programType.prgm_type}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // group dropdown
  const GroupSelect = () => {
    return (
      <Select
        name='group_name'
        size='small'
        style={textFieldStyle}
        value={values.group_name}
        onChange={onChange}
        required
      >
        {groupList.map((group, index) => (
          <MenuItem
            key={index}
            value={group.group_name}
          >
            {group.group_name}
          </MenuItem>
        ))}
      </Select>
    )
  }

  return (
    <ProgramCreateContainer>
      <ProgramCreateH1>
        Add Program
      </ProgramCreateH1>
      <ProgramCreateForm onSubmit={onSubmit}>
        <ProgramCreateDiv>
          Program name:
          <TextField
            name="program_nme"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.program_nme}
            onChange={onChange}
            required
          />
        </ProgramCreateDiv>
        <ProgramCreateDiv>
          Program manager:
          <TextField
            name="prgm_mgr"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.prgm_mgr}
            onChange={onChange}
            required
          />
        </ProgramCreateDiv>
        <ProgramCreateDiv>
          Program type:
          <ProgramTypeSelect />
        </ProgramCreateDiv>
        <ProgramCreateDiv>
          Group:
          <GroupSelect />
        </ProgramCreateDiv>
        <ProgramCreateDiv>
          Status:
          <Select
            name='prgm_status'
            size='small'
            style={textFieldStyle}
            value={values.prgm_status}
            onChange={onChange}
            required
          >
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'Inactive'}>Inactive</MenuItem>
          </Select>
        </ProgramCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </ProgramCreateForm>
    </ProgramCreateContainer>
  )
}

export default ProgramCreate;