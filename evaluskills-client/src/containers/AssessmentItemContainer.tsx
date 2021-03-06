import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Spinner from '../components/atoms/Spinner';
import RouteParamsInterface from '../interfaces/RouteParams';
import AssessmentItem from '../components/pages/AssessmentItem';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import ErrorContext from '../context/ErrorContext';
import { initialState, Initalvalues } from '../components/pages/AddAssessment/InitialState';
import AssessmentItemInterface, { AddAssessmentItemInterface } from '../interfaces/AssessmentItem';
import { AssessmentTemplateFilterInterface } from '../interfaces/AssessmentFilters';
import {
  getAssessments,
  addAssessment,
  getFilteredAssessment,
  editAssessmentService,
  updateAssessment,
} from '../services/assessmentsService';
import FilterContext from '../components/organisms/AssessmentFilters/context';
import { isAdd, isEdit, isList, isCopy } from '../utils/routerUtils';
import AddAssessmentComponenet from '../components/pages/AddAssessment';
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

    return function cleanup() {
      setAssessments(AssessmentItems);
    };
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
      seteditAssessments(data);
      setState({ ...state, isLoading: false });
    } catch (error) {
      setState({ ...state, isLoading: false });
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
          data.itemsStatusId = 2;
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
          values.itemsStatusId = 2;
        } else {
          values.itemsStatusId = 1;
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
  function deleteAssessment(assessmentId: string) {
    alert(`deleting => ${assessmentId}`);
  }
  function renderPage() {
    console.log('state', state);
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
    }
    if (isEdit(match.params)) {
      return (
        <AddAssessmentComponenet
          assessmenData={editassessmentsState}
          addAssessment={updateAssessmentdata}
          edit={true}
          assessmenListItems={assessmenListItems}
        />
      );
    }

    if (isAdd(match.path)) {
      return (
        <AddAssessmentComponenet
          assessmenListItems={assessmenListItems}
          assessmenData={addAssessments}
          addAssessment={AddAssessmentdata}
          edit={false}
        />
      );
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
      if (!filters.pageNumber) {
        newFilterState.resetPager = true;
        newFilterState.filters.pageNumber = 1;
      }
      if (!filters.accreditation) {
        delete newFilterState.filters.accreditation;
      }
      if (!filters.application) {
        delete newFilterState.filters.application;
      }
      if (!filters.accreditation) {
        delete newFilterState.filters.accreditation;
      }
      if (!filters.categoryId) {
        delete newFilterState.filters.categoryId;
      }
      if (!filters.competencyId) {
        delete newFilterState.filters.competencyId;
      }
      if (filters.itemRecomendedApplications && filters.itemRecomendedApplications.length === 0) {
        delete newFilterState.filters.itemRecomendedApplications;
      }
      if (!filters.categoryId) {
        delete newFilterState.filters.categoryId;
      }
      if (!filters.search) {
        delete newFilterState.filters.search;
      }
      setState(newFilterState);
    };

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
          defaultFilters={defaultFilters}
          pageDetails={state.pageDetails || defaultPageDetail}
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
