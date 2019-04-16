import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Pager from '../../components/molecules/Pager';
import EvaluationClientHolder from '../../components/organisms/ClientHolder';
import EvaluatorAssessmentItem from '../../components/organisms/EvaluationCommentItem';
import GuestTemplate from '../../components/templates/GuestTemplate';
import FooterGuest from '../../components/organisms/FooterGuest';
import { withRouter } from 'react-router-dom';

const EvaluationSummary = (props: any) => {
  const [displayModal, setDisplayModal] = useState(false);
  const toggleModal = () => {
    setDisplayModal(!displayModal);
  };
  const clientHolderObj = {
    name: 'Jasmine Rassol',
    designation: '(Manager) From Tkxel',
  };
  const assessmentArray = [
    {
      isInProgress: false,
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      isInProgress: false,
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      isInProgress: false,
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
    {
      isInProgress: true,
      text: 'Receives feedback from others and uses the feedback to improve performance.',
      comment:
        'Very attentive to the speaker and highly thoughtful and reflective with responses. Level\n' +
        '            of proficiency with this competency is much higher than expected and very much higher\n' +
        '            than average.',
      score: '02',
      classes: 'inline number mr-2',
    },
  ];
  const buttonsConfig = [
    {
      text: 'Back',
      src: '',
      callback: handleBack,
      classes: 'btn btn-dark',
    },
    {
      text: 'Submit',
      src: '/img/icons/arrow.svg',
      callback: toggleModal,
      classes: 'btn btn-primary',
    },
  ];
  function handleBack() {
    const { history } = props;
    history.push('/evaluation/questions');
  }
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
          </div>
          {/*<Pager />*/}
        </div>
        <FooterGuest buttonsConfig={buttonsConfig} />
        <Modal isOpen={displayModal}>
          <ModalBody>
            <div className="modal-body pb-0">
              <div className="text-center justify-content-center">
                <img src="/img/icons/confirmation.svg" alt="Confirmation" />
              </div>
              <div className="form-group row">
                <h2 className="col-sm-12 font-bold text-center">Are you sure you want to submit?</h2>
                <div className="col-sm-11 d-flex align-items-center" />
              </div>
            </div>
            <div className="modal-footer text-center justify-content-center border-0 pt-0">
              <a onClick={toggleModal} href="#" className="btn btn-default pr-4 pl-4" data-dismiss="modal">
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
export default withRouter(EvaluationSummary);