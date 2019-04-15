import React from 'react';
interface Props {
  score: string;
  classes: string;
}
const ScoreBox: React.FunctionComponent<Props> = ({ score, classes }) => {
  return <div className={classes}>{score}</div>;
};
export default ScoreBox;
