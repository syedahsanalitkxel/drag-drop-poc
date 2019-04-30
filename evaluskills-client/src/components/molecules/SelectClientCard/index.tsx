import React, { useContext } from 'react';
import { AuthContext } from '../../../modules/Auth/authContext';
import { getSelectedClient } from '../../../modules/Clients/service';
interface Props {
  clientLogo: string;
  clientId: string;
  clientName: string;
}
const SelectClientCard: React.FunctionComponent<Props> = ({ clientId, clientName, clientLogo }) => {
  const authContext = useContext(AuthContext);

  async function handleClick() {
    try {
      const result = await getSelectedClient(clientId);
      if (result && result.token) {
        authContext.authenticate(result.token, JSON.stringify(result));
      }
    } catch (e) {
      console.log('Something went wrong');
    }
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
