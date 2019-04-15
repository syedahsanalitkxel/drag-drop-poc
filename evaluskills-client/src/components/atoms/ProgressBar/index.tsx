import React from 'react';

interface Props {
  progress: number;
}

const ProgressBar: React.FunctionComponent<Props> = ({ progress }) => {
  return (
    <React.Fragment>
      <span className="progress-info">{progress}% Completed</span>
      <div className="progress">
        <div style={{ width: `${progress}%` }} className="progress-bar">
          {progress}%
        </div>
      </div>
    </React.Fragment>
  );
};
export default ProgressBar;
