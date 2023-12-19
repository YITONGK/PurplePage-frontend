import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProfileContainer, ProfileH1, ProfileDiv } from './ProfileElements';

const Profile = () => {
  // useState hooks
  const [user, setUser] = useState({});

  // useEffect
  useEffect(() => {
    getUser();
  }, []);

  // get the current user
  const getUser = async () => {
    const BASE_URL = "https://purplepagesbackend.vt.uniting.org/";
    await axios.get(BASE_URL + sessionStorage.email).then(res => {
      const data = res.data;
      setUser(data);
    })
  }

  return (
    <ProfileContainer>
      <ProfileH1>Profile</ProfileH1>
      <ProfileDiv>Name: { user.name }</ProfileDiv>
      <ProfileDiv>Email: { user.email }</ProfileDiv>
    </ProfileContainer>
  )
}

export default Profile