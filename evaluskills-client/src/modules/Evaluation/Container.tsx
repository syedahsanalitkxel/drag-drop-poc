import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
//var base64 = require('base-64');
//var utf8 = require('utf8');
import base64 from 'base-64';
// import utf8 from 'utf8';
import { PageDetailsInterface } from '../../api/ResponseInterface';
import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import { actionTypes } from '../../enums';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { USER_ROLE } from '../../utils';
import { isAdd, isCopy, isEdit, isList } from '../../utils/routerUtils';
import {
  StartEvaluationInterface,
  SelectedItemElement,
  QuestionEvaluationInterface,
  QuestionSaveInterface,
  Summary,
} from './interface';
// import FilterContext from './context';
//import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
import {
  getStartEvaluation,
  submitEvaluation,
  fetchSummary,
  getQuestionEvaluation,
  fetchQuestionEvaluation,
} from './service';

const StartEvaluation = lazy(() => import('./StartEvaluation/start'));
const QuestionEvaluation = lazy(() => import('./QuestionEvaluation/question'));
const SummeryEvaluation = lazy(() => import('./SummaryEvaluation/summary'));
const ResultEvaluation = lazy(() => import('./ResultEvaluation/result'));
const ListEvaluation = lazy(() => import('./ListEvaluation/list'));
const CommentEvaluation = lazy(() => import('./CommentEvaluation/comment'));

const StartEvaluationTemplate: StartEvaluationInterface = {
  instrumentTitle: '360° Leadership Assessment',
};
const QuestionEvaluationTemplate: QuestionEvaluationInterface = {
  progress: 0,
  itemElements: [],
  totalNoOfEvaluationItems: 0,
};
const SummaryTemplate: Summary = {
  itemElements: [],
  evaluationItemElements: [],
  progress: 0,
  totalNoOfEvaluationItems: 0,
};
const SaveQuestion: QuestionSaveInterface = {
  instrumentId: 0,
  instrumentItemId: 0,
  isSkipped: true,
  comments: 'string',
  evaluationItemElements: [],
};
const instrumentTemplates: any[] = [];
const instrumentTemplate: any = {
  clientId: 1,
  isSystemDefined: false,
  recommendedApplicationId: 1,
  title: '',
};
const defaultFilters: any = {
  PageNumber: 1,
  PageSize: 10,
  type: 'all',
};
interface StartState {
  StartEvaluationTemplate: StartEvaluationInterface;
  QuestionEvaluationTemplate: QuestionEvaluationInterface;
  SaveQuestion: QuestionSaveInterface;
  SummaryTemplate: Summary;
  token: string;
}
interface State {
  instrumentTemplates: any[];
  instrumentTemplate: any;
  filters: any;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}
const token = '0fd43180-de34-4546-b736-0e5796d37c2a';
const defaultPageDetail = {
  currentPage: defaultFilters.PageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

// TODO: Check user role. If use role is client admin, he can't edit instruments created by super admin
const InstrumentTemplateContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);

  const [startState, setStartState] = useState<StartState>({
    StartEvaluationTemplate,
    QuestionEvaluationTemplate,
    SaveQuestion,
    SummaryTemplate,
    token,
  });

  const [state, setState] = useState<State>({
    filters: defaultFilters,
    instrumentTemplate,
    instrumentTemplates,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (match.path.includes('start')) {
      setState({ ...state, isLoading: true });
      fetchStartInstruction();
    }
    if (match.path.includes('summary')) {
      setState({ ...state, isLoading: true });
      fetchSummarydata();
    }
    if (match.path.includes('questions')) {
      setState({ ...state, isLoading: true });
      fetchQuestionAsessment();
    }
    if (match.path.includes('result')) {
      setState({ ...state, isLoading: true });
      fetchStartInstruction();
    }
  }, [match.path, match.params]);

  async function fetchStartInstruction() {
    try {
      setState({ ...state, isLoading: true });
      const startdata: any = await getStartEvaluation(match.params.token);
      let savequestion = startState.SaveQuestion;
      const idencoded = base64.encode(startdata.instrumentId);
      const itemidencoded = base64.encode(startdata.instrumentItemId);
      startdata.instrumentId = idencoded;
      startdata.instrumentItemId = itemidencoded;
      startdata.token = match.params.token;
      startdata.overallScore = parseFloat(startdata.overallScore).toFixed(2);
      setStartState({ ...startState, StartEvaluationTemplate: startdata, SaveQuestion: savequestion });
      setState({ ...state, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  async function fetchQuestionAsessment() {
    try {
      setState({ ...state, isLoading: true });
      const iddeccoded = base64.decode(match.params.instrumentId);
      const itemidecoded = base64.decode(match.params.instrumentItemId);
      const startdata = await fetchQuestionEvaluation(match.params.token, iddeccoded, itemidecoded);
      let number = startdata.data.itemElements.length;
      startState.SaveQuestion.evaluationItemElements = [];
      startState.SaveQuestion.instrumentItemId = startdata.data.instrumentItemId;
      startState.SaveQuestion.instrumentId = startdata.data.instrumentId;
      const obj: SelectedItemElement = {
        selectedValue: 0,
        selectedText: '',
        instrumentItemElementId: 0,
      };
      for (let i = 0; i < number; i++) {
        const obj2 = JSON.parse(JSON.stringify(obj));
        obj2.selectedValue = startdata.data.itemElements[i].selectedValue;
        obj2.selectedText = startdata.data.itemElements[i].selectedText;
        obj2.instrumentItemElementId = startdata.data.itemElements[i].id;
        startState.SaveQuestion.evaluationItemElements.push(obj2);
      }
      const progress = (startdata.data.progress / startdata.data.totalNoOfEvaluationItems) * 100;

      startdata.data.progress = Math.floor(progress);
      let skipchange = startState.SaveQuestion;
      skipchange.isSkipped = false;
      skipchange.comments = startdata.data.comments;
      setStartState({ ...startState, QuestionEvaluationTemplate: startdata.data, SaveQuestion: skipchange });
      setState({ ...state, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  async function saveQuestionAsessment(saveData: QuestionSaveInterface) {
    try {
      setState({ ...state, isLoading: true });
      const startdata = await getQuestionEvaluation(match.params.token, saveData);
      startState.SaveQuestion.instrumentItemId = startdata.data ? startdata.data : undefined;

      navigate(startdata.data);
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function navigate(instruemntID: string) {
    if (instruemntID == '0') {
      history.push(`/evaluation/${match.params.token}/summary`);
    } else {
      const idencoded = base64.encode(instruemntID);
      history.push(`/evaluation/${match.params.token}/questions/${match.params.instrumentId}/${idencoded}`);
    }

    //'/evaluation/' + listdata.token + '/questions/' + listdata.instrumentId + '/' + listdata.instrumentItemId
  }
  function navigateResult() {
    history.push(`/evaluation/${match.params.token}/result`);

    //'/evaluation/' + listdata.token + '/questions/' + listdata.instrumentId + '/' + listdata.instrumentItemId
  }
  async function submitSummarydata() {
    try {
      setState({ ...state, isLoading: true });
      const startdata: any = await submitEvaluation(match.params.token);

      setState({ ...state, isLoading: false });
      navigateResult();
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function fetchSummarydata() {
    try {
      setState({ ...state, isLoading: true });
      const startdata: any = await fetchSummary(match.params.token);
      setStartState({ ...startState, SummaryTemplate: startdata });
      setState({ ...state, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  function filterHandler(filters: any) {
    const newFilterState = {
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
      resetPager: false,
    };
    if (!filters.PageNumber) {
      newFilterState.resetPager = true;
      newFilterState.filters.PageNumber = 1;
    }
    if (!filters.Search) {
      delete newFilterState.filters.Search;
    }

    if (USER_ROLE.isSuperAdmin()) {
      delete newFilterState.filters.type;
    }
    setState(newFilterState);
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    } else if (match.path.includes('start')) {
      return <StartEvaluation listdata={startState.StartEvaluationTemplate} />;
    } else if (match.path.includes('questions')) {
      return (
        <QuestionEvaluation
          saveNextQuestionAsessment={saveQuestionAsessment}
          SaveandNextData={startState.SaveQuestion}
          Questiondata={startState.QuestionEvaluationTemplate}
        />
      );
    } else if (match.path.includes('summary')) {
      return (
        <SummeryEvaluation
          data={startState.SummaryTemplate}
          filterHandler={filterHandler}
          pageDetails={state.pageDetails}
          resetPager={state.resetPager}
          submitSummarydata={submitSummarydata}
        />
      );
    } else if (match.path.includes('result')) {
      return <ResultEvaluation listdata={startState.StartEvaluationTemplate} />;
    } else if (match.path.includes('comment')) {
      return <CommentEvaluation />;
    }
    return <ListEvaluation />;
  }

  return <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>;
};

export default withRouter(InstrumentTemplateContainer);
