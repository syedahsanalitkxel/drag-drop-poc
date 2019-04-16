import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import ListCardItems from '../../organisms/ListCardItems';

interface Props {
  mode: 'new' | 'edit';
}

const assessments: AssessmentItemInterface[] = [
  {
    category: 'Character',
    competency: 'Team Player',
    definition: 'Receive feedback from others and uses the feedback to improve performance',
    id: 'uuid-12-321',
    type: 'Competency',
  },
  {
    category: 'Action',
    competency: 'Good Coder',
    definition: 'Has a set of moral principles used in job in accordance with the culture of organization',
    id: 'uuid-11-111',
    type: 'Influential',
  },
];

const AssessmentItemsList: React.FunctionComponent<Props> = ({ mode }) => {
  return (
    <React.Fragment>
      <div className="assessmentModalheader p-l-15 d-flex">
        <label className="col-form-label p-l-15 p-r-5">Search:</label>
        <select className="form-control col-sm-2" name="account" value="">
          <option>type</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
        <select className="form-control col-sm-2" name="account" value="">
          <option>Competency</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
        <select className="form-control col-sm-2" name="account" value="">
          <option>Category</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
        <select className="form-control col-sm-2" name="account" value="">
          <option>Fath Base</option>
          <option>option 2</option>
          <option>option 3</option>
          <option>option 4</option>
        </select>
        <div className="last d-flex">
          <input type="text" className="form-control col-sm-10 wCustom m-r-10" name="account" placeholder="Search" />
          <button className="btn btn-outline btn-primary" type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
      </div>

      <div className="m-t-20">
        <ListCardItems checkbox={true} titleKey="definition" listData={assessments} />
      </div>
    </React.Fragment>
  );
};

export default AssessmentItemsList;
