import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';
import PageBody from '../../../../components/atoms/PageBody';
import { BadgeTypes } from '../../../../enums';
import Checkbox from '../../../../components/atoms/CheckBox';
import IconButton from '../../../../components/atoms/IconButton';
import EmptyPage from '../../../../components/atoms/EmptyPage';
import LabelGroup from '../../../../components/atoms/LabelGroup';
import ItemCard from '../../../../components/molecules/ItemCard';
import { TemplateItem } from '../../../InstrumentTemplate/interface';
import { getActiveClient, USER_ROLE } from '../../../../utils';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ListCardProps {
  listData: any[];
  titleKey: string;
  edit?: (id: string) => void;
  remove?: (id: string) => void;
  copy?: (id: string) => void;
  checkbox?: boolean;
  handleCheckbox?: (templateItem: TemplateItem) => void;
  checkedItems?: string[];
}

const CheckboxContainer = styled.div`
  position: absolute;
  right: 0;
  top: 30%;
`;

const StyledButton = styled.button`
  margin-left: 154px;
`;

const ListCardItems: React.FunctionComponent<ListCardProps> = ({
  titleKey,
  listData,
  edit,
  remove,
  copy,
  checkbox,
  checkedItems,
  handleCheckbox,
}) => {
  const actionHandler = (assessmentId: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.currentTarget.name === 'edit') {
      if (edit) {
        edit(assessmentId);
      }
    } else if (event.currentTarget.name === 'delete') {
      if (remove) {
        remove(assessmentId);
      }
    } else if (event.currentTarget.name === 'copy') {
      if (copy) {
        copy(assessmentId);
      }
    }
  };

  const renderContent = (category: string, type: string, competency: string, itemStatus: string) => (
    <React.Fragment>
      <div className="col-md-3 p-l-0">
        <LabelGroup label="Category" value={category} />
      </div>
      <div className="col-md-3 border-left text-center">
        <LabelGroup label="Type" value={type} badge={BadgeTypes.PRIMARY} />
      </div>
      <div className="col-md-3 border-left text-center">
        <LabelGroup label="Status" value={itemStatus} badge={BadgeTypes.PRIMARY} />
      </div>
      {competency.length > 0 && (
        <div className="col-md-3 border-left text-center">
          <LabelGroup label="Competency" value={competency} />
        </div>
      )}
    </React.Fragment>
  );

  const renderActions = (id: string, item: any) => {
    const renderActionButton = (name: string, text: string, icon: IconProp, className: string) => (
      <IconButton name={name} icon={icon} className={className} actionHandler={actionHandler(id)}>
        {text}
      </IconButton>
    );

    const renderCopyActionButton = (name: string, text: string, icon: IconProp, className: string) => (
      <StyledButton name={name} className={classNames(['btn', className])} onClick={actionHandler(id)} id={id}>
        {icon && <FontAwesomeIcon icon={icon} />}
        &nbsp;
        {text}
      </StyledButton>
    );

    if (checkbox) {
      return (
        <CheckboxContainer className="pull-right">
          <Checkbox
            name="templateItem"
            value={id}
            isChecked={checkedItems && !!checkedItems.find(checkedItem => checkedItem === id)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              e.preventDefault();
              if (handleCheckbox) {
                handleCheckbox(item);
              }
            }}
          >
            {' '}
          </Checkbox>
        </CheckboxContainer>
      );
    }

    if (USER_ROLE.isSuperAdmin() && item.isSystemDefined) {
      return (
        <React.Fragment>
          {edit && renderActionButton('edit', 'Edit', 'edit', 'btn-outline btn-primary')}
          {remove && renderActionButton('delete', 'Delete', 'trash', 'btn-default')}
          {edit && renderActionButton('copy', 'Copy', 'copy', 'btn-outline btn-primary')}
        </React.Fragment>
      );
    } else if (USER_ROLE.isClientAdmin() && item.isSystemDefined) {
      return (
        <React.Fragment>
          {edit && renderCopyActionButton('copy', 'Copy', 'copy', 'btn-outline btn-primary')}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {edit && renderActionButton('edit', 'Edit', 'edit', 'btn-outline btn-primary')}
          {remove && renderActionButton('delete', 'Delete', 'trash', 'btn-default')}
          {edit && renderActionButton('copy', 'Copy', 'copy', 'btn-outline btn-primary')}
        </React.Fragment>
      );
    }
  };

  function renderAllCards(item: any) {
    const content =
      (item.category || item.type || item.competency) &&
      renderContent(item.category, item.type, item.competency, item.itemStatus);

    const actions = renderActions(item.id || item.itemId, item);

    return (
      <ItemCard key={item.id || item.itemId} header={item[titleKey]}>
        {{ content, actions }}
      </ItemCard>
    );
  }

  return <React.Fragment>{listData.length > 0 ? listData && listData.map(renderAllCards) : null}</React.Fragment>;
};

export default ListCardItems;
