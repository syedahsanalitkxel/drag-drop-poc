import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { BadgeTypes } from '../../../enums';
import IconButton from '../../atoms/IconButton';
import LabelGroup from '../../atoms/LabelGroup';
import ItemCard from '../../molecules/ItemCard';

interface ListCardProps {
  listData: any[];
  titleKey: string;
  edit?: (id: string) => void;
  remove?: (id: string) => void;
  addInstrument?: () => void;
}

const ListCardItems: React.FunctionComponent<ListCardProps> = ({ titleKey, listData, edit, remove, addInstrument }) => {
  const isSuperAdmin = () => window.localStorage.getItem('role') === 'SUPER_ADMIN';
  const isClientAdmin = () =>
    !window.localStorage.getItem('role') || window.localStorage.getItem('role') === 'CLIENT_ADMIN';

  const actionHandler = (assessmentId: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.name === 'edit') {
      if (edit) {
        edit(assessmentId);
      }
    } else if (event.currentTarget.name === 'delete') {
      if (remove) {
        remove(assessmentId);
      }
    } else if (event.currentTarget.name === 'Create') {
      if (addInstrument) {
        addInstrument();
      }
    }
  };

  const renderContent = (
    assessmentItemsCount: string,
    competencyCount: string,
    influentialCount: string,
    rationalCount: string,
    faithBasedCount: string
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

  const clientRenderActions = (id: string) => {
    const renderActionButton = (name: string, text: string, icon?: any, className?: string) => (
      <IconButton name={name} icon={icon} className={className} actionHandler={actionHandler(id)}>
        {text}
      </IconButton>
    );
    return (
      <React.Fragment>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          {edit && renderActionButton('copy', 'Copy', 'copy', ' btn-outline btn-primary')}
          {addInstrument && renderActionButton('Create', 'Create', '', 'btn btn-primary clr-white btn btn-w-m ')}
        </div>
      </React.Fragment>
    );
  };
  const superRenderActions = (id: string) => {
    const renderActionButton = (name: string, text: string, icon: IconProp, className: string) => (
      <IconButton name={name} icon={icon} className={className} actionHandler={actionHandler(id)}>
        {text}
      </IconButton>
    );
    return (
      <React.Fragment>
        {edit && renderActionButton('edit', 'Edit', 'edit', 'btn-outline btn-primary')}
        {remove && renderActionButton('delete', 'Delete', 'trash', 'btn-default')}
      </React.Fragment>
    );
  };
  function renderAllCards(item: any) {
    const content = renderContent(
      item.competency + item.influential + item.rational,
      item.competency,
      item.influential,
      item.rational,
      item.isFaithBased
    );

    if (isSuperAdmin() === true) {
      const actions = superRenderActions(item.id);
      return (
        <ItemCard key={item.id} header={item[titleKey]}>
          {{ content, actions }}
        </ItemCard>
      );
    } else {
      const actions = clientRenderActions(item.id);
      return (
        <ItemCard key={item.id} header={item[titleKey]}>
          {{ content, actions }}
        </ItemCard>
      );
    }
  }

  return <React.Fragment>{listData.map(renderAllCards)}</React.Fragment>;
};

export default ListCardItems;
