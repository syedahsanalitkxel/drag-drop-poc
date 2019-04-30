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
import { addEvaluator, getInstrumentById } from '../services/instrumentService';

const AssessmentItems: AssessmentItemInterface[] = [
  {
    category: 'Character',
    competency: 'Team Player',
    definition: 'Receive feedback from others and uses the feedback to improve performance',
    id: 'uuid-12-321',
    type: 'Competency',
  },
  {
    category: 'Action',
    competency: 'Good Coder',
    definition: 'Has a set of moral principles used in job in accordance with the culture of organization',
    id: 'uuid-11-111',
    type: 'Influential',
  },
];

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

  async function actionHandler(values?: any, evaluationId?: string, action?: string, token?: string) {
    try {
      if (action === 'add' && values && token) {
        const data: any = await addEvaluator(values, token);
        if (data) {
          fetchInstrumentById(match.params.id);
        }
      } else if (action === 'remove' && evaluationId) {
        console.log(evaluationId);
      } else if (action === 'addAssessment' && values) {
        history.push(`/client-assessment-detail/${match.params.id}`);
        setState({ ...state, isLoading: false, AssessmentItems: values });
      }
      //   // setState({ ...state, isLoading: false });
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
        instruments={state.InstrumentList}
        view={viewEvaluation}
        participants={state.participantsList}
        AssessmentItems={state.InstrumentList}
        actionHandler={actionHandler}
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
