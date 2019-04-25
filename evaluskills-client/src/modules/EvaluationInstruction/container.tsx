import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { getActiveClient, USER_ROLE } from '../../utils';

import { PageDetailsInterface } from '../../api/ResponseInterface';
import Spinner from '../../components/atoms/Spinner';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import ErrorContext from '../../context/ErrorContext';
import { actionTypes } from '../../enums';
import RouteParamsInterface from '../../interfaces/RouteParams';
import { isAdd, isCopy, isEdit, isList } from '../../utils/routerUtils';
import { InstructionsInterface, Instructions } from './Interface';
import { getInstructions, addInstructions, updateInstructions, editInstrctionsService } from './Service';
const InstrumentTemplate = lazy(() => import('./InstructionListTemplate'));
const AddEditInstrumentTemplate = lazy(() => import('./AddInstructions'));

const InstructionsTemplate: Instructions[] = [];
const AddEditInstructionsInterface: InstructionsInterface = {
  title: '',
  instructions: '',
  isSystemDefined: true,
  isActive: true,
  versionNo: 0,
};
const defaultFilters: any = {
  PageNumber: 1,
  PageSize: 10,
};

interface State {
  InstructionsTemplate: any[];
  AddEditInstructionsInterface: any;

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
    InstructionsTemplate,
    AddEditInstructionsInterface,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (isEdit(match.params) || isCopy(match.path)) {
      setState({ ...state, isLoading: true });
      fetchInstruction(match.params.id);
    } else if (isList(match.path)) {
      fetchAllInstruction(state.filters);
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

    if (USER_ROLE.isSuperAdmin()) {
      delete newFilterState.filters.type;
    }
    setState(newFilterState);
  }

  async function fetchAllInstruction(filters?: any) {
    try {
      setState({ ...state, isLoading: true });
      const allTemplates = await getInstructions(filters);
      setState({
        ...state,
        InstructionsTemplate: allTemplates.data,
        isLoading: false,
        pageDetails: allTemplates.pageDetails,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function fetchInstruction(id: string) {
    setState({ ...state, isLoading: true });
    try {
      const data = await editInstrctionsService(id);
      setState({ ...state, AddEditInstructionsInterface: data, isLoading: false });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  async function AddInstructiondata(values: InstructionsInterface) {
    try {
      // var newobj = JSON.stringify(values);
      // console.log(newobj);
      const data = await addInstructions(values);
      console.log(data);
      navigate('');
    } catch (error) {
      errorContext.setError(error, true);
    }
  }
  async function updateInstructiondata(values: InstructionsInterface) {
    try {
      const data = await updateInstructions(values, match.params.id);
      console.log(data);
      navigate('');
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
      return (
        <AddEditInstrumentTemplate
          edit={true}
          Instructiondata={state.AddEditInstructionsInterface}
          submitInstrument={updateInstructiondata}
        />
      );
    } else if (isAdd(match.path)) {
      return (
        <AddEditInstrumentTemplate
          Instructiondata={state.AddEditInstructionsInterface}
          submitInstrument={AddInstructiondata}
        />
      );
    }
    return (
      <InstrumentTemplate
        Instructions={state.InstructionsTemplate}
        navigate={navigate}
        filterHandler={filterHandler}
        pageDetails={state.pageDetails || defaultPageDetail}
        resetPager={state.resetPager}
        savedSearch={state.filters.Search}
        edit={(id: any) => {
          navigate(`/edit/${id}`);
        }}
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
