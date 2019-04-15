import React, { useState } from 'react';

import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

import { PageDetailsInterface } from '../../api/ResponseInterface';
import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import ESModal from '../../components/molecules/Modal';
import Pager from '../../components/molecules/Pager';
import { actionTypes } from '../../enums';
import InstrumentTemplateFilters from './filters';
import ListInstrumentTemplateCards from './listCards';

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

  const actionHandler = (mode: actionTypes, id?: string | number) => {
    switch (mode) {
      case actionTypes.COPY:
        console.log(id, mode);
        break;
      case actionTypes.EDIT:
        console.log(id, mode);
        break;
      case actionTypes.DELETE:
        console.log(id, mode);
        break;
      default:
        console.log(mode);
    }
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instrument Templates"
            filterAction={filtersClickHandler}
            searchHandler={(Search: string) => {
              applyFilters({ Search });
            }}
            actionButtonText="Add Instrument Template"
            actionHandler={() => navigate('/add')}
          />
          <PageBody>
            <ListInstrumentTemplateCards actionHandler={actionHandler} instrumentTemplates={instrumentTemplates} />
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
