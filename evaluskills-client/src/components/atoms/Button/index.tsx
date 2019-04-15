import React from 'react';
interface Props {
  index: number;
  callback: () => void;
  text: string;
  classes: string;
  src: string;
}

const Button: React.FunctionComponent<Props> = ({ index, callback, text, classes, src }) => {
  return (
    <button key={index} onClick={() => callback()} className={classes}>
      {text} {src && <img src={src} alt="arrow" />}
    </button>
  );
};
export default Button;
