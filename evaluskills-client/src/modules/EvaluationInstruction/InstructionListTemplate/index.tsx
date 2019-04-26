import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { Instructions } from '../Interface';
import Collapse from '../../../components/atoms/Collapse';
import PageBody from '../../../components/atoms/PageBody';
import PageHeader from '../../../components/atoms/PageHeader';
import Pager from '../../../components/molecules/Pager';
import EmptyPage from '../../../components/atoms/EmptyPage';
interface Props {
  Instructions?: Instructions[];
  add?: () => void;
  edit: (assessmentId: number) => void;
  remove?: (assessmentId: string) => void;
  filterHandler: (filters: any) => void;
  appliedFilters?: any;
  resetPager: boolean;
  defaultFilters?: any;
  copy?: (assessmentId: number) => void;
  pageDetails: any;
  savedSearch: string;
  navigate: (path: string, root?: boolean) => void;
}

const InstructionTemplate: React.FunctionComponent<Props> = ({
  Instructions,
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
  navigate,
}) => {
  const onPageChange = (PageNumber: number) => {
    filterHandler({ PageNumber });
  };
  const StyledPageBody = styled.div`
    padding-bottom: 6px;
  `;
  const initialState = {
    accreditation: undefined,
    application: undefined,
    categoryId: undefined,
    competencyId: undefined,
    itemStatusIds: undefined,
    TypeIds: [],
    navigate,
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
  // const HtmlRender = (Html: any) => {
  //   var htmlToReactParser = new HtmlToReactParser();
  //   var reactElement = htmlToReactParser.parse(Html);
  //   var reactHtml = ReactDOMServer.renderToStaticMarkup(reactElement);

  //   assert.equal(reactHtml, htmlInput); // true
  // };

  let html =
    "<h3>Bold text,<strong> Italic text..... this is</strong><span style='color:rgb(209,72,65)'><strong>  ali zain javed</strong></span><br><br></h3>";
  const renderInstructionData = (instructions: Instructions, index: number) => {
    return (
      <Fragment>
        <StyledPageBody>
          <Collapse
            index={instructions.id}
            edit={edit}
            title={instructions && instructions.title}
            instructions={instructions}
            copy={copy}
          >
            <div className="card">
              <div className="ibox-content">{Parser(instructions && instructions.instructions)}</div>
            </div>
          </Collapse>
        </StyledPageBody>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Instructions Items"
            searchHandler={(Search: string) => {
              applyFilters({ Search });
            }}
            actionButtonText="Add Instruction"
            actionHandler={() => navigate('/add')}
            savedSearch={savedSearch}
          />
          <PageBody>
            {Instructions && Instructions.length === 0 && <EmptyPage />}
            {Instructions && Instructions.map(renderInstructionData)}
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
    </Fragment>
  );
};

export default InstructionTemplate;
