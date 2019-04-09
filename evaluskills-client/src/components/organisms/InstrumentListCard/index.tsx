import React from 'react';

import InstrumentCard from '../../molecules/InstrumentDetailCard';
import { ClientInstruments } from '../../../interfaces/Instruments';

interface ListCardProps {
  listData: ClientInstruments[];
  titleKey: string;
  view?: (id: string) => void;
}
const pStyle = {
  width: '50%',
};

const InstrumentListCard: React.FunctionComponent<ListCardProps> = ({
  titleKey,
  listData,
  view,
}) => {
  // TODO: Add checkbox support
  // TODO: Add support remove action handlers and replace them with CheckBox
  const actionHandler = (assessmentId: string) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.currentTarget.name === 'view') {
      if (view) {
        view(assessmentId);
      }
    }
  };

  const renderContent = (
    title: string,
    noOfAssessmentItems: string,
    noOfEvaluations: string,
    noOfParticipants: string,
    id: string
  ) => (
    <React.Fragment>
      <div className="d-inline-flex m-r-15 text-center">
        <span className="font-size-12">No of Assessment Items:</span>
        <span className="font-size-12 font-weight-bold">{noOfAssessmentItems}</span>
      </div>
      <div className="d-inline-flex m-r-15 text-center">
        <span className="font-size-12">No of Participants:</span>
        <span className="font-size-12 font-weight-bold">&nbsp;{noOfParticipants}</span>
      </div>
      <div className="d-inline-flex m-r-15 text-center">
        <span className="font-size-12">No of Evaluations:</span>
        <span className="font-size-12 font-weight-bold">&nbsp;{noOfEvaluations}</span>
      </div>
    </React.Fragment>
  );

  const renderProgressBar = (id: string) => (
    <React.Fragment>
      <div className="progress">
        <div style={pStyle} className="progress-bar">
          50%
        </div>
      </div>
      <span>1 Evaluations Received</span>
    </React.Fragment>
  );

  const renderActions = (id: string) => {
    return (
      <React.Fragment>
        {view && (
          <button
            id={id}
            name="view"
            type="button"
            onClick={actionHandler(id)}
            className="btn btn-default"
          >
            Detail
          </button>
        )}
      </React.Fragment>
    );
  };

  function renderAllCards(item: ClientInstruments) {
    if (item) {
      const content = renderContent(
        item.title,
        item.noOfAssessmentItems,
        item.noOfEvaluations,
        item.noOfParticipants,
        item.id
      );

      const actions = renderActions(item.id);
      const bar = renderProgressBar(item.id);

      return (
        <InstrumentCard key={item.id} header={item.title}>
          {{ content, actions, bar }}
        </InstrumentCard>
      );
    }
  }

  return <React.Fragment>{listData && listData.map(renderAllCards)}</React.Fragment>;
};

export default InstrumentListCard;
