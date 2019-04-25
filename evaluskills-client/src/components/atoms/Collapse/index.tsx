import React, { useState, Fragment, ReactNode } from 'react';
import classnames from 'classnames';
import { Collapse, Col } from 'reactstrap';
import './CheckBox.scss';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { getActiveClient, USER_ROLE } from '../../../utils';

interface Props {
  title?: string;
  index: number;
  children?: ReactNode;
  onChange?: (event: any) => void;
  edit: (instrumentTemplateId: number) => void;
  instructions?: any;
}

const CollapseComponent: React.FunctionComponent<Props> = ({
  index,
  edit,
  title,
  children,
  onChange,
  instructions,
}) => {
  const [collapse, setcollapse] = useState(false);

  const mouseEvent = (event: any) => {
    let value: boolean = !collapse;
    setcollapse(value);
  };
  const StyleFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 15px;
    margin-top: 12px;
  `;
  const StyleFontAwesomeIcon2 = styled(FontAwesomeIcon)`
    margin-top: 12px;
    margin-left: 3px;
  `;

  const Styleheading = styled.h5`
    margin-left: 15px;
    margin-top: 12px;
  `;
  const editEvent = (event: any) => {
    edit(index);
  };

  function renderEditAction(instruction: any) {
    if (USER_ROLE.isSuperAdmin() && instruction.isSystemDefined) {
      return (
        <div onClick={editEvent}>
          <button className="btn">
            <StyleFontAwesomeIcon2 icon={'edit'} />
          </button>
        </div>
      );
    } else if (USER_ROLE.isClientAdmin() && (!instruction.isSystemDefined || instruction.clientId)) {
      return (
        <div onClick={editEvent}>
          <button className="btn">
            <StyleFontAwesomeIcon2 icon={'edit'} />
          </button>
        </div>
      );
    }
  }

  return (
    <Fragment>
      <div className="card">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className="ibox-title">
              <Styleheading>{title}</Styleheading>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 text-right p-r-30">
            <div className="form-group row d-flex justify-content-end">
              {renderEditAction(instructions)}
              <div onClick={mouseEvent}>
                <button className="btn">
                  <StyleFontAwesomeIcon icon={collapse ? faChevronUp : faChevronDown} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse isOpen={collapse}>{children}</Collapse>
    </Fragment>
  );
};

export default CollapseComponent;
