import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

import Profile from './components/Profile';
import Users from './components/Users';
import UserView from './components/UserView';
import UserEdit from './components/UserEdit';
import UserCreate from './components/UserCreate';
import MySidebar from './components/MySidebar';

import ProgramPage from './pages/program';
import ProgramView from './components/ProgramView';
import ProgramEdit from './components/ProgramEdit';
import ProgramCreate from './components/ProgramCreate';

import ProgramTypePage from './pages/programtype';
import ProgramTypeView from './components/ProgramTypeView';
import ProgramTypeEdit from './components/ProgramTypeEdit';
import ProgramTypeCreate from './components/ProgramTypeCreate';

import ServiceTypePage from './pages/servicetype';
import ServiceTypeView from './components/ServiceTypeView';
import ServiceTypeEdit from './components/ServiceTypeEdit';
import ServiceTypeCreate from './components/ServiceTypeCreate';

import ServiceStreamPage from './pages/servicestream';
import ServiceStreamView from './components/ServiceStreamView';
import ServiceStreamEdit from './components/ServiceStreamEdit';
import ServiceStreamCreate from './components/ServiceStreamCreate';

import GroupPage from './pages/group';
import GroupView from './components/GroupView';
import GroupEdit from './components/GroupEdit';
import GroupCreate from './components/GroupCreate';

import DivisionPage from './pages/division';
import DivisionView from './components/DivisionView';
import DivisionEdit from './components/DivisionEdit';
import DivisionCreate from './components/DivisionCreate';

import SitePage from './pages/site';
import SiteView from './components/SiteView';
import SiteEdit from './components/SiteEdit';
import SiteCreate from './components/SiteCreate';

function App() {
  return (
    <Router>
      <MySidebar/>
      <Header/>
      <Routes>
        <Route path="/login" element={<LoginPage/>} exact />
        <Route path="/register" element={<RegisterPage/>} exact />
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home/>} exact />
          <Route path="/profile" element={<Profile/>} exact />
          <Route path="/users" element={<Users/>} exact />
          <Route path="/users/:id" element={<UserView/>} exact />
          <Route path="/users/:id/edit" element={<UserEdit/>} exact />
          <Route path="/users/create" element={<UserCreate/>} exact />

          <Route path="/program" element={<ProgramPage/>} exact />
          <Route path="/program/:id" element={<ProgramView/>} exact />
          <Route path="/program/:id/edit" element={<ProgramEdit/>} exact />
          <Route path="/program/create" element={<ProgramCreate/>} exact />

          <Route path="/programtype" element={<ProgramTypePage/>} exact />
          <Route path="/programtype/:id" element={<ProgramTypeView/>} exact />
          <Route path="/programtype/:id/edit" element={<ProgramTypeEdit/>} exact />
          <Route path="/programtype/create" element={<ProgramTypeCreate/>} exact />

          <Route path="/servicetype" element={<ServiceTypePage/>} exact />
          <Route path="/servicetype/:id" element={<ServiceTypeView/>} exact />
          <Route path="/servicetype/:id/edit" element={<ServiceTypeEdit/>} exact />
          <Route path="/servicetype/create" element={<ServiceTypeCreate/>} exact />

          <Route path="/servicestream" element={<ServiceStreamPage/>} exact />
          <Route path="/servicestream/:id" element={<ServiceStreamView/>} exact />
          <Route path="/servicestream/:id/edit" element={<ServiceStreamEdit/>} exact />
          <Route path="/servicestream/create" element={<ServiceStreamCreate/>} exact />
          
          <Route path="/group" element={<GroupPage/>} exact />
          <Route path="/group/:id" element={<GroupView/>} exact />
          <Route path="/group/:id/edit" element={<GroupEdit/>} exact />
          <Route path="/group/create" element={<GroupCreate/>} exact />

          <Route path="/division" element={<DivisionPage/>} exact />
          <Route path="/division/:id" element={<DivisionView/>} exact />
          <Route path="/division/:id/edit" element={<DivisionEdit/>} exact />
          <Route path="/division/create" element={<DivisionCreate/>} exact />

          <Route path="/site" element={<SitePage/>} exact />
          <Route path="/site/:id" element={<SiteView/>} exact />
          <Route path="/site/:id/edit" element={<SiteEdit/>} exact />
          <Route path="/site/create" element={<SiteCreate/>} exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
