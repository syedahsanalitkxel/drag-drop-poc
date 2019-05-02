import React from 'react';

import InstrumentCard from '../../molecules/InstrumentDetailCard';
import { ClientInstruments } from '../../../interfaces/Instruments';

interface ListCardProps {
  listData: ClientInstruments[];
  titleKey: string;
  view: (id: string) => void;
}

const InstrumentListCard: React.FunctionComponent<ListCardProps> = ({ titleKey, listData, view }) => {
  // TODO: Add checkbox support
  // TODO: Add support remove action handlers and replace them with CheckBox

  const renderContent = (
    title: string,
    noOfAssessmentItems: string,
    noOfEvaluations: string,
    noOfParticipants: string
  ) => (
    <React.Fragment>
      <div className="d-inline-flex m-r-15 text-center">
        <span className="font-size-12">No of Assessment Items:</span>
        <span className="font-size-12 font-weight-bold">&nbsp;{noOfAssessmentItems}</span>
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

  const calculateProgress = (items: any) => {
    if (items.totalEvaluations > 0) {
      return {
        width: ((items.completedEvaluations / items.totalEvaluations) * 100).toString().concat('%'),
      };
    } else {
      return {
        width: '0%',
      };
    }
  };

  const renderProgressBar = (id: any, items: any) => (
    <React.Fragment>
      <div className="progress">
        <div style={calculateProgress(items)} className="progress-bar">
          {((items.completedEvaluations / items.totalEvaluations) * 100)
            .toFixed(2)
            .toString()
            .concat('%')}
        </div>
      </div>
      <span>{items.completedEvaluations} Evaluations Received</span>
    </React.Fragment>
  );

  function renderAllCards(item: ClientInstruments) {
    if (item) {
      const content = renderContent(
        item.title,
        item.totalAssessmentItems,
        item.totalEvaluations,
        item.totalAssessments
      );

      const bar = renderProgressBar(item.id, item);

      return (
        <InstrumentCard item={item} key={item.id} header={item.title}>
          {{ content, bar, view }}
        </InstrumentCard>
      );
    }
  }

  return <React.Fragment>{listData && listData.map(renderAllCards)}</React.Fragment>;
};

export default InstrumentListCard;
