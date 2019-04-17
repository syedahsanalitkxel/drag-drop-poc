import React, { useState, Fragment } from 'react';

import AssessmentFiltersInterface from '../../../interfaces/AssessmentFilters';
import AssessmentItemInterface from '../../../interfaces/AssessmentItem';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import ESModal from '../../molecules/Modal';
import Pager from '../../molecules/Pager';
import AssessmentFilters from '../../organisms/AssessmentFilters';
import ListCardItems from '../../organisms/ListCardItems';
import DashboardTemplate from '../../templates/DashboardTemplate';

interface Props {
  assessments: AssessmentItemInterface[];
  add: () => void;
  edit?: (assessmentId: string) => void;
  remove?: (assessmentId: string) => void;
  filterHandler: (filters: any) => void;
  appliedFilters: any;
  resetPager: boolean;
  copy?: (assessmentId: string) => void;
}

const AssessmentItem: React.FunctionComponent<Props> = ({
  assessments,
  add,
  edit,
  remove,
  copy,
  filterHandler,
  appliedFilters,
  resetPager,
}) => {
  const onPageChange = (PageNumber: number) => {
    filterHandler({ PageNumber });
  };
  const toggleFilterModal = () => {
    setModalVisible(!modalVisible);
  };
  const filtersClickHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFilterModal();
  };
  const [modalVisible, setModalVisible] = useState(false);
  const applyFilters = (filters: any) => {
    filterHandler(filters);
    setModalVisible(false);
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Assessment Items"
            filterAction={filtersClickHandler}
            searchHandler={(search: string) => {
              applyFilters({ search });
            }}
            actionButtonText="Add Assessment Item"
            actionHandler={add}
          />
          <PageBody>
            <ListCardItems titleKey="definition" listData={assessments} copy={copy} edit={edit} remove={remove} />
            <Pager
              pageSize={appliedFilters.PageSize || 0}
              totalRecords={appliedFilters.TotalRecords || 0}
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
        secondaryAction="dismiss"
      >
        <AssessmentFilters />
      </ESModal>
    </Fragment>
  );
};

export default AssessmentItem;
