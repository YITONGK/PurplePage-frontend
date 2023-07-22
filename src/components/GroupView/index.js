import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GroupViewContainer, GroupViewH1, GroupViewP } from './GroupViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const GroupView = () => {
  // useState hooks
  const [group, setGroup] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getGroup();
  }, []);

  /* get a group from the backend based on the id and display it */
  const getGroup = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/group/' + id).then(res => {
      const data = res.data[0];
      data['division_name'] = res.data[1];
      setGroup(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/group/' + id + '/edit';
  }

  /* delete the group */
  const deleteGroup = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this group?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        icon: ''
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(BASE_URL + "/group/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Group has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/group';
          }, 1500);
        })
      }
    })
  }

  return (
    <GroupViewContainer>
      <GroupViewH1>{group.group_name}</GroupViewH1>
      <GroupViewP>Executive Officer: {group.eo}</GroupViewP>
      <GroupViewP>Division: {group.division_name}</GroupViewP>
      <GroupViewP>Status: {group.status}</GroupViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteGroup}>Delete</Button>
    </GroupViewContainer>
  )
}

export default GroupView;