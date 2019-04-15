import React, { useState } from 'react';

import { InstrumentTemplateFilterInterface, InstrumentTemplateInterface } from './interface';

import { PageDetailsInterface } from '../../api/ResponseInterface';
import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import DeleteModal from '../../components/molecules/DeleteModal';
import ESModal from '../../components/molecules/Modal';
import Pager from '../../components/molecules/Pager';
import { actionTypes } from '../../enums';
import InstrumentTemplateFilters from './filters';
import ListInstrumentTemplateCards from './listCards';

interface Props {
  instrumentTemplates: InstrumentTemplateInterface[];
  navigate: (path: string, root?: boolean) => void;
  filterHandler: (filters: InstrumentTemplateFilterInterface) => void;
  pageDetails: PageDetailsInterface;
  resetPager: boolean;
  handleDelete: (id: string) => void;
}

const InstrumentTemplate: React.FunctionComponent<Props> = ({
  instrumentTemplates,
  navigate,
  filterHandler,
  pageDetails,
  resetPager,
  handleDelete,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    id: '',
    visible: false,
  });

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
    if (mode === actionTypes.DELETE) {
      if (id) {
        if (typeof id === 'string') {
          setDeleteModalState({ visible: true, id });
        } else {
          setDeleteModalState({ visible: true, id: id.toString() });
        }
      }
    } else if (mode === actionTypes.START_EVALUATION) {
      navigate(`/addInstrumental`, true);
    } else {
      navigate(`/${mode}/${id}`);
    }
  };

  const deleteModalAction = (id: string) => {
    setDeleteModalState({ id: '', visible: false });
    handleDelete(id);
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

      <DeleteModal
        visible={deleteModalState.visible}
        id={deleteModalState.id}
        toggle={() =>
          setDeleteModalState({
            id: deleteModalState.id,
            visible: !deleteModalState.visible,
          })
        }
        actionHandler={deleteModalAction}
      />

      <ESModal
        title="Filters"
        visible={modalVisible}
        toggle={toggleFilterModal}
        primaryAction={applyFilters}
        primaryText="Apply"
        secondaryText="Reset"
        secondaryAction="dismiss"
      >
        <InstrumentTemplateFilters />
      </ESModal>
    </React.Fragment>
  );
};

export default InstrumentTemplate;
