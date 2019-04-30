import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import Instrument from '../../pages/InstrumentClient';
import InstrumentFiltersInterface from '../../../interfaces/InstrumentFilters';

const instruments = [
  {
    completedAssessments: '26',
    id: 1,
    status: 'drafted',
    title: '360° Leadership Instrument',
    totalAssessmentItems: '25',
    totalAssessments: '30',
    totalEvaluations: '28',
  },
  {
    completedAssessments: '26',
    id: 2,
    status: 'published',
    title: '210° Leadership Instrument',
    totalAssessmentItems: '25',
    totalAssessments: '30',
    totalEvaluations: '28',
  },
];

async function filterHandler() {
  // alert('Clicked Filter')
  // try {
  //     const data = await getInstrumentTemplates();
  //     setInstrumentTemplates(data);
  // } catch (error) {
  //     // TODO: Implement Error boundary in future;
  //     errorContext.setError(error);
  // }
}

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
const defaultFilters: InstrumentFiltersInterface = {
  pageNumber: 1,
  pageSize: 10,
  type: '',
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

storiesOf('Instrument', module).add('Instrument', () => (
  <Instrument
    instruments={instruments}
    filterInstruments={fetchInstrumentTemplates}
    filterHandler={filterHandler}
    pageDetails={defaultPageDetail}
    resetPager={true}
    savedSearch={'state.filters.search'}
    defaultFilters={defaultFilters}
    view={viewAssessmentDetail}
  />
));
