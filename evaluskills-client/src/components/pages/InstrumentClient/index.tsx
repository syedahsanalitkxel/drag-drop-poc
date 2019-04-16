import React, { useState } from 'react';

import InstrumentFiltersInterface from '../../../interfaces/InstrumentFilters';
import { ClientInstruments } from '../../../interfaces/Instruments';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import InstrumentClientFilters from '../../organisms/InstrumentClientFilter';
import InstrumentListCard from '../../organisms/InstrumentListCard';
import DashboardTemplate from '../../templates/DashboardTemplate';

interface Props {
  instruments: ClientInstruments[];
  filterInstruments: (searchQuery: string) => void;
  view?: (instrumentTemplateId: string) => void;
}

const InstrumentTemplate: React.FunctionComponent<Props> = ({ instruments, filterInstruments, view }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const applyFilters = (filters: InstrumentFiltersInterface) => {
    console.log(filters);
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader title="Instrument" filterAction={filtersClickHandler} searchHandler={filterInstruments} />
          <PageBody>
            <InstrumentListCard titleKey="title" listData={instruments} view={view} />
            {/*<Pager />*/}
          </PageBody>
        </div>
      </div>

      <ESModal
        title="Filters"
        visible={modalVisible}
        toggle={toggleFilterModal}
        primaryAction={applyFilters}
        primaryText="Save Changes"
        secondaryText="Close"
        secondaryAction="reset"
      >
        <InstrumentClientFilters />
      </ESModal>
    </DashboardTemplate>
  );
};

export default InstrumentTemplate;
