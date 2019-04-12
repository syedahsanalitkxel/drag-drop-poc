import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import EvaluationClientHolder from '../../organisms/EvaluationClientHolder';
import GuestTemplate from '../../templates/GuestTemplate';
import QuestionItem from '../../organisms/EvaluationQuestionItem';

const EvaluatorQuestion = () => {
  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader pr-0 pl-0">
          <div className="eval-header row">
            <div className="col-sm-6">
              <EvaluationClientHolder />
            </div>
            <div className="col-sm-6">
              <div className="row mt-3">
                <div className="col-sm-8">
                  <span className="progress-info">10% Completed</span>
                  <div className="progress">
                    <div style={{ width: '10%' }} className="progress-bar">
                      10%
                    </div>
                  </div>
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
          <QuestionItem />
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row">
                <div className="float-left bg-gray number mr-2">2</div>
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
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row">
                <div className="float-left bg-gray number mr-2">4</div>
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
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row">
                <div className="float-left bg-gray number mr-2">5</div>
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
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row">
                <div className="float-left bg-gray number mr-2">6</div>
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
          <div className="bottom-bar fixed-bottom p-10">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 text-right">
                  <a href="#" className="btn btn-dark">
                    Skip for now
                  </a>
                  <NavLink to="/evaluation/summary" className="btn btn-primary">
                    Next <img src="/img/icons/arrow.svg" alt="arrow" />
                  </NavLink>
                </div>
              </div>
            </div>
            <a href="#" className="m-10 position-absolute left bottom-logo">
              <img src="/img/icons/main-pas-logo.png" />
            </a>
          </div>
        </div>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorQuestion;
