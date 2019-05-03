import React from 'react';
interface Props {
  index: number;
  callback: () => void;
  text: string;
  classes: string;
  src: string;
  disabled?: boolean;
}

const Button: React.FunctionComponent<Props> = ({ disabled, index, callback, text, classes, src }) => {
  return (
    <button key={index} disabled={disabled} onClick={() => callback()} className={classes}>
      {text} {src && <img src={src} alt="arrow" />}
    </button>
  );
};
export default Button;
