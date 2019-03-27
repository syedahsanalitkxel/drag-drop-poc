import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  title: string;
  filterAction?: (event: MouseEvent) => void;
  searchHandler?: (searchQuery: string) => void;
  actionButtonText?: string;
  actionHandler?: (event: MouseEvent) => void;
}

const PageHeader: React.FunctionComponent<Props> = ({
  title,
  filterAction,
  searchHandler,
  actionButtonText,
  actionHandler,
}) => {
  const [searchString, setSearchString] = useState('');

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
    <button type="button" className="btn btn-w-m btn-primary">
      <a onClick={actionHandler}>{actionButtonText}</a>
    </button>
  );

  return (
    <div className="PageHeader">
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <h2 className="font-weight-light">{title}</h2>
        </div>
        <div className="col-lg-9 col-md-9 text-right p-r-30">
          <div className="form-group row d-flex justify-content-end">
            {filterAction && renderFilters()}
            <label className="col-lg-1 col-form-label">Search:</label>
            <div className="col-lg-3 p-l-0">{searchHandler && renderSearch()}</div>
            {actionButtonText && actionHandler && renderActionButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
