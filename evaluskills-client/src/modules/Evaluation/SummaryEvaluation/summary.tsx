import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Pager from '../../../components/molecules/Pager';
import EvaluationClientHolder from '../../../components/organisms/ClientHolder';
import EvaluatorAssessmentItem from './EvaluationCommentItem';
import GuestTemplate from '../../../components/templates/GuestTemplate';
import FooterGuest from '../../../components/organisms/FooterGuest';
import RouteParamsInterface from '../../../interfaces/RouteParams';
import { Summary } from '../interface';
import { RouteComponentProps, withRouter } from 'react-router';
import base64 from 'base-64';
interface Props extends RouteComponentProps {
  data: Summary;
  pageDetails: any;
  filterHandler: (filters: any) => void;
  resetPager: boolean;
  match: any;
  submitSummarydata: () => void;
}

const EvaluationSummary: React.FunctionComponent<Props> = ({
  filterHandler,
  pageDetails,
  resetPager,
  data,
  history,
  match,
  submitSummarydata,
}) => {
  const [displayModal, setDisplayModal] = useState(false);
  const toggleModal = () => {
    setDisplayModal(!displayModal);
  };
  const clientHolderObj = {
    name: data.participantsFirstName + ' ' + data.participantsLastName,
    designation: data.participantRole,
  };
  let flag = data.evaluationItemElements && data.evaluationItemElements.filter(obj => obj.status !== 'Completed');

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
  const buttonsConfig2 = [
    {
      text: 'Back',
      src: '',
      callback: handleBack,
      classes: 'btn btn-dark',
    },
  ];
  function goQuestion(itemID?: string) {
    const idencoded = base64.encode(data.instrumentId ? data.instrumentId : '');
    const itemEncoded = base64.encode(itemID ? itemID : '');
    history.push('/evaluation/' + match.params.token + '/questions/' + idencoded + '/' + itemEncoded);
  }
  function handleSubmit() {
    setDisplayModal(!displayModal);
    submitSummarydata();
  }
  function handleBack() {
    history.goBack();
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
                  <strong>{data.participantsFirstName + ' ' + data.participantsLastName}</strong>
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
                Overall Scale <strong className="font-bold">{data.overallScore}</strong>
              </strong>
            </div>
          </div>
          <div className="row">
            {data.evaluationItemElements.map((item, i) => {
              return <EvaluatorAssessmentItem key={i} goQuestion={goQuestion} {...item} />;
            })}
          </div>

          <Pager
            pageSize={pageDetails.pageSize || 5}
            totalRecords={pageDetails.totalCount || 5}
            pageNumber={pageDetails.currentPage}
            onPageChanged={number => filterHandler({ number })}
            shouldReset={resetPager}
          />
        </div>
        <FooterGuest buttonsConfig={flag.length > 0 ? buttonsConfig2 : buttonsConfig} />
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
              <a href="#" className="btn btn-default pr-4 pl-4" data-dismiss="modal">
                No
              </a>
              <a onClick={handleSubmit} href="#" className="btn btn-default pr-4 pl-4" data-dismiss="modal">
                Yes
              </a>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </GuestTemplate>
  );
};
export default withRouter(EvaluationSummary);
