import React, { ReactNode } from 'react';

interface Props {
  children: {
    content: ReactNode;
  };
}

const AssessmentCard: React.FunctionComponent<Props> = ({ children }) => {
  const { content } = children;

  return <React.Fragment>{content}</React.Fragment>;
};
export default AssessmentCard;
