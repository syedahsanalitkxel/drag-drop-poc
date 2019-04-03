import React, { Fragment, useState } from 'react';
import { Instructions } from '../../../interfaces/Instructions';
import styled from 'styled-components';
import Collapse from '../../atoms/Collapse';
import PageBody from '../../atoms/PageBody';
import DashboardTemplate from '../../templates/DashboardTemplate';

import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
interface Props {
  InstrcutionsTemplate: Instructions[];
  add: () => void;
  filterInstrcutionsTemplates: (searchQuery: string) => void;
  edit: (instrumentTemplateId: number) => void;
}
const StyledPageBody = styled.div`
  padding: 4px;
`;
const InstructionListing: React.FunctionComponent<Props> = ({
  filterInstrcutionsTemplates,
  InstrcutionsTemplate,
  add,
  edit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const renderInstructionData = (email: Instructions) => {
    return (
      <Fragment>
        <StyledPageBody>
          <Collapse
            edit={edit}
            title="Instructions Title Click Arrow At Right To Expand Instructions"
          >
            <div className="card">
              <div className="ibox-content">
                <p>
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
                  magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies
                  nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                </p>
                <p>
                  Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                  rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
                  mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                </p>
              </div>
            </div>
          </Collapse>
        </StyledPageBody>
      </Fragment>
    );
  };
  return (
    <DashboardTemplate>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instructions Items"
            searchHandler={filterInstrcutionsTemplates}
            actionButtonText="Add Instructions"
            actionHandler={add}
          />
          <PageBody>
            <div className="Card">{InstrcutionsTemplate.map(renderInstructionData)}</div>
          </PageBody>
          <Pager />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default InstructionListing;
