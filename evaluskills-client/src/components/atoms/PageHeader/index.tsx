import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  title: string;
  filterAction?: (event: MouseEvent) => void;
  searchHandler?: (searchQuery: string) => void;
  actionButtonText?: string;
  actionHandler?: (event: MouseEvent) => void;
  activeButtonText?: string;
  activeButtonActionHandler?: (event: MouseEvent) => void;
  viewButtonText?: string;
  viewButtonActionHandler?: (event: MouseEvent) => void;
  cancelButtonText?: string;
  cancelButtonActionHandler?: (event: MouseEvent) => void;
  addAssessmentButtonText?: string;
  addAssessmentActionHandler?: (event: MouseEvent) => void;
  savedSearch?: any;
}

const PageHeader: React.FunctionComponent<Props> = ({
  title,
  filterAction,
  searchHandler,
  actionButtonText,
  actionHandler,
  activeButtonText,
  activeButtonActionHandler,
  viewButtonText,
  viewButtonActionHandler,
  cancelButtonText,
  savedSearch,
  cancelButtonActionHandler,
  addAssessmentButtonText,
  addAssessmentActionHandler,
}) => {
  const [searchString, setSearchString] = useState(savedSearch || '');
  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const executeSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchHandler && e.keyCode === 13) {
      searchHandler(searchString);
    }
  };

  const renderFilters = () => (
    <button type="button" className="btn btn-default" onClick={filterAction}>
      <FontAwesomeIcon icon="filter" />
      &nbsp;&nbsp;Filters Area
    </button>
  );

  const renderSearch = () => (
    <input
      type="text"
      className="form-control"
      value={searchString}
      onChange={searchChangeHandler}
      onKeyDown={executeSearch}
    />
  );

  const renderActionButton = () => (
    <button type="button" onClick={actionHandler} className="btn btn-w-m btn-primary">
      <a>{actionButtonText}</a>
    </button>
  );

  const renderActiveButton = () => (
    <button type="button" onClick={activeButtonActionHandler} className="btn btn-w-m m-r-5 btn-primary">
      <a>{activeButtonText}</a>
    </button>
  );

  const renderViewButton = () => (
    <button type="button" onClick={viewButtonActionHandler} className="btn btn-w-m m-r-5 btn-light">
      <a>{viewButtonText}</a>
    </button>
  );

  const renderCancelButton = () => (
    <button type="button" onClick={cancelButtonActionHandler} className="btn btn-w-m m-r-5 btn-primary">
      <a>{cancelButtonText}</a>
    </button>
  );

  const renderAddAssessmentButton = () => (
    <button type="button" onClick={addAssessmentActionHandler} className="btn btn-w-m m-r-5 btn-primary">
      <a>{addAssessmentButtonText}</a>
    </button>
  );

  return (
    <div className="PageHeader">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <h2>{title}</h2>
        </div>
        <div className="col-lg-8 col-md-8 text-right p-r-30">
          <div className="form-group row d-flex justify-content-end">
            {filterAction && renderFilters()}
            {addAssessmentButtonText && addAssessmentActionHandler && renderAddAssessmentButton()}
            {searchHandler && <label className="col-lg-1 col-form-label">Search:</label>}
            {searchHandler && <div className="col-lg-3 p-l-0">{renderSearch()}</div>}
            {actionButtonText && actionHandler && renderActionButton()}
            {activeButtonText && activeButtonActionHandler && renderActiveButton()}
            {viewButtonText && viewButtonActionHandler && renderViewButton()}
            {cancelButtonText && cancelButtonActionHandler && renderCancelButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
