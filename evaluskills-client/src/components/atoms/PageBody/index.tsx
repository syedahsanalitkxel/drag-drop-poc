import React, { ReactNode } from 'react';

import classNames from 'classnames';

interface Props {
  card?: boolean;
  children: ReactNode;
  className?: string;
}

const PageBody: React.FunctionComponent<Props> = ({ card, children, className }) => {
  const classes = classNames([
    'wrapper wrapper-content animated fadeInRight',
    { 'es-card': card },
    className,
  ]);
  return <div className={classes}>{children}</div>;
};

PageBody.defaultProps = {
  card: false,
};

export default PageBody;
