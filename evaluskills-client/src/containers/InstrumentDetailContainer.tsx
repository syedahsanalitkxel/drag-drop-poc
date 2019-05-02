import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import InstrumentDetailTemplate from '../components/pages/InstrumentDetail';
import RouteParamsInterface from '../interfaces/RouteParams';
import { ClientInstruments } from '../interfaces/Instruments';
import AssessmentItemInterface from '../interfaces/AssessmentItem';
import EvaluatorInterface from '../interfaces/Evaluator';
import ParticipantInterface from '../interfaces/Participant';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import Spinner from '../components/atoms/Spinner';
import InstrumentFiltersInterface from '../interfaces/InstrumentFilters';
import { PageDetailsInterface } from '../api/ResponseInterface';
import ErrorContext from '../context/ErrorContext';
import {
  addEvaluator,
  deleteInstrument,
  getInstrumentById,
  removeEvaluator,
  sendInstrument,
  updateInstrument,
  updateInstrumentAssessments,
} from '../services/instrumentService';
import { getActiveClient, USER_ROLE } from '../utils';

const AssessmentItems: AssessmentItemInterface[] = [];

const participantsList: ParticipantInterface[] = [];
const InstrumentList: any[] = [];

interface State {
  AssessmentItems: AssessmentItemInterface[];
  participantsList: ParticipantInterface[];
  InstrumentList: any[];
  filters: InstrumentFiltersInterface;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}
const defaultFilters: InstrumentFiltersInterface = {
  pageNumber: 1,
  pageSize: 10,
  type: '',
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

const InstrumentDetailContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({
  history,
  match,
}) => {
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    AssessmentItems,
    InstrumentList,
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
    participantsList,
    resetPager: false,
  });

  useEffect(() => {
    fetchInstrumentById(match.params.id);
  }, [match.path, state.filters]);

  async function fetchInstrumentById(id: any) {
    try {
      setState({ ...state, isLoading: true });
      const data: any = await getInstrumentById(id);
      console.log(data);
      data.instrumentItems.map((assessmentItem: any) => {
        assessmentItem.definition = assessmentItem.title;
      });
      setState({
        ...state,
        AssessmentItems: data,
        InstrumentList: data.instrumentItems,
        isLoading: false,
        pageDetails: data.pageDetails,
        participantsList: data.participants,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function viewEvaluation(evaluationId: string) {
    console.log(evaluationId);
  }

  async function sendInstruments(evaluationId: string, action?: string) {
    try {
      if (action === 'activate') {
        const data: any = await sendInstrument(evaluationId);
        fetchInstrumentById(evaluationId);
      } else if (action === 'cancel') {
        const data: any = await deleteInstrument(evaluationId);
        history.push('/instrument');
      }
    } catch (error) {
      setState({ ...state, isLoading: false });
      errorContext.setError(error, true);
    }
  }

  function filterAssessmentData(values: any) {
    return values.map((assesment: any) => {
      delete assesment.definition;
      delete assesment.category;
      delete assesment.competency;
      delete assesment.questionType;
      delete assesment.title;
      delete assesment.type;
      delete assesment.isFaithBased;
      delete assesment.itemStatus;
      delete assesment.itemId;
      delete assesment.isSystemDefined;
      assesment.commentsRequired = true;
      return assesment;
    });
  }

  async function addingEvaluator(values: any, token: any) {
    const data: any = await addEvaluator(values, token);
    if (data) {
      fetchInstrumentById(match.params.id);
    }
  }

  async function addingAssessments(values: any) {
    const assessmentData = { instrumentItems: values, clientId: 0 };
    if (USER_ROLE.isClientAdmin() || USER_ROLE.isSuperAdmin()) {
      if (getActiveClient()) {
        assessmentData.clientId = getActiveClient();
      }
    }
    const filterData = filterAssessmentData(assessmentData.instrumentItems);
    assessmentData.instrumentItems = filterData;
    console.log(assessmentData);
    const data: any = await updateInstrumentAssessments(assessmentData, match.params.id);
    if (!data.fail) {
      fetchInstrumentById(match.params.id);
    }
  }

  async function removingEvaluator(token: any) {
    const data: any = await removeEvaluator(token);
    if (data) {
      fetchInstrumentById(match.params.id);
    }
  }

  async function updatingReminder(values: any) {
    if (USER_ROLE.isClientAdmin() || USER_ROLE.isSuperAdmin()) {
      if (getActiveClient()) {
        values.clientId = getActiveClient();
      }
    }
    // const data: any = await updateInstrument(match.params.id, values);
    // if (data) {
    //   fetchInstrumentById(match.params.id);
    // }
  }

  async function actionHandler(values?: any, evaluationId?: string, action?: string, token?: string) {
    try {
      if (action === 'add' && values && token) {
        addingEvaluator(values, token);
      } else if (action === 'remove' && evaluationId && token) {
        removingEvaluator(token);
      } else if (action === 'addAssessment' && values) {
        addingAssessments(values);
      } else if (action === 'addReminders' && values) {
        updatingReminder(values);
      }
    } catch (error) {
      setState({ ...state, isLoading: false });
      errorContext.setError(error, true);
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    return (
      <InstrumentDetailTemplate
        instruments={state.AssessmentItems}
        view={viewEvaluation}
        participants={state.participantsList}
        AssessmentItems={state.InstrumentList}
        actionHandler={actionHandler}
        sendInstrument={sendInstruments}
      />
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentDetailContainer);
