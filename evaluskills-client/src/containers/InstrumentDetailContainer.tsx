import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import InstrumentDetailTemplate from '../components/pages/InstrumentDetail';
import RouteParamsInterface from '../interfaces/RouteParams';
import { ClientInstruments } from '../interfaces/Instruments';
import AssessmentItemInterface from '../interfaces/AssessmentItem';
import EvaluatorInterface from '../interfaces/Evaluator';
import ParticipantInterface from '../interfaces/Participant';

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

const participantsList: ParticipantInterface[] = [
  {
    email: 'jasminrasool@gmail.com',
    id: '1',
    name: 'jasmin Rasool',
    noOfEvaluators: '5',
    progress: '20%',
    status: 'InProgress',
  },
  {
    email: 'jasminrasool@gmail.com',
    id: '2',
    name: 'jasmin Rasool',
    noOfEvaluators: '2',
    progress: '50%',
    status: 'InProgress',
  },
  {
    email: 'jasminrasool@gmail.com',
    id: '3',
    name: 'jasmin Rasool',
    noOfEvaluators: '5',
    progress: '100%',
    status: 'Completed',
  },
  {
    email: 'jasminrasool@gmail.com',
    id: '4',
    name: 'jasmin Rasool',
    noOfEvaluators: '5',
    progress: '0%',
    status: 'NotStarted',
  },
  {
    email: 'jhonjames@gmail.com',
    id: '5',
    name: 'john james',
    noOfEvaluators: '5',
    progress: '20%',
    status: 'InProgress',
  },
  {
    email: 'jasminrasool@gmail.com',
    id: '6',
    name: 'jasmin Rasool',
    noOfEvaluators: '2',
    progress: '50%',
    status: 'InProgress',
  },
];

const EvaluatorList: EvaluatorInterface[] = [
  {
    email: 'robbyrash@gmail.com',
    id: '1',
    name: 'Robby Rash',
    progress: '20%',
    role: 'UI/UX Leader',
    status: 'InProgress',
  },
  {
    email: 'maraymrassol@gmail.com',
    id: '2',
    name: 'Mariyam Rassal',
    progress: '100%',
    role: 'Department Head',
    status: 'Completed',
  },
  {
    email: 'robbyrash@gmail.com',
    id: '3',
    name: 'Robby Rash',
    progress: '50%',
    role: 'Team Lead',
    status: 'InProgress',
  },
  {
    email: 'robbyrash@gmail.com',
    id: '4',
    name: 'Robby Rash',
    progress: '20%',
    role: 'Senior Designer',
    status: 'InProgress',
  },
];

const InstrumentList: ClientInstruments[] = [
  {
    id: '1',
    noOfAssessmentItems: '25',
    noOfEvaluations: '28',
    noOfParticipants: '30',
    title: '360° Leadership Instrument',
  },
  {
    id: '2',
    noOfAssessmentItems: '25',
    noOfEvaluations: '28',
    noOfParticipants: '30',
    title: '210° Leadership Instrument',
  },
];

const InstrumentDetailContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({
  history,
  match,
}) => {
  const [instruments, setInstruments] = useState(InstrumentList);
  const [participants, setParticipants] = useState(participantsList);
  const [evaluator, setEvaluator] = useState(EvaluatorList);

  useEffect(() => {
    // fetchClients();
    return function cleanup() {
      setInstruments(InstrumentList);
      setParticipants(participantsList);
      setEvaluator(EvaluatorList);
    };
  }, []);

  function viewEvaluation(evaluationId: string) {
    console.log(evaluationId);
  }

  const InstrumentData: any = InstrumentList.find(instrument => instrument.id === match.params.id);

  return (
    InstrumentData && (
      <InstrumentDetailTemplate
        instruments={InstrumentData}
        view={viewEvaluation}
        participants={participants}
        evaluator={evaluator}
        assessmentItems={AssessmentItems}
      />
    )
  );
};

export default withRouter(InstrumentDetailContainer);
