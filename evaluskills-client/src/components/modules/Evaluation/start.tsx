import React from 'react';
import { NavLink } from 'react-router-dom';
import EvaluationClientHolder from '../../organisms/ClientHolder';
import GuestTemplate from '../../templates/GuestTemplate';

const EvaluatorHome = () => {
  const clientHolderObj = {
    name: 'Jasmine Rassol',
    designation: '(Manager) From Tkxel',
  };
  return (
    <GuestTemplate>
      <div className="invite-container">
        <div className="PageHeader ParticipantHeader mb-4">
          <span className="invite-title">You’re invited to do</span>
          <h1 className="font-bold mt-1 mb-4">360° Leadership Assessment</h1>
          <EvaluationClientHolder {...clientHolderObj} />
        </div>
        <h2 className="font-bold">Instructions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi.
        </p>
        <NavLink
          to="/evaluation/questions"
          className="btn btn-primary font-size-20 font-bold mb-4 pr-3 pl-3"
        >
          START EVALUATION <img src="/img/icons/arrow.svg" alt="arrow" />
        </NavLink>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorHome;
