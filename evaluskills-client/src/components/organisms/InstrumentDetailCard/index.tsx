import React, { Fragment, useState } from 'react';
import InstrumentCard from '../../molecules/InstrumentCard';
import ParticipantInterface from '../../../interfaces/Participant';

interface ListCardProps {
  participants: ParticipantInterface[];
  evaluator: any[];
  titleKey: string;
  view?: (evaluationId: string) => void;
}

const InstrumentListCard: React.FunctionComponent<ListCardProps> = ({
  titleKey,
  participants,
  evaluator,
  view,
}) => {
  return (
    <React.Fragment>
      <div className="ibox ">
        <div className="ibox-content p-0">
          <table className="table panel-group" id="accordions">
            <thead>
              <tr>
                <th>Participants</th>
                <th>Email</th>
                <th>No. of Evaluators</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Individual Results</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {participants &&
                participants.map((list, index) => (
                  <InstrumentCard key={index} item={list} evaluatorData={evaluator} view={view} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InstrumentListCard;
