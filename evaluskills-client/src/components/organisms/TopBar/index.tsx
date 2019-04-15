import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AuthContextConsumer } from '../../../modules/Auth/authContext';

const TopBar = () => (
  <div className="row border-bottom white-bg">
    <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
      <div className="navbar-header">
        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary ">
          <FontAwesomeIcon icon="bars" color="white" />
        </a>
      </div>

      <ul className="nav navbar-top-links navbar-right">
        <li className="dropdown">
          <a className="dropdown-toggle count-info" data-toggle="dropdown">
            <FontAwesomeIcon icon="bell" />
            &nbsp;<span className="label label-primary">8</span>
          </a>
          <ul className="dropdown-menu dropdown-alerts">
            <li>
              <a href="mailbox.html" className="dropdown-item">
                <div>
                  <FontAwesomeIcon icon="envelope" fixedWidth={true} />
                  You have 16 messages
                  <span className="float-right text-muted small">4 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider" />
            <li>
              <a href="profile.html" className="dropdown-item">
                <div>
                  <i className="fa fa-twitter fa-fw" />3 New Followers
                  <span className="float-right text-muted small">12 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider" />
            <li>
              <a href="grid_options.html" className="dropdown-item">
                <div>
                  <FontAwesomeIcon icon="upload" fixedWidth={true} />
                  Server Rebooted
                  <span className="float-right text-muted small">4 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="dropdown-divider" />
            <li>
              <div className="text-center link-block">
                <a href="notifications.html" className="dropdown-item">
                  <strong>See All Alerts</strong>
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <AuthContextConsumer>
            {({ logout }) => (
              <a onClick={() => logout()}>
                <FontAwesomeIcon icon="sign-out-alt" /> Log out
              </a>
            )}
          </AuthContextConsumer>
        </li>
      </ul>
    </nav>
  </div>
);

export default TopBar;
