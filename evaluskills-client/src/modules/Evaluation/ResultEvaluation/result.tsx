import React from 'react';
import { NavLink } from 'react-router-dom';
import GuestTemplate from '../../../components/templates/GuestTemplate';
import { RouteComponentProps, withRouter } from 'react-router';
import { Result } from '../interface';
import { StartEvaluationInterface } from '../interface';
interface PropsInterface extends RouteComponentProps {
  listdata: StartEvaluationInterface;
}
const EvaluatorResult: React.FunctionComponent<any> = ({ listdata, match }) => {
  return (
    <GuestTemplate>
      <div className="invite-container">
        <div className="PageHeader ParticipantHeader mb-4">
          <div className="row">
            <div className="col-sm-8">
              <div className="img-holder">
                <img src="/img/icons/Like.png" alt="Like" />
              </div>
              <span className="invite-title">You have completed </span>
              <h1 className="font-bold mt-1 mb-4 font-size-40">
                {listdata.instrumentTitle}
                <span className="d-block font-size-30">
                  <span className="font-normal">of</span>{' '}
                  {listdata.participantsFirstName + ' ' + listdata.participantsLastName}
                </span>
              </h1>
              <NavLink
                to={'/evaluation/' + match.params.token + '/summary'}
                className="btn btn-primary font-size-20 font-bold mb-4 pr-4 pl-4"
              >
                View Detail <img src="/img/icons/arrow.svg" alt="arrow" />
              </NavLink>
            </div>
            <div className="col-sm-4 mt-5">
              <div className="result-container float-right">
                <div className="result-holder">
                  <strong className="num"> {listdata.overallScore}</strong>
                  <span className="desc">Estimated Score</span>s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestTemplate>
  );
};
export default withRouter(EvaluatorResult);
