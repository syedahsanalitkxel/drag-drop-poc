import React, { useState } from 'react';

import classnames from 'classnames';

import './RadioButton.scss';

interface Props {
  name: string;
  value: string;
  children: string;
  currentSelection?: string;
  onChange?: (value: string, name?: string) => void;
}

const RadioButton: React.FunctionComponent<Props> = ({
  name,
  value,
  children,
  currentSelection,
  onChange,
}) => {
  const [hover, setHover] = useState(false);

  const mouseEvent = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.type === 'mouseenter') {
      setHover(true);
    } else if (event.type === 'mouseleave') {
      setHover(false);
    }
  };

  function select(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value, event.target.name);
    }
  }

  return (
    <div className="i-checks d-inline m-r-25">
      <label onMouseEnter={mouseEvent} onMouseLeave={mouseEvent}>
        <div
          className={classnames([
            'iradio_square-green',
            { hover: hover, checked: currentSelection === value },
          ])}
        >
          <input
            type="radio"
            value={value}
            name={name}
            checked={currentSelection === value}
            onChange={select}
          />
          <ins className="iCheck-helper" />
        </div>
        <span className="iradio-text">{children}</span>
      </label>
    </div>
  );
};

export default RadioButton;
