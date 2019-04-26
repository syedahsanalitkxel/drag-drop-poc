import qs from 'query-string';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { userType } from '../../../enums';
import SelectClientCard from './../../molecules/SelectClientCard';
const selectClientList = (props: any) => {
  const query = qs.parse(location.search) as { role: string };
  const user = localStorage.getItem('user') || '';
  const tempUser = JSON.parse(user);
  const clientArray = tempUser.clients;
  function goToLogin() {
    props.history.push('/');
  }
  function handleClientClick() {}
  return (
    <form className="form w-100 pl-22">
      <h1 className="font-bold mb-4 mt-0">Select Client</h1>
      {query.role === userType.SUPER_ADMIN ? (
        <div className="client-item mb-3">
          <a className="clr-inherit" onClick={goToLogin}>
            <div className="row ibox-content shadow">
              <div className="col-sm-12">
                <img className="d-inline-block mr-2" src="/img/Logo.svg" alt="client" />
                <p className="assesment-item-title d-inline-block mt-1">Continue as super admin</p>
              </div>
            </div>
          </a>
        </div>
      ) : null}
      {clientArray.map((item: any, i: number) => {
        return <SelectClientCard key={i} {...item} />;
      })}
    </form>
  );
};
export default withRouter(selectClientList);
