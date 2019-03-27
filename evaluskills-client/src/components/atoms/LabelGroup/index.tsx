import React from 'react';
import { Badge } from 'reactstrap';
import { BadgeTypes } from '../../../enums';

interface Props {
  label: string;
  value: string;
  badge?: BadgeTypes;
}

const LabelGroup: React.FunctionComponent<Props> = ({ label, value, badge }) => (
  <React.Fragment>
    <span className="font-size-12">{label}: </span>
    {!badge && <span className="font-size-12 font-weight-bold">{value}</span>}
    {badge && <Badge color={badge}>{value}</Badge>}
  </React.Fragment>
);

export default LabelGroup;
