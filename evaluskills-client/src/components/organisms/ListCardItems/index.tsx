import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styled from 'styled-components';
import PageBody from '../../atoms/PageBody';
import { BadgeTypes } from '../../../enums';
import Checkbox from '../../atoms/CheckBox';
import IconButton from '../../atoms/IconButton';
import EmptyPage from '../../atoms/EmptyPage';
import LabelGroup from '../../atoms/LabelGroup';
import ItemCard from '../../molecules/ItemCard';
import { TemplateItem } from '../../../modules/InstrumentTemplate/interface';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';

interface ListCardProps {
  listData: any[];
  titleKey: string;
  edit?: (id: string) => void;
  remove?: (id: string) => void;
  copy?: (id: string) => void;
  checkbox?: boolean;
  componentName?: string;
  handleCheckbox?: (templateItem: TemplateItem) => void;
  submittAssessments?: () => void;
  checkedItems?: string[];
  status?: string;
}

const CheckboxContainer = styled.div`
  position: absolute;
  right: 0;
  top: 30%;
`;

const StyledButton = styled.button`
  margin-left: 154px;
`;

const StyledButton1 = styled(Button)`
  margin-left: 15px;
  margin-right: 5px;
`;

const ListCardItems: React.FunctionComponent<ListCardProps> = ({
  titleKey,
  listData,
  edit,
  remove,
  copy,
  checkbox,
  componentName,
  checkedItems,
  handleCheckbox,
  submittAssessments,
  status,
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

  const renderContent = (category: string, type: string, competency: string) => (
    <React.Fragment>
      <div className="col-md-3 p-l-0">
        <LabelGroup label="Category" value={category} />
      </div>
      <div className="col-md-3 border-left text-center">
        <LabelGroup label="Type" value={type} badge={BadgeTypes.PRIMARY} />
      </div>
      {competency && (
        <div className="col-md-4 border-left text-center">
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

    const renderDeleteActionButton = (name: string, text: string, icon: IconProp, className: string) => (
      <StyledButton name={name} className={classNames(['btn', className])} onClick={actionHandler(id)} id={id}>
        {icon && <FontAwesomeIcon icon={icon} />}
        &nbsp;
        {text}
      </StyledButton>
    );

    return (
      <React.Fragment>
        {edit && renderActionButton('copy', 'Copy', 'copy', 'btn-outline btn-primary')}
        {edit && renderActionButton('edit', 'Edit', 'edit', 'btn-outline btn-primary')}
        {status !== 'Published' && remove && renderDeleteActionButton('delete', 'Delete', 'trash', 'btn-default')}
      </React.Fragment>
    );
  };

  function renderAllCards(item: any) {
    const content =
      (item.category || item.type || item.competency) && renderContent(item.category, item.type, item.competency);

    const actions = renderActions(item.itemVersionId, item);

    return (
      <ItemCard key={item.id || item.itemId} header={item[titleKey]}>
        {{ content, actions }}
      </ItemCard>
    );
  }

  return (
    <React.Fragment>
      {listData.length > 0 ? (
        listData && listData.map(renderAllCards)
      ) : (
        <PageBody card={true} wrapper={true} className="m-t-15">
          <EmptyPage />
        </PageBody>
      )}
      <React.Fragment>
        {componentName && submittAssessments && status !== 'Published' ? (
          <div className="row m-b-25">
            <StyledButton1 type="submit" color="primary" size="lg" onClick={submittAssessments}>
              Save
            </StyledButton1>
          </div>
        ) : (
          <div />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default ListCardItems;
