import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Pager: React.FunctionComponent = () => (
  <Pagination aria-label="Page navigation example">
    <PaginationItem disabled={true}>
      <PaginationLink href="#">Previous</PaginationLink>
    </PaginationItem>
    <PaginationItem active={true}>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">Next</PaginationLink>
    </PaginationItem>
  </Pagination>
);

export default Pager;
