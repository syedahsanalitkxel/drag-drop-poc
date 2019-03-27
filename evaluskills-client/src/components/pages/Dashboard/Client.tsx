import React, {useState} from 'react';
// import Client from "../../../interfaces/Client";
import DashboardTemplate from '../../templates/DashboardTemplate';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import ClientList from "../../../interfaces/Client";
import ClientFilters from "../../organisms/ClientFilters";
import {IClientFilters} from "../../../interfaces/ClientFilter";
import ClientsList from '../../organisms/ClientsList'

interface Props {
  clients: ClientList[];
  filterClients: (searchQuery: string) => void;
  add: () => void;
  edit: (clientId: string) => void;
  remove: (clientId: string) => void;
}

const DashboardHome : React.FunctionComponent<Props> = ({
                                                          clients, filterClients, add, edit, remove
                                                        }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal()
  };

  const applyFilters = (filters: IClientFilters) => {
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
            <ClientsList listData={clients}/>
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
        <ClientFilters />
      </ESModal>
    </DashboardTemplate>
  );
};

export default DashboardHome;
