import React, { Component, Fragment } from 'react';
import Editcomponent from '../AddAssessment';
const EditAssessment: React.FunctionComponent<any> = ({
  assessments,
  filterAssessments,
  add,
  edit,
  remove,
}) => {
  return <Editcomponent edit={true} />;
};

export default EditAssessment;
