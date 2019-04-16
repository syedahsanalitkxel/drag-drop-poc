import React from 'react';

import IconButton from '../../components/atoms/IconButton';
import LabelGroup from '../../components/atoms/LabelGroup';
import ItemCard from '../../components/molecules/ItemCard';
import { actionTypes } from '../../enums';
import { USER_ROLE } from '../../utils';
import { InstrumentTemplateInterface } from './interface';

interface ListCardProps {
  instrumentTemplates: InstrumentTemplateInterface[];
  actionHandler?: (mode: actionTypes, id?: string | number) => void;
}

/**
 * 1) copy - move to edit with copy mode
 * 2) delete - show modal and handle action
 * 3) edit - move to edit
 * 4) start evaluation - move to evaluation screen
 */

const ListInstrumentTemplateCards: React.FunctionComponent<ListCardProps> = ({
  instrumentTemplates,
  actionHandler,
}) => {
  const renderContent = (
    assessmentItemsCount: number,
    competencyCount: number,
    influentialCount: number,
    rationalCount: number,
    faithBasedCount: number
  ) => (
    <React.Fragment>
      <div className="d-inline-flex m-r-15">
        <LabelGroup label="No of Assessment Items " value={assessmentItemsCount} />
      </div>
      <div className="d-inline-flex border-left m-r-15 p-l-15 justify-content-between width-55">
        <div>
          <LabelGroup label="Competency" value={competencyCount} />
        </div>
        <div>
          <LabelGroup label="Influential" value={influentialCount} />
        </div>
        <div>
          <LabelGroup label="Rational" value={rationalCount} />
        </div>
        <div>
          <LabelGroup label="FaithBased" value={faithBasedCount} />
        </div>
      </div>
    </React.Fragment>
  );

  const clickHandler = (action: actionTypes, id?: string | number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (actionHandler) {
      actionHandler(action, id);
    }
  };

  const superAdminActions = (id?: string | number) => (
    <React.Fragment>
      <IconButton icon="copy" className="btn-outline btn-primary" actionHandler={clickHandler(actionTypes.COPY, id)}>
        Copy
      </IconButton>
      <IconButton icon="edit" className="btn-outline btn-primary" actionHandler={clickHandler(actionTypes.EDIT, id)}>
        Edit
      </IconButton>
      <IconButton icon="trash" className="btn-default" actionHandler={clickHandler(actionTypes.DELETE, id)}>
        Delete
      </IconButton>
    </React.Fragment>
  );

  const clientAdminActions = (id?: string | number) => (
    <React.Fragment>
      <IconButton icon="copy" className="btn-outline btn-primary" actionHandler={clickHandler(actionTypes.COPY, id)}>
        Copy
      </IconButton>
      <IconButton
        className="btn btn-primary clr-white btn btn-w-m"
        actionHandler={clickHandler(actionTypes.START_EVALUATION, id)}
      >
        Start Evaluation
      </IconButton>
    </React.Fragment>
  );

  const renderAllCards = (instrumentTemplate: InstrumentTemplateInterface) => {
    const content = renderContent(
      (instrumentTemplate.competency || 0) + (instrumentTemplate.influential || 0) + (instrumentTemplate.rational || 0),
      instrumentTemplate.competency || 0,
      instrumentTemplate.influential || 0,
      instrumentTemplate.rational || 0,
      instrumentTemplate.isFaithBased || 0
    );

    return (
      <ItemCard key={instrumentTemplate.id} header={instrumentTemplate.title}>
        {{
          actions:
            USER_ROLE.isClientAdmin() && instrumentTemplate.isSystemDefined
              ? clientAdminActions(instrumentTemplate.id)
              : superAdminActions(instrumentTemplate.id),
          content,
        }}
      </ItemCard>
    );
  };
  return <React.Fragment>{instrumentTemplates.map(renderAllCards)}</React.Fragment>;
};

export default ListInstrumentTemplateCards;
