import React, { useState } from 'react';
import ClientList from '../../../interfaces/Client';
import { ClientFilters } from '../../../interfaces/ClientFilter';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import ClientFilter from '../../organisms/ClientFilters';
import ClientsList from '../../organisms/ClientsList';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { PageDetailsInterface } from '../../../api/ResponseInterface';

interface Props {
  clients: ClientList[];
  filterClients: (searchQuery: string) => void;
  add: () => void;
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
  applyFilters: (filters: ClientFilters) => void;
  filtersClickHandler: (event: React.MouseEvent) => void;
  onPageChange: (pageNumber: number) => void;
  pageDetails: PageDetailsInterface;
  modalVisible: boolean;
  toggleFilterModal: () => void;
  appliedFilters: ClientFilters;
  resetPager: boolean;
  defaultFilters: any;
}

const DashboardHome: React.FunctionComponent<Props> = ({
  clients,
  filterClients,
  add,
  edit,
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
}) => {
  return (
    <DashboardTemplate>
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
          />
          <PageBody>
            <ClientsList listData={clients} edit={edit} remove={remove} />
            {clients.length > 0 && (
              <Pager
                pageSize={pageDetails.pageSize || 0}
                totalRecords={pageDetails.totalCount || 0}
                pageNumber={pageDetails.currentPage}
                onPageChanged={onPageChange}
                shouldReset={resetPager}
              />
            )}
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
    </DashboardTemplate>
  );
};

export default DashboardHome;
