import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Card: React.FunctionComponent<Props> = ({ children }) => (
  <div className="es-card">
    {children}
  </div>
);

export default Card;
