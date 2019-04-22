import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { PageDetailsInterface } from '../../api/ResponseInterface';
import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import { actionTypes } from '../../enums';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { USER_ROLE } from '../../utils';
import { isAdd, isCopy, isEdit, isList } from '../../utils/routerUtils';

//import { AddInstructionsInterface, Instructions } from './interface';
import {
  addInstrumentTemplates,
  deleteInstrumentTemplate,
  getInstrumentTemplateById,
  getInstrumentTemplates,
  updateInstrumentTemplates,
} from '../InstrumentTemplate/service';
import { getInstructions, addInstructions } from './Service';
const InstrumentTemplate = lazy(() => import('./InstructionListTemplate'));
const AddEditInstrumentTemplate = lazy(() => import('./AddInstructions'));

const instrumentTemplates: any[] = [];
const instrumentTemplate: any = {
  clientId: 1,
  isSystemDefined: false,
  recommendedApplicationId: 1,
  title: '',
};
const defaultFilters: any = {
  PageNumber: 1,
  PageSize: 10,
  type: 'all',
};

interface State {
  instrumentTemplates: any[];
  instrumentTemplate: any;
  filters: any;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}

const defaultPageDetail = {
  currentPage: defaultFilters.PageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

// TODO: Check user role. If use role is client admin, he can't edit instruments created by super admin
const InstrumentTemplateContainer: React.FC<RouteComponentProps<RouteParamsInterface>> = props => {
  const { history, match } = props;
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    filters: defaultFilters,
    instrumentTemplate,
    instrumentTemplates,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (isEdit(match.params) || isCopy(match.path)) {
      setState({ ...state, isLoading: true });
      fetchInstrument(match.params.id);
    } else if (isList(match.path)) {
      fetchAllInstruments(state.filters);
    }
  }, [match.path, state.filters]);

  function filterHandler(filters: any) {
    const newFilterState = {
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
      resetPager: false,
    };
    if (!filters.PageNumber) {
      newFilterState.resetPager = true;
      newFilterState.filters.PageNumber = 1;
    }
    if (!filters.Search) {
      delete newFilterState.filters.Search;
    }
    if (!filters.recommendedApplicationId) {
      delete newFilterState.filters.recommendedApplicationId;
    }
    if (USER_ROLE.isSuperAdmin()) {
      delete newFilterState.filters.type;
    }
    setState(newFilterState);
  }

  async function fetchAllInstruments(filters?: any) {
    try {
      setState({ ...state, isLoading: true });
      const allTemplates = await getInstructions(filters);
      setState({
        ...state,
        instrumentTemplates: allTemplates.data,
        isLoading: false,
        pageDetails: allTemplates.pageDetails,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function fetchInstrument(id: string) {
    setState({ ...state, isLoading: true });
    try {
      const data = await getInstrumentTemplateById(id);
      setState({ ...state, instrumentTemplate: data, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function dataManipulationAction(instrument: any, mode: actionTypes) {
    try {
      if (mode === actionTypes.NEW) {
        await addInstrumentTemplates(instrument);
      } else {
        if (instrument.id) {
          if (typeof instrument.id === 'number') {
            await updateInstrumentTemplates(instrument, instrument.id);
          }
        }
      }
      navigate('');
    } catch (e) {
      errorContext.setError(e, true);
    }
  }
  async function AddInstructiondata(values: any, type?: string) {
    try {
      const data = await addInstructions(values);
      console.log(data);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function deleteInstrument(id: string) {
    try {
      await deleteInstrumentTemplate(id);
      await fetchAllInstruments(state.filters);
    } catch (error) {
      errorContext.setError(error, true);
    }
  }

  function navigate(path: string, root?: boolean) {
    if (root) {
      history.push(path);
    } else {
      history.push(`/evaluation-instructions${path}`);
    }
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    if (isEdit(match.params, match.path)) {
      return <AddEditInstrumentTemplate submitInstrument={AddInstructiondata} />;
    } else if (isAdd(match.path)) {
      return <AddEditInstrumentTemplate submitInstrument={AddInstructiondata} />;
    }
    return (
      <InstrumentTemplate
        Instructions={state.instrumentTemplates}
        filterHandler={filterHandler}
        pageDetails={state.pageDetails || defaultPageDetail}
        resetPager={state.resetPager}
        savedSearch={state.filters.Search}
        edit={(value: any) => {}}
        navigate={navigate}
      />
    );
  }

  return (
    <DashboardTemplate>
      <React.Suspense fallback={<Spinner />}>{renderPage()}</React.Suspense>
    </DashboardTemplate>
  );
};

export default withRouter(InstrumentTemplateContainer);
