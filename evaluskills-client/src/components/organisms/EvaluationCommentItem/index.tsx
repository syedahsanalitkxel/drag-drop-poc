import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
interface Props {
  text: string;
  comment: string;
  score: string;
}
const EvaluatorAssessmentItem: React.FunctionComponent<Props> = ({ text, comment, score }) => {
  const [display, setDisplay] = useState(false);
  const toggleComment = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <div className="col-lg-12">
      <div className="ibox collapsed">
        <div className="ibox-title">
          <h5>{text}</h5>
          <div className="ibox-tools">
            <div className="inline number mr-2">{score}</div>
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
    </div>
  );
};
export default EvaluatorAssessmentItem;
