import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

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
} from './interface';
// import FilterContext from './context';
//import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';
import {
  addInstrumentTemplates,
  deleteInstrumentTemplate,
  getInstrumentTemplateById,
  getInstrumentTemplates,
  updateInstrumentTemplates,
  getStartEvaluation,
  getQuestionEvaluation,
} from './service';

const StartEvaluation = lazy(() => import('./StartEvaluation/start'));
const QuestionEvaluation = lazy(() => import('./QuestionEvaluation/question'));
const SummeryEvaluation = lazy(() => import('./SummaryEvaluation/summary'));
const ResultEvaluation = lazy(() => import('./ResultEvaluation/result'));
const ListEvaluation = lazy(() => import('./ListEvaluation/list'));
const CommentEvaluation = lazy(() => import('./CommentEvaluation/comment'));

const StartEvaluationTemplate: StartEvaluationInterface = {
  instrumentTitle: '360° Leadership Assessment',
  // instructionId?: ;
  instructionTitle: 'Instructions',
  instructionDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.',
  // participantsId?: number;
  participantsFirstName: 'ali',
  participantsLastName: 'zain',
  // participantsEmail?: string;
  // participantRoleId?: number;
  imagePath: 'https://pbs.twimg.com/profile_images/839596277163831296/QXw9XvF5.jpg',
  // clientName?: string;
};
const QuestionEvaluationTemplate: QuestionEvaluationInterface = {
  progress: 0,
  itemElements: [],
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
    if (match.path.includes('questions')) {
      setState({ ...state, isLoading: true });
      fetchQuestionAsessment();
    } else if (isList(match.path)) {
      fetchStartInstruction();
    }
  }, [match.path, state.filters]);

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
    if (!filters.recommendedApplicationId) {
      delete newFilterState.filters.recommendedApplicationId;
    }
    if (USER_ROLE.isSuperAdmin()) {
      delete newFilterState.filters.type;
    }
    setState(newFilterState);
  }

  async function fetchStartInstruction() {
    try {
      setState({ ...state, isLoading: true });
      const startdata: any = await getStartEvaluation(token);
      let savequestion = startState.SaveQuestion;
      savequestion.instrumentId = startdata.instrumentId;

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
      const startdata = await getQuestionEvaluation(token, startState.SaveQuestion);
      let number = startdata.data.itemElements.length;
      startState.SaveQuestion.evaluationItemElements = [];
      startState.SaveQuestion.instrumentItemId = startdata.data.instrumentItemId;
      startState.SaveQuestion.instrumentItemId = startdata.data.instrumentItemId;
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
      let skipchange = startState.SaveQuestion;
      skipchange.isSkipped = false;
      setStartState({ ...startState, QuestionEvaluationTemplate: startdata.data, SaveQuestion: skipchange });
      setState({ ...state, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  async function saveQuestionAsessment(saveData: QuestionSaveInterface) {
    console.log('saveData');
    console.log(saveData);
    console.log('saveData');
    try {
      setState({ ...state, isLoading: true });
      const startdata = await getQuestionEvaluation(token, saveData);
      let number = startdata.data.itemElements.length;
      startState.SaveQuestion.instrumentItemId = startdata.data.instrumentItemId;
      startState.SaveQuestion.evaluationItemElements = [];
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
      let skipchange = startState.SaveQuestion;
      skipchange.isSkipped = false;
      setStartState({ ...startState, QuestionEvaluationTemplate: startdata.data, SaveQuestion: skipchange });
      setState({ ...state, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  async function fetchInstrument(id: string) {
    setState({ ...state, isLoading: true });
    try {
      const data = await getInstrumentTemplateById(id);
      setState({ ...state, instrumentTemplate: data, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function dataManipulationAction(instrument: any, mode: actionTypes) {
    try {
      if (mode === actionTypes.NEW) {
        await addInstrumentTemplates(instrument);
      } else {
        if (instrument.id) {
          if (typeof instrument.id === 'number') {
            await updateInstrumentTemplates(instrument, instrument.id);
          }
        }
      }
      navigate('');
    } catch (e) {
      errorContext.setError(e, true);
    }
  }

  async function deleteInstrument(id: string) {
    try {
      await deleteInstrumentTemplate(id);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  function navigate(path: string, root?: boolean) {
    if (root) {
      history.push(path);
    } else {
      history.push(`/instrument-templates${path}`);
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }
    if (match.path.includes('start')) {
      return <StartEvaluation listdata={startState.StartEvaluationTemplate} />;
    }
    if (match.path.includes('questions')) {
      return (
        <QuestionEvaluation
          saveNextQuestionAsessment={saveQuestionAsessment}
          SaveandNextData={startState.SaveQuestion}
          Questiondata={startState.QuestionEvaluationTemplate}
        />
      );
    }
    if (match.path.includes('summary')) {
      return <SummeryEvaluation />;
    }
    if (match.path.includes('result')) {
      return <ResultEvaluation />;
    }
    if (match.path.includes('comment')) {
      return <CommentEvaluation />;
    }
    return <ListEvaluation />;
    // if (isCopy(match.path)) {
    //   return (
    //     <AddEditInstrumentTemplate
    //       defaultValue={state.instrumentTemplate}
    //       copy={true}
    //       handleAction={dataManipulationAction}
    //       handleDelete={deleteInstrument}
    //     />
    //   );
    // } else if (isEdit(match.params, match.path)) {
    //   return (
    //     <AddEditInstrumentTemplate
    //       defaultValue={state.instrumentTemplate}
    //       handleAction={dataManipulationAction}
    //       handleDelete={deleteInstrument}
    //     />
    //   );
    // } else if (isAdd(match.path)) {
    //   return <AddEditInstrumentTemplate handleAction={dataManipulationAction} />;
    // }
    // return (
    //   <FilterContext.Provider value={{ activeFilters: state.filters }}>
    //     <InstrumentTemplate
    //       instrumentTemplates={state.instrumentTemplates}
    //       navigate={navigate}
    //       filterHandler={filterHandler}
    //       pageDetails={state.pageDetails || defaultPageDetail}
    //       resetPager={state.resetPager}
    //       savedSearch={state.filters.Search}
    //       handleDelete={deleteInstrument}
    //     />
    //   </FilterContext.Provider>
    // );
  }

  return <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>;
};

export default withRouter(InstrumentTemplateContainer);
