import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import Instrument from '../../pages/InstrumentClient';
import { ClientInstruments } from '../../../interfaces/Instruments';
import InstrumentDetail from './index';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import ParticipantInterface from '../../../interfaces/Participant';
import EvaluatorInterface from '../../../interfaces/Evaluator';
import InstrumentDetailTemplate from '../../../containers/InstrumentDetailContainer';

const instruments = [
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

function viewAssessmentDetail() {
  alert('Clicked detail button');
  // history.push('/client-assessment-detail');
}

storiesOf('InstrumentDetail', module).add('InstrumentDetail', () => (
  <InstrumentDetail instruments={instruments} participants={participantsList} AssessmentItems={AssessmentItems} />
));
