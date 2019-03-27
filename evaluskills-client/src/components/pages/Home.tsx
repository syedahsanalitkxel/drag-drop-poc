import React from 'react';
import { NavLink } from "react-router-dom";

const Home = () => (
  <React.Fragment>
    <h1>Application Home</h1>
    <p>
      This will have home content
    </p>
    <NavLink to="/dashboard">Dashboard</NavLink>
  </React.Fragment>
);

export default Home;
