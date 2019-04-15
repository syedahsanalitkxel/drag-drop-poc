import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouteParamsInterface from '../interfaces/RouteParams';
import AssessmentItem from '../components/pages/AssessmentItem';
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
import { isAdd, isEdit, isList } from '../utils/routerUtils';
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
    definition:
      'Has a set of moral principles used in job in accordance with the culture of organization',
    id: 'uuid-11-111',
    type: 'Influential',
  },
];
const defaultFilters: AssessmentTemplateFilterInterface = {
  PageNumber: 1,
  PageSize: 10,
};
interface State {
  AssessmentTemplates: any;
  AssessmentTemplate: any;
  filters: AssessmentTemplateFilterInterface;
  resetPager: boolean;
}
const AssessmentItemContainer: React.FunctionComponent<
  RouteComponentProps<RouteParamsInterface>
> = ({ history, match }) => {
  // const [state, setState] = useState<State>({
  //   AssessmentTemplate,
  //   AssessmentTemplates,
  //   filters: defaultFilters,
  //   resetPager: false,
  // });

  const errorContext = useContext(ErrorContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [assessments, setAssessments] = useState(AssessmentItems);
  const [editassessmentsState, seteditAssessments] = useState(Initalvalues);
  const [addAssessments, setAddAssessments] = useState(Initalvalues);
  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    if (isEdit(match.params)) {
      editAssessmentdata(match.params.id);
    } else if (isList(match.path)) {
      fetchAssessments();
    }

    return function cleanup() {
      setAssessments(AssessmentItems);
    };
  }, [match.path]);

  async function fetchAssessments() {
    try {
      const data = await getAssessments();
      setAssessments(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function editAssessmentdata(id: string) {
    try {
      const data = await editAssessmentService(id);
      seteditAssessments(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function updateAssessmentdata(data: any) {
    try {
      if (data.typeId != 1) {
        data.competencyId = null;
      }
      if (data.questionTypeId != 1) {
        data.itemElements = [];
      }

      data.saveAsNewVersion = false;
      const returnData: any = await updateAssessment(data, match.params.id);
      console.log(returnData);
      assessmenListItems();
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
  async function AddAssessmentdata(values: AddAssessmentItemInterface) {
    try {
      if (values.typeId != 1) {
        values.competencyId = null;
      }
      if (values.questionTypeId != 1) {
        values.itemElements = [];
      }
      const data = await addAssessment(values);
      console.log(data);
      assessmenListItems();
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

  function editAssessment(assessmentId: string) {
    history.push(`/assessment-items/edit/${assessmentId}`);
  }
  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };
  function deleteAssessment(assessmentId: string) {
    alert(`deleting => ${assessmentId}`);
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
  // const filtersClickHandler = (event: React.MouseEvent) => {
  //   const newFilterState = {
  //     ...state,
  //     filters: {
  //       ...state.filters,
  //       ...filters,
  //     },
  //     resetPager: false,
  //   };
  //   if (!filters.PageNumber) {
  //     newFilterState.resetPager = true;
  //     newFilterState.filters.PageNumber = 1;
  //   }
  //   setState(newFilterState);
  //   toggleFilterModal();
  // };
  return (
    <AssessmentItem
      assessments={assessments}
      filterAssessments={filterAssessments}
      add={routeaddAssessment}
      remove={deleteAssessment}
      edit={editAssessment}
      modalVisible={modalVisible}
      toggleFilterModal={toggleFilterModal}
      filtersClickHandler={filtersClickHandler}
      applyFilters={applyFilterAssessment}
    />
  );
};

export default withRouter(AssessmentItemContainer);
