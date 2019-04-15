import React, { useState } from 'react';

import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import ESModal from '../../components/molecules/Modal';
import Pager from '../../components/molecules/Pager';
import ListCardItems from '../../components/organisms/InstrumentListCardItems';
import InstrumentTemplateFilters from './filters';
import { PageDetailsInterface } from '../../api/ResponseInterface';

interface Props {
  instrumentTemplates: InstrumentTemplateInterface[];
  navigate: (path: string) => void;
  filterHandler: (filters: InstrumentTemplateFilterInterface) => void;
  pageDetails: PageDetailsInterface;
  resetPager: boolean;
}

const InstrumentTemplate: React.FunctionComponent<Props> = ({
  instrumentTemplates,
  navigate,
  filterHandler,
  pageDetails,
  resetPager,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPageChange = (PageNumber: number) => {
    filterHandler({ PageNumber });
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const applyFilters = (filters: InstrumentTemplateFilterInterface) => {
    filterHandler(filters);
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instrument Templates"
            filterAction={filtersClickHandler}
            searchHandler={(search: string) => {
              applyFilters({ search });
            }}
            actionButtonText="Add Instrument Template"
            actionHandler={() => navigate('/add')}
          />
          <PageBody>
            <ListCardItems
              titleKey="title"
              listData={instrumentTemplates}
              edit={(id: string) => {
                navigate(`/edit/${id}`);
              }}
              // remove={remove}
              // addInstrument={addInstrument}
            />
            <Pager
              pageSize={pageDetails.pageSize || 25}
              totalRecords={pageDetails.totalCount || 25}
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
      >
        <InstrumentTemplateFilters />
      </ESModal>
    </React.Fragment>
  );
};

export default InstrumentTemplate;
