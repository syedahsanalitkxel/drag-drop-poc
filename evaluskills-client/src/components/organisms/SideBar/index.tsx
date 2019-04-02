import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import NavItem from '../../atoms/NavItem';
import ProfileBadge from '../../molecules/ProfileBadge';

// TODO: Make collapse work (Settings);
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
        <NavItem
          to="/dashboard"
          icon="th-large"
          label="Dashboard"
          active={location.pathname === '/dashboard'}
        />
        <NavItem
          to="/assessment-items"
          icon="edit"
          label="Assessment Items"
          active={location.pathname === '/assessment-items'}
        />

        <NavItem
          to="/instrument-templates"
          icon="sitemap"
          label="Instrument Template"
          active={location.pathname === '/instrument-templates'}
        />

        <NavItem
          to="/clients"
          icon="user"
          label="Clients"
          active={location.pathname === '/clients'}
        />

        <NavItem to="/users" icon="user" label="Users" active={location.pathname === '/users'} />
        <NavItem to="/setting" icon="cog" label="Setting">
          <ul>
            <li>
              <a href="settingUser.html">User</a>
            </li>
            <li>
              <a href="emailTemplate.html">Email Template</a>
            </li>
          </ul>
        </NavItem>
      </ul>
    </div>
  </nav>
);

export default withRouter(Sidebar);
