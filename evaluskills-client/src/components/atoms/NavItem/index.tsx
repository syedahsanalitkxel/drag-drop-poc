import React, { useState } from 'react';

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
    children && (
      <Collapse isOpen={collapse} className="nav nav-second-level">
        {children}
      </Collapse>
    );
  const [collapse, setcollapse] = useState(false);
  function stateManage() {
    setcollapse(!collapse);
  }

  if (to !== '') {
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
        <NavLink to={'#'}>
          {icon && <FontAwesomeIcon className="fa fa-gear" icon={icon} />}
          &nbsp;
          <span className="nav-label">{label}</span>
          {renderCollapse()}
        </NavLink>
      </li>
      //     <li>
      //     <a href="#"><i className="fa fa-gear"></i> <span className="nav-label">Setting</span></a>
      //     <ul className="nav nav-second-level collapse">
      //         <li><a href="settingUser.html">User</a></li>
      //         <li><a href="emailTemplate.html">Email Template</a></li>
      //     </ul>
      // </li>
    );
  }
};

NavItem.defaultProps = {
  active: false,
};

export default NavItem;
