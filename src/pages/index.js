import React from 'react';
import Article from '../components/Article';

import './index.css';

const Home = ({sites, programs, programTypes, groups, serviceStreams, serviceTypes, divisions}) => {
  return (
    <div className="home">
      <Article sites = {sites} programs= {programs} programTypes = {programTypes} groups = {groups} serviceStreams = {serviceStreams} serviceTypes = {serviceTypes} divisions = {divisions}/>
    </div>
  )
}

export default Home;