import React, { ReactNode } from 'react';

interface Props {
  item: any;
  header: string;
  children: {
    content: ReactNode;
    actions?: ReactNode;
    bar?: ReactNode;
    view: (id: any) => void;
  };
}

const InstrumentCard: React.FunctionComponent<Props> = ({ item, header, children }) => {
  const { content, actions, bar, view } = children;

  const viewDetail = (event: any) => {
    view(item.id);
  };

  return (
    <React.Fragment>
      <div className="es-card" onClick={viewDetail}>
        <div className="row">
          <div className="col-md-8">
            <p className="es-card-title">
              {header}&nbsp;<span className="badge badge-warning">{item.status}</span>
            </p>
            <div className="row es-card-info">{content}</div>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <div className="es-card-button">{actions}</div>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <div className="assesment-item-button">{bar}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default InstrumentCard;
