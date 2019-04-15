import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

interface Props {
  count: number;
  text: string;
  statement: string;
  behaviour: string;
  isSelected: boolean;
}
const QuestionItem: React.FunctionComponent<Props> = ({
  isSelected,
  count,
  text,
  statement,
  behaviour,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleStatement = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <div className="col-lg-12">
      <div className="ibox collapsed">
        <div className={isSelected ? 'ibox-title row selected' : 'ibox-title row'}>
          <div className="float-left bg-gray number mr-2">{count}</div>
          <div className="col-sm-10 inline">
            <h5 className="inline">{text}</h5>
          </div>
          <div className="ibox-tools">
            <a onClick={toggleStatement} className="collapse-link">
              <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
            </a>
          </div>
        </div>
        <div className="ibox-content row" style={{ display: display ? 'block' : 'none' }}>
          <h3>Statement</h3>
          <p>{statement}</p>
          <h3>Behavior</h3>
          <p>{behaviour}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
