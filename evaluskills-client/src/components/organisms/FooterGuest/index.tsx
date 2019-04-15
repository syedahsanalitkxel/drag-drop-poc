import React from 'react';
import { NavLink } from 'react-router-dom';
const FooterGuest = () => {
  return (
    <div className="bottom-bar fixed-bottom p-10">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-right">
            <a href="#" className="btn btn-dark">
              Skip for now
            </a>
            <NavLink to="/evaluation/summary" className="btn btn-primary">
              Next <img src="/img/icons/arrow.svg" alt="arrow" />
            </NavLink>
          </div>
        </div>
      </div>
      <a href="#" className="m-10 position-absolute left bottom-logo">
        <img src="/img/icons/main-pas-logo.png" />
      </a>
    </div>
  );
};
export default FooterGuest;
