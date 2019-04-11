import React, { useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';

interface Props {
  to: string;
  label: string;
  icon?: IconProp;
  active?: boolean;
  children?: React.ReactNode;
}

const DropdownBase = styled.div`
  color: #a7b1c2;
  font-weight: 600;
  padding: 14px 20px 14px 25px;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #293846;
    color: white;
  }
`;

const NavItem: React.FunctionComponent<Props> = ({ to, label, children, active, icon }) => {
  const [collapse, setCollapse] = useState(false);

  const renderCollapse = () =>
    children && (
      <Collapse isOpen={collapse} className="nav nav-second-level">
        {children}
      </Collapse>
    );

  function stateManage() {
    setCollapse(!collapse);
  }

  if (to) {
    return (
      <li className={classNames({ active })}>
        <NavLink to={to}>
          {icon && <FontAwesomeIcon icon={icon} />}
          &nbsp;
          <span className="nav-label">{label}</span>
        </NavLink>
        {renderCollapse()}
      </li>
    );
  } else {
    return (
      <li className={classNames({ active })} onClick={stateManage}>
        <DropdownBase>
          {icon && <FontAwesomeIcon className="fa fa-gear" icon={icon} />}
          &nbsp;
          <span className="nav-label">{label}</span>
          {renderCollapse()}
        </DropdownBase>
      </li>
    );
  }
};

NavItem.defaultProps = {
  active: false,
};

export default NavItem;
