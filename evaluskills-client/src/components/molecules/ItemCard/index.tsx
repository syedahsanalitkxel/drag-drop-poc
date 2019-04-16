import React, { ReactNode } from 'react';

interface Props {
  header: string;
  children: {
    content: ReactNode;
    actions?: ReactNode;
  };
}

const ItemCard: React.FunctionComponent<Props> = ({ header, children }) => {
  const { content, actions } = children;

  return (
    <div className="es-card">
      <div className="row">
        <div className="col-md-9">
          <p className="es-card-title">{header}</p>
          <div className="row es-card-info">{content}</div>
        </div>
        <div className="col-md-3 d-flex align-items-center align-content-end">
          <div className="es-card-button">{actions}</div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
