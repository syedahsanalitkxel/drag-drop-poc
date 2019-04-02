import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  icon?: IconProp;
  className?: string;
  id?: string;
  name?: string;
  actionHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: string;
}

const StyledButton = styled.button`
  margin-left: 5px;
`;

const IconButton: React.FunctionComponent<Props> = ({
  icon,
  className,
  id,
  name,
  actionHandler,
  children,
}) => (
  <StyledButton
    name={name}
    className={classNames(['btn', className])}
    onClick={actionHandler}
    id={id}
  >
    {icon && <FontAwesomeIcon icon={icon} />}
    &nbsp;
    {children}
  </StyledButton>
);

export default IconButton;
