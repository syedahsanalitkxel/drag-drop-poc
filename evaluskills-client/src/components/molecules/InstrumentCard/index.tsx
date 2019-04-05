import React, { ReactNode } from 'react';

interface Props {
  header: string;
  children: {
    content: ReactNode;
    actions?: ReactNode;
    bar?: ReactNode;
  };
}

const InstrumentCard: React.FunctionComponent<Props> = ({ header, children }) => {
  const { content, actions, bar } = children;

  return (
    <div className="es-card">
      <div className="row">
        <div className="col-md-8">
          <p className="es-card-title">
            {header}&nbsp;<span className="badge badge-warning">Draft</span>
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
  );
};
export default InstrumentCard;
