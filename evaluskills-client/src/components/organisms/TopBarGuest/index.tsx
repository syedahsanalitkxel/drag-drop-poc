import React from 'react';

const TopBarGuest = () => (
  <div className="PageHeader ParticipantHeader mb-4">
    <div className="row">
      <div className="col-md-6">
        <a href="#">
          <img src="/img/icons/main-pas-logo.png" alt="Peregrine" />
        </a>
      </div>
      <div className="col-md-6">
        <button className="btn btn-primary btn-outline float-right font-size-16 font-bold">Create Your Account</button>
      </div>
    </div>
  </div>
);

export default TopBarGuest;
