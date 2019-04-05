import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import InstrumentCLientTemplate from '../components/pages/InstrumentClient';
import { ClientInstruments } from '../interfaces/Instruments';
import RouteParamsInterface from '../interfaces/RouteParams';

const InstrumentList: ClientInstruments[] = [
  {
    id: '1',
    noOfAssessmentItems: '25',
    noOfEvaluations: '28',
    noOfParticipants: '30',
    title: '360° Leadership Instrument',
  },
];

const InstrumentClientContainer: React.FunctionComponent<
  RouteComponentProps<RouteParamsInterface>
> = ({ history, match }) => {
  const [Instruments, setInstruments] = useState(InstrumentList);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // fetchClients();
    return function cleanup() {
      setInstruments(InstrumentList);
      setFilters({});
    };
  }, []);

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

  return (
    <InstrumentCLientTemplate
      instruments={Instruments}
      filterInstruments={fetchInstrumentTemplates}
      view={viewAssessmentDetail}
    />
  );
};

export default withRouter(InstrumentClientContainer);
