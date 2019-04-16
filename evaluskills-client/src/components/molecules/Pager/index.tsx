import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PagerInterface } from '../../../interfaces/Pager';

interface Props {
  totalRecords: number;
  pageSize: number;
  shouldReset: boolean;
  onPageChanged: (pageNumber: number) => void;
  pageNumber?: number;
}

const initialState: PagerInterface = {
  currentFirstPageNumber: 1,
  currentLastPageNumber: 1,
  currentPageNumber: 1,
  pageSize: 1,
  totalPages: 1,
  totalPagesToDisplay: 5,
};

const Pager: React.FunctionComponent<Props> = ({ totalRecords, pageSize, pageNumber, onPageChanged, shouldReset }) => {
  if (pageNumber) {
    initialState.currentPageNumber = pageNumber;
  }

  const [pagerState, setPagerState] = useState(initialState);

  useEffect(() => {
    let totalPage;

    if (pageNumber) {
      totalPage = pageSize > 0 && totalRecords > 0 ? Math.floor(totalRecords / pageSize) : 0;
    } else {
      totalPage = pageSize > 0 && totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : 0;
    }
    const totalPagesRemainder = pageSize > 0 && totalRecords > 0 ? totalRecords % pageSize : 0;
    const totalPagesCount = totalPagesRemainder > 0 ? totalPage + 1 : totalPage;

    setPagerState({
      ...pagerState,
      currentFirstPageNumber: 1,
      currentLastPageNumber: totalPagesCount > 5 ? 5 : totalPagesCount,
      currentPageNumber: pageNumber || 1,
      pageSize,
      totalPages: totalPagesCount,
      totalPagesToDisplay: totalPagesCount > 5 ? 5 : totalPagesCount,
    });
  }, [shouldReset]);

  function updatePager(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, currentPage: number) {
    event.preventDefault();
    onPageChanged(currentPage);
    if (currentPage >= pagerState.currentLastPageNumber && pagerState.currentLastPageNumber !== pagerState.totalPages) {
      setPagerState(prevState => {
        return {
          ...prevState,
          currentFirstPageNumber: prevState.currentFirstPageNumber + 1,
          currentLastPageNumber: prevState.currentLastPageNumber + 1,
          currentPageNumber: currentPage,
        };
      });
    } else if (currentPage === pagerState.currentFirstPageNumber && pagerState.currentFirstPageNumber !== 1) {
      setPagerState(prevState => {
        return {
          ...prevState,
          currentFirstPageNumber: prevState.currentFirstPageNumber - 1,
          currentLastPageNumber: prevState.currentLastPageNumber - 1,
          currentPageNumber: currentPage,
        };
      });
    } else {
      setPagerState({
        ...pagerState,
        currentPageNumber: currentPage,
      });
    }
  }

  const paginationItemsArray = new Array(pagerState.totalPagesToDisplay);

  for (
    let i = pagerState.currentFirstPageNumber;
    i < paginationItemsArray.length + pagerState.currentFirstPageNumber;
    i++
  ) {
    paginationItemsArray[i - pagerState.currentFirstPageNumber] = i;
  }
  return pagerState.totalPages > 1 ? (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={pagerState.currentPageNumber === 1}>
        <PaginationLink
          href="#"
          onClick={event => {
            updatePager(event, pagerState.currentPageNumber - 1);
          }}
        >
          Previous
        </PaginationLink>
      </PaginationItem>
      {paginationItemsArray.map(element => {
        return (
          <PaginationItem active={element === pagerState.currentPageNumber} key={element}>
            <PaginationLink
              href="#"
              onClick={event => {
                updatePager(event, element);
              }}
            >
              {element}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={pagerState.currentPageNumber === pagerState.totalPages}>
        <PaginationLink
          href="#"
          onClick={event => {
            updatePager(event, pagerState.currentPageNumber + 1);
          }}
        >
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  ) : (
    <div />
  );
};

export default React.memo(Pager);
