import React from 'react';
import { withRouter } from 'react-router-dom';

import ProgressBar from '../../components/atoms/ProgressBar';
import EvaluationClientHolder from '../../components/organisms/ClientHolder';
import QuestionItem from '../../components/organisms/EvaluationQuestionItem';
import FooterGuest from '../../components/organisms/FooterGuest';
import GuestTemplate from '../../components/templates/GuestTemplate';

const EvaluatorQuestion = (props: any) => {
  const questionArray = [
    {
      isSelected: false,
      text: 'Level of proficiency significantly exceeds expectations.',
      statement:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      behaviour:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
    },
    {
      isSelected: false,
      text:
        'Good attentiveness to speaker with thoughtful &amp; reflective responses. Level\n' +
        '                    of proficiency with competency is higher than expected &amp; clearly above\n' +
        '                    average.',
      statement:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      behaviour:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
    },
    {
      isSelected: true,
      text:
        'Good attentiveness to speaker with thoughtful &amp; reflective responses. Level\n' +
        '                    of proficiency with competency is higher than expected &amp; clearly above\n' +
        '                    average.',
      statement:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      behaviour:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
    },
    {
      isSelected: false,
      text:
        'Good attentiveness to speaker with thoughtful &amp; reflective responses. Level\n' +
        '                    of proficiency with competency is higher than expected &amp; clearly above\n' +
        '                    average.',
      statement:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      behaviour:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
    },
    {
      isSelected: false,
      text:
        'Good attentiveness to speaker with thoughtful &amp; reflective responses. Level\n' +
        '                    of proficiency with competency is higher than expected &amp; clearly above\n' +
        '                    average.',
      statement:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      behaviour:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
    },
  ];
  const clientHolderObj = {
    name: 'Jasmine Rassol',
    designation: '(Manager) From Tkxel',
  };
  const buttonsConfig = [
    {
      text: 'Skip for now',
      src: '',
      callback: handleNext,
      classes: 'btn btn-dark',
    },
    {
      text: 'Next',
      src: '/img/icons/arrow.svg',
      callback: handleNext,
      classes: 'btn btn-primary',
    },
  ];

  function handleNext() {
    const { history } = props;
    history.push('/evaluation/summary');
  }
  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader pr-0 pl-0">
          <div className="eval-header row">
            <div className="col-sm-6">
              <EvaluationClientHolder {...clientHolderObj} />
            </div>
            <div className="col-sm-6">
              <div className="row mt-3">
                <div className="col-sm-8">
                  <ProgressBar progress={20} />
                </div>
                <div className="col-sm-4 mt-3">
                  <span className="font-bold">
                    Assessment Item <a href="#">1</a> of 20
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ques-container">
          <h2 className="font-bold mb-4">
            1- Contributes to and operates within a team to accomplish tasks and complete assignments within a
            collaborate and professional environment.
          </h2>
          {questionArray.map((item, i) => {
            return <QuestionItem key={i} count={i + 1} {...item} />;
          })}

          <h2 className="font-bold mb-3">Comments</h2>
          <div className="form-group">
            <textarea className="form-control" placeholder="Add Comments" defaultValue={''} />
          </div>
          <FooterGuest buttonsConfig={buttonsConfig} />
        </div>
      </div>
    </GuestTemplate>
  );
};
export default withRouter(EvaluatorQuestion);
