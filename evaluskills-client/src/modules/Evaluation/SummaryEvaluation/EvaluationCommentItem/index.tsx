import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import ScoreBox from '../../../../components/atoms/ScoreBox';
import { items } from '../../interface';
interface Props extends items {
  goQuestion: (itemID?: string) => void;
}

const EvaluatorAssessmentItem: React.FunctionComponent<Props> = ({
  comments,
  selectedValue,
  selectedText,
  evaluationItemElementId,
  statusId,
  status,
  goQuestion,
  instrumentItemId,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleComment = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  function handleClick() {
    goQuestion(instrumentItemId);
  }
  return (
    <div className="col-lg-12">
      {status !== 'Completed' ? (
        <div className="ibox" onClick={handleClick}>
          <div className="ibox-content in-progress m-0">
            <a href="#">
              <div className="float-right">
                <span className="badge badge-warning">Skiped</span>
              </div>
              <div className="txt">
                <p className="m-0">{selectedText}</p>
              </div>
            </a>
          </div>
        </div>
      ) : (
        <div className="ibox collapsed">
          <div className="ibox-title">
            <h5>{selectedText}</h5>
            <div className="ibox-tools">
              <ScoreBox classes={'inline number mr-2'} score={selectedValue ? selectedValue : ' '} />
              <a onClick={toggleComment} className="collapse-link">
                <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
              </a>
            </div>
          </div>
          <div className="ibox-content m-0" style={{ display: display ? 'block' : 'none' }}>
            <h3>Comment</h3>
            <p>{comments}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default EvaluatorAssessmentItem;
