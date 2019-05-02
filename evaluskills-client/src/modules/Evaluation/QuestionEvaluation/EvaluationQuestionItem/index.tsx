import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { ItemElementOptions } from '../../interface';

interface Props extends ItemElementOptions {
  count: number;
  text: string;
  elementIndex: number;
  selectedIndex?: number | string;

  handleSelect: (Elementindex: number, Elementobjectindex: number) => void;
}
// injectTapEventPlugin();
declare module 'react' {
  interface HTMLProps<T> {
    onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
  }
}
const QuestionItem: React.FunctionComponent<Props> = ({
  selectedIndex,
  handleSelect,
  elementIndex,
  scaling,
  isSelected,
  count,
  text,
  statement,
  behaviour,
  value,
}) => {
  const [display, setDisplay] = useState(false);
  const [selected, SetSelected] = useState(false);
  const toggleStatement = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  function handleNext() {
    handleSelect(elementIndex, count);
  }
  useEffect(() => {
    if (selectedIndex === value) {
      SetSelected(true);
    } else {
      SetSelected(false);
    }
  });
  return (
    <div className="col-lg-12">
      <div className="ibox collapsed" onClick={handleNext}>
        <div className={selected ? 'ibox-title row selected' : 'ibox-title row'}>
          <div className="float-left bg-gray number mr-2">{value}</div>
          <div className="col-sm-10 inline">
            <h5 className="inline">{statement}</h5>
          </div>
          <div className="ibox-tools">
            <a onClick={toggleStatement} className="collapse-link">
              <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
            </a>
          </div>
        </div>
        <div className="ibox-content row" style={{ display: display ? 'block' : 'none' }}>
          <h3>Behaviour</h3>
          <p>{behaviour}</p>
          <h3>Scaling</h3>
          <p>{scaling}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
