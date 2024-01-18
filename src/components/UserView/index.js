import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {UserViewContainer, UserViewH1, UserViewP} from './UserViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const UserView = () => {
    // useState hooks
    const [user, setUser] = useState({});

    // useEffect
    useEffect(() => {
        getUser();
    }, []);

    const {id} = useParams();

    /* get a user from the backend based on the id and display it */
    const getUser = async () => {
        const BASE_URL = "https://purplepagesbackend.vt.uniting.org";
        await axios.get(BASE_URL + '/users/' + id, {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data;
            setUser(data);
        })
    }

    /* Handle going to edit page */
    const edit = () => {
        window.location = '/users/' + id + '/edit';
    }

    /* delete the user */
    const deleteUser = () => {
        const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
        Swal.fire({
            title: "Warning!",
            text: "Are you sure you want to delete this user?",
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
                await axios.delete(BASE_URL + "/users/" + id).then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "User has been successfully deleted!",
                        icon: "success",
                        showClass: {
                            icon: ''
                        }
                    });
                    setTimeout(() => {
                        window.location = '/users';
                    }, 1500);
                })
            }
        })
    }

    return (
        <UserViewContainer>
            <UserViewH1>User {user.id}</UserViewH1>
            <UserViewP>Name: {user.name}</UserViewP>
            <UserViewP>Email: {user.email}</UserViewP>
            <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
            {sessionStorage.getItem("email") === user.email ? (
                null
            ) : (
                <Button variant="contained" color="error" onClick={deleteUser}>Delete</Button>
            )}
        </UserViewContainer>
    )
}

export default UserView