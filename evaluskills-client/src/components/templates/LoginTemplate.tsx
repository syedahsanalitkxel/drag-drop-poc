import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const LoginTemplate: React.FunctionComponent<Props> = ({ children }) => (
  <div className="login-wrapper p-0">
    <div className="container height-100">
      <div className="wapper wrapper-content animated fadeInRight p-0 height-100">
        <div className="row height-100">
          <div className="col-sm-6 height-100">
            <div className="d-flex flex-wrap align-content-center height-100">
              <NavLink className="logo d-inline-block" to="/">
                <img className="img-fluid" src="img/login/Logo.png" alt="Logo" />
              </NavLink>
            </div>
          </div>
          <div className="col-sm-6 height-100">
            <div className="d-flex flex-wrap align-content-center height-100">{children}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginTemplate;
