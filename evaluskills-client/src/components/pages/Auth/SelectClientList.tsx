import qs from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { userType } from '../../../enums';
import SelectClientCard from './../../molecules/SelectClientCard';
const selectClientList = (props: any) => {
  const query = qs.parse(location.search) as { role: string };
  const user = JSON.parse(localStorage.getItem('user') || '');
  function Login() {
    props.history.push('/');
  }
  return (
    <form className="form w-100 pl-22">
      {query.role === userType.SUPER_ADMIN ? (
        <div className="client-item mb-3">
          <a className="clr-inherit" onClick={Login}>
            <div className="row ibox-content shadow">
              <div className="col-sm-12">
                <img className="d-inline-block mr-2" src="/img/Logo.svg" alt="client" />
                <p className="assesment-item-title d-inline-block mt-1">Continue as PGS Admin</p>
              </div>
            </div>
          </a>
        </div>
      ) : null}
      <h1 className="font-bold mb-4 mt-0">Select Client</h1>
      {user &&
        user.clients &&
        user.clients.map((item: any, i: number) => {
          return <SelectClientCard key={i} {...item} />;
        })}
    </form>
  );
};
export default withRouter(selectClientList);
