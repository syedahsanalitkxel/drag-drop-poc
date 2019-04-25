import React from 'react';
interface Props {
  src: string;
  name: string;
}
const SelectClientCard: React.FunctionComponent<Props> = ({ src, name }) => {
  return (
    <div className="client-item mb-3">
      <a className="clr-inherit" href="#">
        <div className="row ibox-content shadow">
          <div className="col-sm-12">
            <img className="d-inline-block mr-2" src={src} alt="client" />
            <p className="assesment-item-title d-inline-block mt-1">{name}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
export default SelectClientCard;
