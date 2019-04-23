import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { Initalvalues, initialState } from './AddAssessment/InitialState';
import AssessmentItem from './AssessmentItem';
import {
  addAssessment,
  deleteAssessmentService,
  editAssessmentService,
  getFilteredAssessment,
  updateAssessment,
} from './assessmentsService';
import AssessmentItemInterface, { AddAssessmentItemInterface, AssessmentTemplateFilterInterface } from './interface';

import FilterContext from './AssessmentFilters/context';

import AddAssessmentComponenet from './AddAssessment';
import { isAdd, isCopy, isEdit, isList } from '../../utils/routerUtils';

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
const defaultFilters: AssessmentTemplateFilterInterface = {
  PageNumber: 1,
  PageSize: 10,
  TypeIds: [],
};
const defaultPageDetail = {
  currentPage: defaultFilters.PageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

interface State {
  filters: AssessmentTemplateFilterInterface;
  resetPager: boolean;
  assessments: any;
  pageDetails?: any;
  isLoading: boolean;
}
const AssessmentItemContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({
  history,
  match,
}) => {
  const [state, setState] = useState<State>({
    filters: defaultFilters,
    resetPager: false,
    assessments: {},
    isLoading: false,
    pageDetails: defaultPageDetail,
  });

  const errorContext = useContext(ErrorContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [copy, setcopy] = useState(false);
  const [assessments, setAssessments] = useState(AssessmentItems);
  const [editassessmentsState, seteditAssessments] = useState(Initalvalues);
  const [addAssessments, setAddAssessments] = useState(Initalvalues);
  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    if (isEdit(match.params)) {
      setState({ ...state, isLoading: true });
      editAssessmentdata(match.params.id);
    } else if (isList(match.path)) {
      fetchAssessments(state.filters);
    }
  }, [match.path, state.filters]);

  async function fetchAssessments(filter: any) {
    try {
      setState({ ...state, isLoading: true });
      const Assessdata = await getFilteredAssessment(filter);
      setState({
        ...state,
        assessments: Assessdata.data,
        isLoading: false,
        pageDetails: Assessdata.pageDetails,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }
  async function editAssessmentdata(id: string) {
    try {
      setState({ ...state, isLoading: true });
      const data = await editAssessmentService(id);
      if (data.error) {
        errorContext.setError(data.error, true);
        assessmenListItems();
        setState({ ...state, isLoading: false });
      } else {
        seteditAssessments(data);

        setState({ ...state, isLoading: false });
      }
    } catch (error) {
      setState({ ...state, isLoading: false });
      assessmenListItems();
      errorContext.setError(error, true);
    }
  }
  async function copyAssessment(data: any) {
    try {
      await addAssessment(data);
      setcopy(false);
      assessmenListItems();
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function updateAssessmentdata(data: any, type?: string) {
    try {
      if (copy) {
        await copyAssessment(data);
        return;
      }
      if (type === 'd') {
        assessmenListItems();
      } else {
        if (data.typeId != 1) {
          data.competencyId = undefined;
        }
        if (data.questionTypeId != 1) {
          data.itemElements = [];
        }

        if (type === 'b') {
          data.ItemStatusId = 2;
        }

        data.saveAsNewVersion = false;
        const returnData: any = await updateAssessment(data, match.params.id);

        assessmenListItems();
      }
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function applyFilterAssessment(filter: any) {
    const param = { ...filter };
    toggleFilterModal();
    try {
      const data: any = await getFilteredAssessment(param);
      setAssessments(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function AddAssessmentdata(values: AddAssessmentItemInterface, type?: string) {
    try {
      if (type === 'd') {
        assessmenListItems();
      } else {
        if (values.typeId != 1) {
          values.competencyId = undefined;
        }
        if (values.questionTypeId != 1) {
          values.itemElements = [];
        }

        if (type === 'b') {
          values.ItemStatusId = 2;
        } else {
          values.ItemStatusId = 1;
        }
        const data = await addAssessment(values);
        console.log(data);
        if (type === 'c') {
          reloadAssessment();
        } else {
          assessmenListItems();
        }
      }
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  function filterAssessments(searchQuery: string) {
    alert(searchQuery);
  }

  const filtersClickHandler = (filters?: any) => {
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
    setState(newFilterState);
  };

  function assessmenListItems() {
    history.push('/assessment-items');
  }
  function routeaddAssessment() {
    history.push('/assessment-items/add');
  }
  function reloadAssessment() {
    location.reload();
  }
  function editAssessment(assessmentId: string) {
    history.push(`/assessment-items/edit/${assessmentId}`);
  }
  function renderEditAssessment(assessmentId: string) {
    setcopy(true);
    history.push(`/assessment-items/copy/${assessmentId}`);
  }
  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  async function deleteAssessment(itemId: any) {
    try {
      setState({ ...state, isLoading: true });
      const assessmentItemData: any = await deleteAssessmentService(itemId);
      if (assessmentItemData) {
        fetchAssessments(defaultFilters);
      }
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }
    if (isCopy(match.path)) {
      return (
        <AddAssessmentComponenet
          assessmenListItems={assessmenListItems}
          assessmenData={editassessmentsState}
          copy={true}
          addAssessment={AddAssessmentdata}
          edit={false}
        />
      );
    } else if (isEdit(match.params)) {
      return (
        <AddAssessmentComponenet
          assessmenData={editassessmentsState}
          addAssessment={updateAssessmentdata}
          edit={true}
          assessmenListItems={assessmenListItems}
        />
      );
    } else if (isAdd(match.path)) {
      return (
        <AddAssessmentComponenet
          assessmenListItems={assessmenListItems}
          assessmenData={addAssessments}
          addAssessment={AddAssessmentdata}
          edit={false}
        />
      );
    }

    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <AssessmentItem
          assessments={state.assessments}
          add={routeaddAssessment}
          remove={deleteAssessment}
          edit={editAssessment}
          copy={renderEditAssessment}
          filterHandler={filtersClickHandler}
          resetPager={state.resetPager}
          appliedFilters={state.filters}
          savedSearch={state.filters.search}
          defaultFilters={defaultFilters}
          pageDetails={state.pageDetails}
        />
      </FilterContext.Provider>
    );
  }
  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(AssessmentItemContainer);
