import React, { ChangeEvent, useState } from 'react';

import classnames from 'classnames';

import './RadioButton.scss';

interface Props {
  name: string;
  value?: string | number;
  children: React.ReactNode;
  currentSelection?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FunctionComponent<Props> = ({ name, value, children, currentSelection, onChange }) => {
  const [hover, setHover] = useState(false);

  const mouseEvent = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.type === 'mouseenter') {
      setHover(true);
    } else if (event.type === 'mouseleave') {
      setHover(false);
    }
  };

  const radioClasses = classnames(['iradio_square-green', { hover, checked: currentSelection === value }]);

  return (
    <div className="i-checks d-inline m-r-25">
      <label onMouseEnter={mouseEvent} onMouseLeave={mouseEvent}>
        <div className={radioClasses}>
          <input type="radio" value={value} name={name} checked={currentSelection === value} onChange={onChange} />
          <ins className="iCheck-helper" />
        </div>
        <span className="iradio-text">{children}</span>
      </label>
    </div>
  );
};

export default RadioButton;
