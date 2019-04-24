import React from 'react';
import { NavLink } from 'react-router-dom';
import EvaluationClientHolder from '../../../components/organisms/ClientHolder';
import GuestTemplate from '../../../components/templates/GuestTemplate';
import { StartEvaluationInterface } from '../interface';
import Parser from 'html-react-parser';
interface PropsInterface {
  listdata: StartEvaluationInterface;
}

const EvaluatorHome: React.FunctionComponent<PropsInterface> = ({ listdata }) => {
  const clientHolderObj = {
    designation: '(Engineer) From Tkxel',
    imagePath: listdata.imagePath,
    name: `${listdata.participantsFirstName} ${listdata.participantsLastName}`,
  };
  return (
    <GuestTemplate>
      <div className="invite-container">
        <div className="PageHea der ParticipantHeader mb-4">
          <span className="invite-title">You’re invited to do</span>
          <h1 className="font-bold mt-1 mb-4">{listdata.instrumentTitle}</h1>
          <EvaluationClientHolder {...clientHolderObj} />
        </div>
        <h2 className="font-bold">{listdata.instructionTitle}</h2>
        <p>
          {Parser(
            listdata && listdata.instructionDescription && listdata.instructionDescription
              ? listdata.instructionDescription
              : ''
          )}
        </p>
        <NavLink to="/evaluation/questions" className="btn btn-primary font-size-20 font-bold mb-4 pr-3 pl-3">
          START EVALUATION <img src="/img/icons/arrow.svg" alt="arrow" />
        </NavLink>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorHome;
