import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Pager from '../../molecules/Pager';
import EvaluationClientHolder from '../../organisms/ClientHolder';
import EvaluatorAssessmentItem from '../../organisms/EvaluationCommentItem';
import GuestTemplate from '../../templates/GuestTemplate';

const EvaluationSummary = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const toggleModal = (e: any) => {
    e.preventDefault();
    setDisplayModal(!displayModal);
  };
  const clientHolderObj = {
    name: 'Jasmine Rassol',
    designation: '(Manager) From Tkxel',
  };
  const assessmentArray = [
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
    },
    {
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
    },
  ];
  return (
    <GuestTemplate>
      <div>
        <div className="PageHeader">
          <div className="eval-header row">
            <div className="col-sm-6">
              <h3>Your Evaluation for</h3>
              <EvaluationClientHolder {...clientHolderObj} />
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
            {assessmentArray.map((item, i) => {
              return <EvaluatorAssessmentItem key={i} {...item} />;
            })}

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
