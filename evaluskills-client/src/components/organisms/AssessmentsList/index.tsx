import React from 'react';

import { BadgeTypes } from "../../../enums";
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import IconButton from '../../atoms/IconButton';
import LabelGroup from "../../atoms/LabelGroup";
import AssessmentCard from '../../molecules/AssessmentCard';

interface Props {
  listData: AssessmentItemInterface[],
  edit: (assessmentId: string) => void;
  remove: (assessmentId: string) => void;
}

const AssessmentsList: React.FunctionComponent<Props> = ({ listData, edit, remove }) => {
  // TODO: Add checkbox support
  // TODO: Add support remove action handlers and replace them with CheckBox
  const actionHandler = (assessmentId: string) => (event: React.MouseEvent) => {
    if (event.currentTarget.id === 'edit') {
      edit(assessmentId);
    } else if (event.currentTarget.id === 'delete') {
      remove(assessmentId);
    }
  };

  const renderContent = (category: string, type: string, competency: string) => (
    <React.Fragment>
      <div className="col-md-3 p-l-0">
        <LabelGroup label="Category" value={category} />
      </div>
      <div className="col-md-3 border-left text-center">
        <LabelGroup label="Type" value={type} badge={BadgeTypes.PRIMARY} />
      </div>
      <div className="col-md-4 border-left text-center">
        <LabelGroup label="Competency" value={competency} />
      </div>
    </React.Fragment>
  );

  const renderActions = (assessmentId: string) => (
    <React.Fragment>
      <IconButton id="edit" icon="edit" className="btn-outline btn-primary" actionHandler={actionHandler(assessmentId)}>
        Edit
      </IconButton>
      <IconButton id="delete" icon="trash" className="btn-default" actionHandler={actionHandler(assessmentId)}>
        Delete
      </IconButton>
    </React.Fragment>
  );

  const renderAssessmentItem = (assessmentItem: AssessmentItemInterface) => {
    const content = renderContent(assessmentItem.category, assessmentItem.type, assessmentItem.competency);
    const actions = renderActions(assessmentItem.id);

    return (
      <AssessmentCard key={assessmentItem.id} header={assessmentItem.definition}>
        {{ content, actions }}
      </AssessmentCard>
    )
  };

  return (
    <React.Fragment>
      {listData.map(renderAssessmentItem)}
    </React.Fragment>
  );
};

export default AssessmentsList;
