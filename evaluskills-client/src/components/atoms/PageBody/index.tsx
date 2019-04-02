import React, { ReactNode } from 'react';

import classNames from 'classnames';

interface Props {
  card?: boolean;
  wrapper?: boolean;
  children: ReactNode;
  className?: string;
}

const PageBody: React.FunctionComponent<Props> = ({ card, wrapper, children, className }) => {
  const classes = classNames([
    'wrapper wrapper-content animated fadeInRight',
    { 'es-card': card },
    { 'bordered-card': wrapper },
    className,
  ]);
  return <div className={classes}>{children}</div>;
};

PageBody.defaultProps = {
  card: false,
};

export default PageBody;
