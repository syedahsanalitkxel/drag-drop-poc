import React from 'react';
import { NavLink } from 'react-router-dom';
import GuestTemplate from '../../templates/GuestTemplate';

const EvaluattorHome = () => {
  return (
    <GuestTemplate>
      <div className="invite-container">
        <div className="PageHeader ParticipantHeader mb-4">
          <span className="invite-title">You’re invited to do</span>
          <h1 className="font-bold mt-1 mb-4">360° Leadership Assessment</h1>
          <div className="client-holder">
            <div className="inline img-holder mr-4 vertical-align">
              <img src="img/icons/Profile pic.png" alt="profile" />
            </div>
            <div className="inline txt-holder">
              <h2 className="mt-0 font-bold mb-1">Jasmine Rassol</h2>
              <p className="mb-0">(Manager) From Tkxel</p>
            </div>
          </div>
        </div>
        <h2 className="font-bold">Instructions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi.
        </p>
        <NavLink to="/questions" className="btn btn-primary font-size-20 font-bold mb-4 pr-3 pl-3">
          START EVALUATION <img src="img/icons/arrow.svg" alt="arrow" />
        </NavLink>
      </div>
    </GuestTemplate>
  );
};
export default EvaluattorHome;
