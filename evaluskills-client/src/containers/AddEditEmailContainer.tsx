import React, { lazy, useContext, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getActiveClient, USER_ROLE } from '../utils';

const AddEmailTemplate = lazy(() => import('../components/pages/AddEmailTemplate'));
const EmailListing = lazy(() => import('../components/pages/EmailListing'));
import ErrorContext from '../context/ErrorContext';
import { EmailFiterInterface, EmailListingInterface } from '../interfaces/Email';
import RouterPropsInterface from '../interfaces/RouteParams';
import { addEmail, editEmail, getFilteredEmails, getEmailById } from '../services/emailTemplateService';
import { isAdd, isEdit, isList } from '../utils/routerUtils';
import { PageDetailsInterface } from '../api/ResponseInterface';
import FilterContext from '../components/pages/EmailListing/context';

import Spinner from '../components/atoms/Spinner';
import DashboardTemplate from '../components/templates/DashboardTemplate';

const emailTemplates: EmailListingInterface[] = [];
const emailTemplate = {};

const defaultFilters: EmailFiterInterface = {
  pageNumber: 1,
  pageSize: 10,
};

const defaultPageDetail = {
  currentPage: defaultFilters.pageNumber || 1,
  pageSize: 25,
  totalCount: 10,
};

interface State {
  emailTemplates: EmailListingInterface[];
  emailTemplate: any;
  filters: EmailFiterInterface;
  resetPager: boolean;
  pageDetails?: PageDetailsInterface;
  isLoading: boolean;
}

const EmailTemplateContainer: React.FunctionComponent<RouteComponentProps<RouterPropsInterface>> = ({
  history,
  match,
}) => {
  const errorContext = useContext(ErrorContext);
  const [state, setState] = useState<State>({
    emailTemplate,
    emailTemplates,
    filters: defaultFilters,
    isLoading: false,
    pageDetails: defaultPageDetail,
    resetPager: false,
  });

  useEffect(() => {
    if (isEdit(match.params)) {
      fetchEditEmailTemplate(match.params.id);
    } else if (isList(match.path)) {
      fetchEmailTemplates(state.filters);
    }
  }, [match.path, state.filters]);

  function filterHandler(filters: EmailFiterInterface) {
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

  async function fetchEditEmailTemplate(id: any) {
    setState({ ...state, isLoading: true });
    const editTemplate: any = await getEmailById(id);

    editTemplate.body = unescape(editTemplate.body);
    setState({
      ...state,
      emailTemplate: {
        ...editTemplate,
        body: unescape(editTemplate.body),
      },
      isLoading: false,
    });
  }

  async function fetchEmailTemplates(filters: EmailFiterInterface) {
    try {
      setState({ ...state, isLoading: true });
      const allTemplates: any = await getFilteredEmails(filters);
      setState({
        ...state,
        emailTemplates: allTemplates.emailData,
        isLoading: false,
        pageDetails: allTemplates.pageDetails,
      });
    } catch (error) {
      errorContext.setError(error, true);
      setState({ ...state, isLoading: false });
    }
  }

  function addInstrumentTemplate() {
    history.push('/email/add');
  }

  function editInstrumentTemplate(instrumentTemplate: number) {
    history.push(`/email/edit/${instrumentTemplate}`);
  }

  function deleteInstrumentTemplate(instrumentTemplate: number) {
    alert(`deleting => ${instrumentTemplate}`);
  }

  async function AddEmaildata(values: any, type?: string, id?: string) {
    if (USER_ROLE.isClientAdmin() || USER_ROLE.isSuperAdmin()) {
      if (getActiveClient()) {
        values.clientId = getActiveClient();
      }
    }
    values.body = escape(values.body);
    if (type === 'Add') {
      try {
        const emailData: any = await addEmail(values);
        if (!emailData.fail) {
          history.push('/email');
        }
      } catch (error) {
        errorContext.setError(error, true);
      }
    } else if (type === 'Edit' && id) {
      try {
        const emailData: any = await editEmail(values, id);
        if (!emailData.fail) {
          history.push('/email');
        }
      } catch (error) {
        errorContext.setError(error, true);
      }
    }
  }

  function cancelForm() {
    history.push('/email');
  }

  function renderPage() {
    if (state.isLoading) {
      return <Spinner lightBg={true} />;
    }

    if (isEdit(match.params)) {
      return (
        <AddEmailTemplate
          edit={true}
          list={state.emailTemplate}
          submitEmailTemplate={AddEmaildata}
          cancelHandler={cancelForm}
          name="Edit"
        />
      );
    } else if (isAdd(match.path)) {
      return <AddEmailTemplate submitEmailTemplate={AddEmaildata} cancelHandler={cancelForm} name="Add" />;
    }
    return (
      <FilterContext.Provider value={{ activeFilters: state.filters }}>
        <EmailListing
          emailTemplates={state.emailTemplates}
          pageDetails={state.pageDetails || defaultPageDetail}
          resetPager={state.resetPager}
          add={addInstrumentTemplate}
          edit={editInstrumentTemplate}
          remove={deleteInstrumentTemplate}
          savedSearch={state.filters.title}
          filterHandler={filterHandler}
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

export default withRouter(EmailTemplateContainer);
