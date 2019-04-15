import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import RouteParamsInterface from '../interfaces/RouteParams';
import AssessmentItem from '../components/pages/AssessmentItem';
import ErrorContext from '../context/ErrorContext';
import { initialState, Initalvalues } from '../components/pages/AddAssessment/InitialState';
import AssessmentItemInterface, { AddAssessmentItemInterface } from '../interfaces/AssessmentItem';
import {
  getAssessments,
  addAssessment,
  getFilteredAssessment,
  editAssessmentService,
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

const AssessmentItemContainer: React.FunctionComponent<
  RouteComponentProps<RouteParamsInterface>
> = ({ history, match }) => {
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
      console.log(values);
      const data = await addAssessment(values);
      console.log(data);
      assessmenListItems();
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function updateAssessmentdata(values: AddAssessmentItemInterface) {
    try {
      console.log(values);
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
        addAssessment={AddAssessmentdata}
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
      />
    );
  }
  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };
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
