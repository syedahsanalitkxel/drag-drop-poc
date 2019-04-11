import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import GuestTemplate from '../../templates/GuestTemplate';

const EvaluatorQuestion = () => {
  const [display, setDisplay] = useState(false);
  const toggleStatement = (e: any) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader pr-0 pl-0">
          <div className="eval-header row">
            <div className="client-holder col-sm-6">
              <div className="inline img-holder mr-4 vertical-align">
                <img src="img/icons/Profile pic.png" alt="profile" />
              </div>
              <div className="inline txt-holder">
                <p className="mb-0">(Manager) From Tkxel</p>
                <h2 className="mt-0 font-bold">Jasmine Rassol</h2>
              </div>
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
          <div className="col-lg-12">
            <div className="ibox collapsed">
              <div className="ibox-title row">
                <div className="float-left bg-gray number mr-2">1</div>
                <div className="col-sm-10 inline">
                  <h5 className="inline">
                    Level of proficiency significantly exceeds expectations.{' '}
                  </h5>
                </div>
                <div className="ibox-tools">
                  <a onClick={toggleStatement} className="collapse-link">
                    <FontAwesomeIcon icon={display ? faChevronUp : faChevronDown} />
                  </a>
                </div>
              </div>
              <div className="ibox-content row" style={{ display: display ? 'block' : 'none' }}>
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
                  <NavLink to="/evaluation-summary" className="btn btn-primary">
                    Next <img src="img/icons/arrow.svg" alt="arrow" />
                  </NavLink>
                </div>
              </div>
            </div>
            <a href="#" className="m-10 position-absolute left bottom-logo">
              <img src="img/icons/main-pas-logo.png" />
            </a>
          </div>
        </div>
      </div>
    </GuestTemplate>
  );
};
export default EvaluatorQuestion;
