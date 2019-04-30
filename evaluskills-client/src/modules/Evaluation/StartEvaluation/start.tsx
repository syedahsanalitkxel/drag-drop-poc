import React from 'react';
import { NavLink } from 'react-router-dom';
import EvaluationClientHolder from '../../../components/organisms/ClientHolder';
import GuestTemplate from '../../../components/templates/GuestTemplate';
import { StartEvaluationInterface } from '../interface';
import Parser from 'html-react-parser';
import { RouteComponentProps, withRouter } from 'react-router';
import RouteParamsInterface from '../../../interfaces/RouteParams';
interface PropsInterface extends RouteComponentProps {
  listdata: StartEvaluationInterface;
}

const EvaluatorHome: React.FC<PropsInterface> = ({ listdata, match }) => {
  const clientHolderObj = {
    designation: listdata.participantRole,
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
        <NavLink
          to={'/evaluation/' + listdata.token + '/questions/' + listdata.instrumentId + '/' + listdata.instrumentItemId}
          className="btn btn-primary font-size-20 font-bold mb-4 pr-3 pl-3"
        >
          START EVALUATION <img src="/img/icons/arrow.svg" alt="arrow" />
        </NavLink>
      </div>
    </GuestTemplate>
  );
};
export default withRouter(EvaluatorHome);
