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

interface Props {
  clients: ClientList[];
  filterClients: (searchQuery: string) => void;
  add: () => void;
  edit: (clientId: number) => void;
  remove: (clientId: number) => void;
}

const DashboardHome: React.FunctionComponent<Props> = ({
  clients,
  filterClients,
  add,
  edit,
  remove,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const applyFilters = (filters: ClientFilters) => {
    console.log(filters);
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Client"
            filterAction={filtersClickHandler}
            searchHandler={filterClients}
            actionButtonText="Add Client"
            actionHandler={add}
          />
          <PageBody>
            <ClientsList listData={clients} edit={edit} remove={remove} />
            <Pager />
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
      >
        <ClientFilter />
      </ESModal>
    </DashboardTemplate>
  );
};

export default DashboardHome;
