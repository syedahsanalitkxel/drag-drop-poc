import React, { useState } from 'react';
import Pager from '../../molecules/Pager';
import GuestTemplate from '../../templates/GuestTemplate';
import EvaluatorAssessmentItem from '../../organisms/EvaluationCommentItem';

const EvaluatorComment = () => {
  const assessmentArray = [
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2 bg-blue',
    },
  ];
  return (
    <GuestTemplate>
      <div>
        <div className="row">
          <div className="col-lg-9 col-md-9">
            <h2 className="font-weight-bold">Jasmine Rassol </h2>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Assessments</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">360° Leadership Instrument</a>
              </li>
              <li className="breadcrumb-item active">
                <strong>Jhon James</strong>
              </li>
            </ol>
          </div>
          <div className="col-sm-3 mt-3">
            <strong className="count">
              Overall Scale <strong className="font-bold">4.5</strong>
            </strong>
          </div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row mb-2 evo-head">
            <div className="col-md-6">
              <h3>Assessments</h3>
            </div>
            <div className="col-md-6 text-right">
              <div className="created d-inline">
                <span className="date-title inline ml-2">Date Assessed:</span>
                <span className="date inline font-bold ml-2">20-09-2019</span>
              </div>
              <div className="created ml-2 d-inline">
                <span className="date-title inline ml-2">Date Received:</span>
                <span className="date inline font-bold ml-2">20-09-2019</span>
              </div>
            </div>
          </div>
          <div className="row">
            {assessmentArray.map((item, i) => {
              return <EvaluatorAssessmentItem key={i} {...item} />;
            })}
          </div>
          <Pager />
        </div>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorComment;
