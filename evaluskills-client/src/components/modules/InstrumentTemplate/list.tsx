import React, { useState } from 'react';

import AssessmentFiltersInterface from '../../../interfaces/AssessmentFilters';
import { InstrumentTemplateInterface } from './interface';

import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import InstrumentFilters from '../../organisms/InstrumentFilters';
import ListCardItems from '../../organisms/InstrumentListCardItems';

interface Props {
  instrumentTemplates: InstrumentTemplateInterface[];
  navigate: (path: string) => void;
}

const InstrumentTemplate: React.FunctionComponent<Props> = ({ instrumentTemplates, navigate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };

  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };

  const applyFilters = (filters: AssessmentFiltersInterface) => {};

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instrument Templates"
            filterAction={filtersClickHandler}
            searchHandler={() => {}}
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
        <InstrumentFilters />
      </ESModal>
    </React.Fragment>
  );
};

export default InstrumentTemplate;
