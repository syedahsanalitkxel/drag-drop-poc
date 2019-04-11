import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

const QuestionItem = () => {
  const [display, setDisplay] = useState(false);
  const toggleStatement = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <div className="col-lg-12">
      <div className="ibox collapsed">
        <div className="ibox-title row">
          <div className="float-left bg-gray number mr-2">1</div>
          <div className="col-sm-10 inline">
            <h5 className="inline">Level of proficiency significantly exceeds expectations. </h5>
          </div>
          <div className="ibox-tools">
            <a onClick={toggleStatement} className="collapse-link">
              <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
            </a>
          </div>
        </div>
        <div className="ibox-content row" style={{ display: display ? 'block' : 'none' }}>
          <h3>Statement</h3>
          <p>
            Very attentive to the speaker and highly thoughtful and reflective with responses. Level
            of proficiency with this competency is much higher than expected and very much higher
            than average.
          </p>
          <h3>Behavior</h3>
          <p>
            Very attentive to the speaker and highly thoughtful and reflective with responses. Level
            of proficiency with this competency is much higher than expected and very much higher
            than average.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
