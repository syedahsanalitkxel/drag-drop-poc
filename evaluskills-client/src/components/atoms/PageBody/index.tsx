import React, { ReactNode } from 'react';

import classNames from 'classnames';

interface Props {
  card?: boolean;
  children: ReactNode
};

const PageBody: React.FunctionComponent<Props> = ({ card, children }) => (
  <div className={classNames(["wrapper wrapper-content animated fadeInRight", { 'es-card': card }])}>
    {children}
  </div>
);

PageBody.defaultProps = {
  card: false,
}

export default PageBody;
