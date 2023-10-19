import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramEditContainer, ProgramEditH1, ProgramEditForm, ProgramEditDiv } from './ProgramEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ProgramEdit = (props) => {
  // initial values
  const initialValues = {
    title: '',
    program_nme: '',
    prgm_mgr: '',
    prgm_type: '',
    group_name: '',
    prgm_status: ''
  }

  // useState hooks
  const [values, setValues] = useState(initialValues);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    getProgram();
    getProgramTypes();
    getGroups();
  }, []);

  /* get a program from the backend based on the id and display it */
  const getProgram = async () => {
    const BASE_URL = "https://purplepage-uniting.azurewebsites.net";
    await axios.get(BASE_URL + '/program/' + id).then(res => {
      const data = res.data[0];
      const prgm_type = res.data[1];
      const group_name = res.data[2];
      setValues({
        title: data.title,
        program_nme: data.program_nme,
        prgm_mgr: data.prgm_mgr,
        prgm_type: prgm_type,
        group_name: group_name,
        prgm_status: data.prgm_status
      });
    })
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    await axios.get(BASE_URL + '/programtype').then(res => {
      const list = res.data[0];
      setProgramTypeList(list);
    })
  }

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    await axios.get(BASE_URL + '/group').then(res => {
      const list = res.data[0];
      setGroupList(list);
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
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    const url = BASE_URL + '/program/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Program has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/program/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/program/' + id;
  }

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

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <ProgramEditContainer>
      <ProgramEditH1>Edit Program</ProgramEditH1>
      <ProgramEditForm onSubmit={onSubmit}>
        <ProgramEditDiv>
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
        </ProgramEditDiv>
        <ProgramEditDiv>
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
        </ProgramEditDiv>
        <ProgramEditDiv>
          Program type:
          <ProgramTypeSelect />
        </ProgramEditDiv>
        <ProgramEditDiv>
          Group name:
          <GroupSelect />
        </ProgramEditDiv>
        <ProgramEditDiv>
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
        </ProgramEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </ProgramEditForm>
    </ProgramEditContainer>
  )
}

export default ProgramEdit;