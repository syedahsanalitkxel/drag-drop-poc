import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import Instrument from '../../pages/InstrumentClient';
import { ClientInstruments } from '../../../interfaces/Instruments';
import InstrumentCLientTemplate from '../../../containers/InstrumentClientContainer';

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

async function fetchInstrumentTemplates() {
  // alert('Clicked Filter')
  // try {
  //     const data = await getInstrumentTemplates();
  //     setInstrumentTemplates(data);
  // } catch (error) {
  //     // TODO: Implement Error boundary in future;
  //     errorContext.setError(error);
  // }
}
function viewAssessmentDetail() {
  alert('Clicked detail button');
  // history.push('/client-assessment-detail');
}

storiesOf('Instrument', module).add('Instrument', () => (
  <Instrument instruments={instruments} filterInstruments={fetchInstrumentTemplates} view={viewAssessmentDetail} />
));
