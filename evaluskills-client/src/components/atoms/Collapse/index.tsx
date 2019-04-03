import React, { useState, Fragment, ReactNode } from 'react';
import classnames from 'classnames';
import { Collapse, Col } from 'reactstrap';
import './CheckBox.scss';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
interface Props {
  title: string;
  children: ReactNode;
  onChange?: (event: any) => void;
  edit: (instrumentTemplateId: number) => void;
}

const CollapseComponent: React.FunctionComponent<Props> = ({ edit, title, children, onChange }) => {
  const [collapse, setcollapse] = useState(false);

  const mouseEvent = (event: any) => {
    let value: boolean = !collapse;
    setcollapse(value);
  };
  const StyleFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-right: 15px;
    margin-top: 12px;
  `;
  const Styleheading = styled.h5`
    margin-left: 15px;
    margin-top: 12px;
  `;
  const editEvent = (event: any) => {
    edit(2);
  };
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
              <div onClick={editEvent}>
                <StyleFontAwesomeIcon icon={'edit'} />
              </div>
              <div onClick={mouseEvent}>
                <StyleFontAwesomeIcon icon={collapse ? faChevronUp : faChevronDown} />
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
