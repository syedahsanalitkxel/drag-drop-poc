import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import InstrumentCLientTemplate from '../components/pages/InstrumentClient';
import { ClientInstruments } from '../interfaces/Instruments';
import RouteParamsInterface from '../interfaces/RouteParams';
import InstrumentFiltersInterface from '../interfaces/InstrumentFilters';
import { PageDetailsInterface } from '../api/ResponseInterface';
import ErrorContext from '../context/ErrorContext';
import { isList } from '../utils/routerUtils';
import { getFilteredInstruments } from '../services/instrumentService';
import DashboardTemplate from '../components/templates/DashboardTemplate';
import Spinner from '../components/atoms/Spinner';
import FilterContext from '../components/organisms/InstrumentClientFilter/context';
import UsersList from './UserContainer';

const Instruments: ClientInstruments[] = [];

interface State {
  Instruments: ClientInstruments[];
  filters: InstrumentFiltersInterface;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}
const defaultFilters: InstrumentFiltersInterface = {
  instrumentApplicationId: '',
  pageNumber: 1,
  pageSize: 10,
  statusId: '',
  testTypeId: '',
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

const InstrumentClientContainer: React.FunctionComponent<RouteComponentProps<RouteParamsInterface>> = ({
  history,
  match,
}) => {
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    Instruments,
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (isList(match.path)) {
      fetchInstrumentTemplates(state.filters);
    }
  }, [match.path, state.filters]);

  async function fetchInstrumentTemplates(filters: InstrumentFiltersInterface) {
    try {
      setState({ ...state, isLoading: true });
      const data: any = await getFilteredInstruments(filters);
      setState({ ...state, Instruments: data.instrumentData, isLoading: false, pageDetails: data.pageDetails });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function filterHandler(filters: InstrumentFiltersInterface) {
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
    setState(newFilterState);
  }

  function viewAssessmentDetail(id: string) {
    history.push(`/client-assessment-detail/${id}`);
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <InstrumentCLientTemplate
          instruments={state.Instruments}
          filterInstruments={fetchInstrumentTemplates}
          filterHandler={filterHandler}
          view={viewAssessmentDetail}
          pageDetails={state.pageDetails || defaultPageDetail}
          resetPager={state.resetPager}
          savedSearch={state.filters.search}
          defaultFilters={defaultFilters}
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

export default withRouter(InstrumentClientContainer);
