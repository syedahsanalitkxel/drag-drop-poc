import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Pager from '../../molecules/Pager';
import EvaluationClientHolder from '../../organisms/EvaluationClientHolder';
import EvaluatorAssessmentItem from '../../organisms/EvaluationCommentItem';
import GuestTemplate from '../../templates/GuestTemplate';

const EvaluationSummary = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const toggleModal = (e: any) => {
    e.preventDefault();
    setDisplayModal(!displayModal);
  };
  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader">
          <div className="eval-header row">
            <div className="col-sm-6">
              <h3>Your Evaluation for</h3>
              <EvaluationClientHolder />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-9">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Evaluations</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">360° Leadership Assessment</a>
                </li>
                <li className="breadcrumb-item active">
                  <strong>Jasmine Rassol</strong>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="wrapper wrapper-content animated fadeInRight">
          <div className="row mb-2 evo-head">
            <div className="col-md-6">
              <h3>Assessments</h3>
            </div>
            <div className="col-md-6 text-right">
              <strong className="count">
                Overall Scale <strong className="font-bold">4.5</strong>
              </strong>
            </div>
          </div>
          <div className="row">
            <EvaluatorAssessmentItem />
            <div className="col-lg-12">
              <div className="ibox">
                <div className="ibox-content in-progress m-0">
                  <a href="#">
                    <div className="float-right">
                      <span className="badge badge-warning">In Progress</span>
                    </div>
                    <div className="txt">
                      <p className="m-0">
                        Conscious knowledge of one’s own character, feelings, motives, and desires.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Observing and directing the execution of tasks, projects, or activities by
                    others.professional environment.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">03</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content m-0">
                  <h3>Comment</h3>
                  <p>
                    Very attentive to the speaker and highly thoughtful and reflective with
                    responses. Level of proficiency with this competency is much higher than
                    expected and very much higher than average.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Has a set of moral principles used in the job in accordance with the culture of
                    the organization.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">02</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content m-0">
                  <h3>Comment</h3>
                  <p>
                    Very attentive to the speaker and highly thoughtful and reflective with
                    responses. Level of proficiency with this competency is much higher than
                    expected and very much higher than average.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox">
                <div className="ibox-content in-progress m-0">
                  <a href="#">
                    <div className="float-right">
                      <span className="badge badge-warning">In Progress</span>
                    </div>
                    <div className="txt">
                      <p className="m-0">
                        Pays attention to someone to hear what is being said and understand that it
                        is serious, important, or true.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="ibox collapsed">
                <div className="ibox-title">
                  <h5>
                    Contributes to and operates within a team to accomplish tasks and complete
                    assignments within a collaborate and professional environment.
                  </h5>
                  <div className="ibox-tools">
                    <div className="inline number mr-2">02</div>
                    <a className="collapse-link">
                      <FontAwesomeIcon icon={faChevronUp} />
                    </a>
                  </div>
                </div>
                <div className="ibox-content m-0">
                  <h3>Comment</h3>
                  <p>
                    Very attentive to the speaker and highly thoughtful and reflective with
                    responses. Level of proficiency with this competency is much higher than
                    expected and very much higher than average.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Pager />
        </div>
        <div className="bottom-bar fixed-bottom p-10">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-right">
                <NavLink to="/evaluation/questions" className="btn btn-dark">
                  Back
                </NavLink>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#verification"
                >
                  Submit <img src="/img/icons/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          </div>
          <a href="#" className="m-10 position-absolute left bottom-logo">
            <img src="/img/icons/main-pas-logo.png" alt="logo" />
          </a>
        </div>
        <Modal isOpen={displayModal}>
          <ModalBody>
            <div className="modal-body pb-0">
              <div className="text-center justify-content-center">
                <img src="/img/icons/confirmation.svg" alt="Confirmation" />
              </div>
              <div className="form-group row">
                <h2 className="col-sm-12 font-bold text-center">
                  Are you sure you want to submit?
                </h2>
                <div className="col-sm-11 d-flex align-items-center" />
              </div>
            </div>
            <div className="modal-footer text-center justify-content-center border-0 pt-0">
              <a
                onClick={toggleModal}
                href="#"
                className="btn btn-default pr-4 pl-4"
                data-dismiss="modal"
              >
                No
              </a>
              <NavLink to="/evaluation/result" className="btn btn-primary pr-4 pl-4">
                Yes
              </NavLink>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </GuestTemplate>
  );
};
export default EvaluationSummary;
