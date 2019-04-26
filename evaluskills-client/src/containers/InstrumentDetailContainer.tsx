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
import { isEdit, isList } from '../utils/routerUtils';
import { getInstrumentById } from '../services/instrumentService';

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
const InstrumentList: ClientInstruments[] = [];

interface State {
  AssessmentItems: AssessmentItemInterface[];
  participantsList: ParticipantInterface[];
  InstrumentList: ClientInstruments[];
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

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    return (
      <InstrumentDetailTemplate
        instruments={state.InstrumentList}
        view={viewEvaluation}
        participants={state.participantsList}
        AssessmentItems={AssessmentItems}
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
