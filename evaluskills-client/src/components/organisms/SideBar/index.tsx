import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import NavItem from '../../atoms/NavItem';
import ProfileBadge from '../../molecules/ProfileBadge';

import './sidebar.styles.scss';

const getNavItem = (to: string, icon: IconProp, label: string) => (
  <NavItem to={to} icon={icon} label={label} active={location.pathname === to} />
);
const isSuperAdmin = () =>
  window.localStorage.getItem('role') || window.localStorage.getItem('role') === 'SUPER_ADMIN';
const isClientAdmin = () =>
  !window.localStorage.getItem('role') || window.localStorage.getItem('role') === 'CLIENT_ADMIN';

const Sidebar: React.FunctionComponent<RouteComponentProps> = ({ location }) => (
  <nav className="navbar-default navbar-static-side" role="navigation">
    <div className="sidebar-collapse">
      <ul className="nav metismenu" id="side-menu">
        <li className="nav-header">
          <ProfileBadge
            name="Usman Tahir"
            designation="PSE"
            profilePicture="img/profile_small.jpg"
          />
        </li>
        {isSuperAdmin() && getNavItem('/dashboard', 'th-large', 'Dashboard')}
        {isClientAdmin() && getNavItem('/dashboard', 'th-large', 'Dashboard')}
        {getNavItem('/assessment-items', 'edit', 'Assessment Items')}
        {isSuperAdmin() && getNavItem('/instrument-templates', 'sitemap', 'Instrument Template')}
        {isClientAdmin() && getNavItem('/instrument-templates', 'sitemap', 'Instrument Template')}
        {isSuperAdmin() && getNavItem('/clients', 'user', 'Clients')}
        {isClientAdmin() && getNavItem('/clients', 'user', 'Clients')}
        {isSuperAdmin() && getNavItem('/evaluation-instructions', 'user', 'Instructions')}
        {isClientAdmin() && getNavItem('/evaluation-instructions', 'user', 'Instructions')}
        {getNavItem('/instrument', 'sitemap', 'Instrument')}
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
