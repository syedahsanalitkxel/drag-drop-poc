import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';

interface Props {
  to: string;
  label: string;
  icon?: IconProp;
  active?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<Props> = ({ to, label, children, active, icon }) => {
  const renderCollapse = () =>
    children && <Collapse className="nav nav-second-level">{children}</Collapse>;

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
};

NavItem.defaultProps = {
  active: false,
};

export default NavItem;
