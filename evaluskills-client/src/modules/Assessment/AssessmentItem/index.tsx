import React, { Fragment, useState } from 'react';
import PageBody from '../../../components/atoms/PageBody';
import AssessmentItemInterface from '../interface';

import { PageDetailsInterface } from '../../../api/ResponseInterface';
import PageHeader from '../../../components/atoms/PageHeader';
import ESModal from '../../../components/molecules/Modal';
import Pager from '../../../components/molecules/Pager';
import AssessmentFilters from '../AssessmentFilters';
import ListCardItems from './ListCardItems';

interface Props {
  assessments: AssessmentItemInterface[];
  add: () => void;
  edit?: (assessmentId: string) => void;
  remove?: (assessmentId: string) => void;
  filterHandler: (filters: any) => void;
  appliedFilters: any;
  resetPager: boolean;
  defaultFilters: any;
  copy?: (assessmentId: string) => void;
  pageDetails: PageDetailsInterface;
  savedSearch?: string;
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
  defaultFilters,
  pageDetails,
  savedSearch,
}) => {
  const onPageChange = (PageNumber: number) => {
    filterHandler({ PageNumber });
  };
  const initialState = {
    accreditation: undefined,
    application: undefined,
    categoryId: undefined,
    competencyId: undefined,
    itemsStatusIds: undefined,
    itemRecomendedApplications: [],
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
            savedSearch={savedSearch}
          />
          <PageBody>
            <ListCardItems titleKey="definition" listData={assessments} copy={copy} edit={edit} remove={remove} />
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
        primaryText="Apply"
        secondaryText="Reset"
        secondaryAction="reset"
        defaultFilters={initialState}
      >
        <AssessmentFilters />
      </ESModal>
    </Fragment>
  );
};

export default AssessmentItem;
