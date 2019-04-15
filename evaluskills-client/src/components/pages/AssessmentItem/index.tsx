import React, { useState } from 'react';

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
  filterAssessments: (searchQuery: string) => void;
  add: () => void;
  edit?: (assessmentId: string) => void;
  remove?: (assessmentId: string) => void;
}

const AssessmentItem: React.FunctionComponent<Props> = ({
  assessments,
  filterAssessments,
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

  const applyFilters = (filters: AssessmentFiltersInterface) => {
    console.log(filters);
  };

  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Assessment Items"
            filterAction={filtersClickHandler}
            searchHandler={filterAssessments}
            actionButtonText="Add Assessment Item"
            actionHandler={add}
          />
          <PageBody>
            <ListCardItems
              titleKey="definition"
              listData={assessments}
              edit={edit}
              remove={remove}
            />
            {/*<Pager />*/}
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
        <AssessmentFilters />
      </ESModal>
    </DashboardTemplate>
  );
};

export default AssessmentItem;
