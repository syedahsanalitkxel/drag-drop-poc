import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ProgressBar from '../../atoms/ProgressBar';
import EvaluationClientHolder from '../../organisms/ClientHolder';
import QuestionItem from '../../organisms/EvaluationQuestionItem';
import FooterGuest from '../../organisms/FooterGuest';
import GuestTemplate from '../../templates/GuestTemplate';
import { withRouter } from 'react-router-dom';

const EvaluatorQuestion = (props: any) => {
  const questionArray = [
    {
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
      callback: handleNext,
    },
    {
      text: 'Next',
      callback: handleNext,
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
            1- Contributes to and operates within a team to accomplish tasks and complete
            assignments within a collaborate and professional environment.
          </h2>
          {questionArray.map((item, i) => {
            return <QuestionItem key={i} count={i + 1} {...item} />;
          })}
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row selected">
                <div className="float-left bg-gray number mr-2">3</div>
                <div className="col-sm-10">
                  <h5 className="inline">
                    Good attentiveness to speaker with thoughtful &amp; reflective responses. Level
                    of proficiency with competency is higher than expected &amp; clearly above
                    average.
                  </h5>
                </div>
                <div className="ibox-tools">
                  <a className="collapse-link">
                    <FontAwesomeIcon icon={faChevronUp} />
                  </a>
                </div>
              </div>
              <div className="ibox-content row">
                <h3>Statement</h3>
                <p>
                  Very attentive to the speaker and highly thoughtful and reflective with responses.
                  Level of proficiency with this competency is much higher than expected and very
                  much higher than average.
                </p>
                <h3>Behavior</h3>
                <p>
                  Very attentive to the speaker and highly thoughtful and reflective with responses.
                  Level of proficiency with this competency is much higher than expected and very
                  much higher than average.
                </p>
              </div>
            </div>
          </div>

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
