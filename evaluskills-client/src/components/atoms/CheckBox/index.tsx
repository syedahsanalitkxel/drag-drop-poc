import React, { useState } from 'react';

import classnames from 'classnames';

import './CheckBox.scss'

interface Props {
  name: string;
  value: string;
  children: string;
  currentSelection?: string;
  onChange?: (event: any) => void;
  isChecked?: boolean
}

const CheckBox: React.FunctionComponent<Props> = ({
  name, value, children, currentSelection, onChange, isChecked
}) => {
  const [hover, setHover] = useState(false);

  const mouseEvent = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.type === 'mouseenter') {
      setHover(true);
    } else if (event.type === 'mouseleave') {
      setHover(false);
    }
  }

  return (
    <div className="i-checks d-inline m-r-25">
      <label onMouseEnter={mouseEvent} onMouseLeave={mouseEvent} >
        <div className={classnames(['icheckbox_square-green', { 'hover': hover, 'checked': isChecked }])}>
          <input
            type="checkbox"
            value={value}
            name={name}
            checked={isChecked}
            onChange={onChange}
          />
          <ins className="iCheck-helper" />
        </div>
        <span className="iradio-text">{children}</span>
      </label>
    </div>
  )
}

export default CheckBox;
