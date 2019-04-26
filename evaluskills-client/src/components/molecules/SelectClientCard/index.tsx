import React from 'react';
import Api from './../../../api';
const api = new Api();
interface Props {
  clientLogo: string;
  clientId: string;
  clientName: string;
}
const SelectClientCard: React.FunctionComponent<Props> = ({ clientId, clientName, clientLogo }) => {
  function handleClick() {
    console.log(clientId);
    getSelectedClient();
  }
  async function getSelectedClient() {
    const result = await api.get('Accounts/SelectClient', undefined, { clientId: clientId });
    console.log(result);
  }
  return (
    <div className="client-item mb-3">
      <a className="clr-inherit" onClick={handleClick}>
        <div className="row ibox-content shadow">
          <div className="col-sm-12">
            <img className="d-inline-block mr-2" src={clientLogo} alt="client" />
            <p className="assesment-item-title d-inline-block mt-1">{clientName}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
export default SelectClientCard;
