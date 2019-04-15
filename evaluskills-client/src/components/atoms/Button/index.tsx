import React from 'react';
interface Props {
  index: number;
  callback: () => void;
  text: string;
  classes: string;
  imgSrc: string;
}

const Button: React.FunctionComponent<Props> = ({ index, callback, text, classes, imgSrc }) => {
  return (
    <button key={index} onClick={() => callback()} className={classes}>
      {text}
      {imgSrc && <img src={imgSrc} alt="arrow" />}
    </button>
  );
};
export default Button;
