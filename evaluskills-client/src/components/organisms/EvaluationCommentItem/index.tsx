import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import ScoreBox from './../../atoms/ScoreBox';

interface Props {
  text: string;
  comment: string;
  score: string;
  classes: string;
  isInProgress: boolean;
}

const EvaluatorAssessmentItem: React.FunctionComponent<Props> = ({
  text,
  comment,
  score,
  classes,
  isInProgress,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleComment = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <div className="col-lg-12">
      {isInProgress ? (
        <div className="ibox">
          <div className="ibox-content in-progress m-0">
            <a href="#">
              <div className="float-right">
                <span className="badge badge-warning">In Progress</span>
              </div>
              <div className="txt">
                <p className="m-0">{text}</p>
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div className="ibox collapsed">
          <div className="ibox-title">
            <h5>{text}</h5>
            <div className="ibox-tools">
              <ScoreBox classes={classes} score={score} />
              <a onClick={toggleComment} className="collapse-link">
                <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
              </a>
            </div>
          </div>
          <div className="ibox-content m-0" style={{ display: display ? 'block' : 'none' }}>
            <h3>Comment</h3>
            <p>{comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default EvaluatorAssessmentItem;
