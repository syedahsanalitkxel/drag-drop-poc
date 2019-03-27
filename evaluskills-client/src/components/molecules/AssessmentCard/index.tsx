import React, { ReactNode } from 'react';

interface Props {
  header: string;
  children: {
    content: ReactNode;
    actions?: ReactNode;
  }
}

const AssessmentCard: React.FunctionComponent<Props> = ({ header, children }) => {
  const { content, actions } = children;

  return (
    <div className="es-card">
      <div className="row">
        <div className="col-md-10">
          <p className="es-card-title">
            {header}
          </p>
          <div className="row es-card-info">
            {content}
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <div className="es-card-button">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AssessmentCard;
