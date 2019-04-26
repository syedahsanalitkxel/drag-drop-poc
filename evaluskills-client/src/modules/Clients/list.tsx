import React, { useContext, useState } from 'react';
import ClientList from './clientListInterface';
import { ClientFilters } from './clientFilterInterface';
import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import ESModal from '../../components/molecules/Modal';
import Pager from '../../components/molecules/Pager';
import ClientFilter from './filter';
import ClientsList from './listCard';
import { PageDetailsInterface } from '../../api/ResponseInterface';
import EmptyPage from '../../components/atoms/EmptyPage';

interface Props {
  clients: ClientList[];
  filterClients: (searchQuery: string) => void;
  add: () => void;
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
  login: (clientId: number) => void;
  applyFilters: (filters: ClientFilters) => void;
  filtersClickHandler: (event: React.MouseEvent) => void;
  onPageChange: (pageNumber: number) => void;
  pageDetails: PageDetailsInterface;
  modalVisible: boolean;
  toggleFilterModal: () => void;
  appliedFilters: ClientFilters;
  resetPager: boolean;
  defaultFilters: any;
  savedSearch?: string;
}

const DashboardHome: React.FunctionComponent<Props> = ({
  clients,
  filterClients,
  add,
  edit,
  login,
  remove,
  applyFilters,
  filtersClickHandler,
  onPageChange,
  modalVisible,
  pageDetails,
  toggleFilterModal,
  appliedFilters,
  resetPager,
  defaultFilters,
  savedSearch,
}) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Client"
            filterAction={filtersClickHandler}
            searchHandler={(keyword: string) => {
              applyFilters({ keyword });
            }}
            actionButtonText="Add Client"
            actionHandler={add}
            savedSearch={savedSearch}
          />
          <PageBody>
            {clients && clients.length > 0 ? (
              <ClientsList listData={clients} login={login} edit={edit} remove={remove} />
            ) : (
              <EmptyPage />
            )}
            <Pager
              pageSize={pageDetails.pageSize || 0}
              totalRecords={pageDetails.totalCount || 0}
              pageNumber={pageDetails.currentPage}
              onPageChanged={onPageChange}
              shouldReset={resetPager}
            />
          </PageBody>
        </div>
      </div>

      <ESModal
        title="Filters"
        visible={modalVisible}
        toggle={toggleFilterModal}
        primaryAction={applyFilters}
        primaryText="Apply"
        secondaryText="Reset"
        secondaryAction="reset"
        defaultFilters={defaultFilters}
      >
        <ClientFilter />
      </ESModal>
    </React.Fragment>
  );
};

export default DashboardHome;
