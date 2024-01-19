import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages';
import MySidebar from './components/MySidebar';

import ProgramPage from './pages/program';
import ProgramView from './components/ProgramView';

import ProgramTypePage from './pages/programtype';
import ProgramTypeView from './components/ProgramTypeView';

import ServiceTypePage from './pages/servicetype';
import ServiceTypeView from './components/ServiceTypeView';

import ServiceStreamPage from './pages/servicestream';
import ServiceStreamView from './components/ServiceStreamView';

import GroupPage from './pages/group';
import GroupView from './components/GroupView';

import DivisionPage from './pages/division';
import DivisionView from './components/DivisionView';

import SitePage from './pages/site';
import SiteView from './components/SiteView';

import {AuthenticatedTemplate, UnauthenticatedTemplate} from '@azure/msal-react';
import LoginPage from "./pages/login";

//export NODE_OPTIONS=--openssl-legacy-provider //use this comment id digital routine unsupport

function App() {

  const [sideNavShow, setSideNavShow] = useState(false);

  const showSideNav = () => {
    setSideNavShow(prev => !prev);
  }


  return (
    <>
      <AuthenticatedTemplate>
        <Router>
          <Header showSideNav={showSideNav} />
          <div className={(sideNavShow) ? 'slide-in' : 'slide-out'}>
            <MySidebar showSideNav={showSideNav} />
          </div>
          {/* Protected Routes */}
          <Routes>
            <Route>
              <Route path="/" element={<Home/>} exact />

              <Route path="/program" element={<ProgramPage/>} exact />
              <Route path="/program/:id" element={<ProgramView/>} exact />

              <Route path="/programtype" element={<ProgramTypePage/>} exact />
              <Route path="/programtype/:id" element={<ProgramTypeView/>} exact />

              <Route path="/servicetype" element={<ServiceTypePage/>} exact />
              <Route path="/servicetype/:id" element={<ServiceTypeView/>} exact />

              <Route path="/servicestream" element={<ServiceStreamPage/>} exact />
              <Route path="/servicestream/:id" element={<ServiceStreamView/>} exact />

              <Route path="/group" element={<GroupPage/>} exact />
              <Route path="/group/:id" element={<GroupView/>} exact />

              <Route path="/division" element={<DivisionPage/>} exact />
              <Route path="/division/:id" element={<DivisionView/>} exact />

              <Route path="/site" element={<SitePage/>} exact />
              <Route path="/site/:id" element={<SiteView/>} exact />

            </Route>
          </Routes>
          <Footer />
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </>
    
  );
}

export default App;
