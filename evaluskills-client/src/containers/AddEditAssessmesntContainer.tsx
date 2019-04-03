import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AddAssessment from '../components/pages/AddAssessment';
import AssessmentItem from '../components/pages/AssessmentItem';
import { ErrorContext } from '../context';
import IAssessmentItem from '../interfaces/AssessmentItem';
import { getAssessments } from '../services/assessmentsService';

const AssessmentItems: IAssessmentItem[] = [
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

const AssessmentItemContainer: React.FunctionComponent<RouteComponentProps> = ({
  match,
  history,
}) => {
  const errorContext = useContext(ErrorContext);

  const [assessments, setAssessments] = useState(AssessmentItems);
  // TODO: Try moving filters to context
  const [filters, setFilters] = useState({});

  // https://www.andreasreiterer.at/react-useeffect-hook-loop/
  // https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    fetchAssessments();
    return function cleanup() {
      setAssessments(AssessmentItems);
      setFilters({});
    };
  }, []);

  async function fetchAssessments() {
    try {
      const data = await getAssessments();
      setAssessments(data);
    } catch (error) {
      // TODO: Implement Error boundary in future;
      errorContext.setError(error);
    }
  }

  function filterAssessments(searchQuery: string) {
    alert(searchQuery);
  }

  function addAssessment() {
    history.push('/assessment-items/add');
  }

  function editAssessment(assessmentId: string) {
    history.push(`/assessment-items/edit/${assessmentId}`);
  }

  function deleteAssessment(assessmentId: string) {
    alert(`deleting => ${assessmentId}`);
  }
  if (Object.getOwnPropertyNames(match.params).length > 0) {
    return <AddAssessment edit={true} />;
  }
  return <AddAssessment />;
};

export default withRouter(AssessmentItemContainer);
