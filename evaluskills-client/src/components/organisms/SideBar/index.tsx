import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import NavItem from '../../atoms/NavItem';
import ProfileBadge from '../../molecules/ProfileBadge';

import { USER_ROLE } from '../../../utils';

import './sidebar.styles.scss';

const getNavItem = (to: string, icon: IconProp, label: string) => (
  <NavItem to={to} icon={icon} label={label} active={location.pathname === to} />
);

/**
 * Page                | Super Admin | Client
 *
 * dashboard           | true | true (private) -
 * assessment          | true | true (private) -
 * instrument template | true | true (private) -
 * clients             | true | false (private) -
 * instrument          | false | true (private) -
 * evaluation          | false | true (private) -
 * reports             | true | true (private) x
 * settings            | true | true (private) -
 */

const Sidebar: React.FunctionComponent<RouteComponentProps> = () => (
  <nav className="navbar-default navbar-static-side" role="navigation">
    <div className="sidebar-collapse">
      <ul className="nav metismenu" id="side-menu">
        <li className="nav-header">
          <ProfileBadge name="Usman Tahir" designation="PSE" profilePicture="/img/profile_small.jpg" />
        </li>

        {getNavItem('/', 'th-large', 'Dashboard')}
        {getNavItem('/assessment-items', 'edit', 'Assessment Items')}
        {getNavItem('/instrument-templates', 'sitemap', 'Instrument Template')}
        {USER_ROLE.isSuperAdmin() && getNavItem('/clients', 'user', 'Clients')}
        {USER_ROLE.isClientAdmin() && getNavItem('/evaluation-instructions', 'user', 'Instructions')}
        {USER_ROLE.isClientAdmin() && getNavItem('/instrument', 'sitemap', 'Instrument')}
        <NavItem to="" icon="cog" label="Setting">
          <ul className="nav metismenu collapse-menu" id="side-menu">
            {getNavItem('/users', 'user', 'Users')}
            {getNavItem('/email', 'user', 'Email')}
          </ul>
        </NavItem>
      </ul>
    </div>
  </nav>
);

export default withRouter(Sidebar);
