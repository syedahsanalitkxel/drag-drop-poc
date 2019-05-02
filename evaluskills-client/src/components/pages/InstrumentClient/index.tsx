import React, { useState } from 'react';

import InstrumentFiltersInterface from '../../../interfaces/InstrumentFilters';
import { ClientInstruments } from '../../../interfaces/Instruments';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import InstrumentClientFilters from '../../organisms/InstrumentClientFilter';
import InstrumentListCard from '../../organisms/InstrumentListCard';
import EmptyPage from '../../atoms/EmptyPage';
import { PageDetailsInterface } from '../../../api/ResponseInterface';

interface Props {
  instruments: ClientInstruments[];
  filterInstruments: (filter: InstrumentFiltersInterface) => void;
  pageDetails: PageDetailsInterface;
  filterHandler: (filters: InstrumentFiltersInterface) => void;
  resetPager: boolean;
  defaultFilters: any;
  savedSearch?: string;
  view: (instrumentTemplateId: string) => void;
}

const InstrumentTemplate: React.FunctionComponent<Props> = ({
  savedSearch,
  filterHandler,
  resetPager,
  pageDetails,
  instruments,
  defaultFilters,
  filterInstruments,
  view,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const applyFilters = (filters: InstrumentFiltersInterface) => {
    filterHandler(filters);
    setModalVisible(false);
  };

  const onPageChange = (pageNumber: number) => {
    filterHandler({ pageNumber });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instrument"
            filterAction={filtersClickHandler}
            searchHandler={(search: string) => {
              applyFilters({ search });
            }}
            savedSearch={savedSearch}
          />
          <PageBody>
            {instruments && instruments.length > 0 ? (
              <InstrumentListCard titleKey="title" listData={instruments} view={view} />
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
        primaryText="Save Changes"
        secondaryText="Reset"
        secondaryAction="reset"
        defaultFilters={defaultFilters}
      >
        <InstrumentClientFilters />
      </ESModal>
    </React.Fragment>
  );
};

export default InstrumentTemplate;
