import React from 'react';
import GuestTemplate from '../../templates/GuestTemplate';

const ParticipantHome = () => {
  return (
    <GuestTemplate>
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="invite-container">
          <span className="invite-title">Hey Jasmine, you’re invited to participate in the</span>
          <h1 className="font-bold mt-1 mb-4">360° Leadership Assessment</h1>
          <a href="#" className="btn btn-primary font-size-20 font-bold mb-4">
            Begin Here
            <img src="img/arrow.svg" alt="arrow" />
          </a>
        </div>
      </div>
    </GuestTemplate>
  );
};
export default ParticipantHome;
