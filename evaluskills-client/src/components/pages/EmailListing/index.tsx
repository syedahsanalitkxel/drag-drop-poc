import React, { useState } from 'react';
import { EmailFiterInterface, EmailListingInterface } from '../../../interfaces/Email';
import PageBody from '../../atoms/PageBody';
import PageHeader from '../../atoms/PageHeader';
import Pager from '../../molecules/Pager';
import { PageDetailsInterface } from '../../../api/ResponseInterface';
import ListEmailTemplateCards from '../../molecules/EmailTemplateCard/index';
import EmptyPage from '../../atoms/EmptyPage';

interface Props {
  emailTemplates: EmailListingInterface[];
  add: () => void;
  pageDetails: PageDetailsInterface;
  resetPager: boolean;
  filterHandler: (filters: EmailFiterInterface) => void;
  edit: (emailTemplateId: number) => void;
  remove: (emailTemplateId: number) => void;
  savedSearch?: string;
}

const EmailListing: React.FunctionComponent<Props> = ({
  filterHandler,
  pageDetails,
  resetPager,
  emailTemplates,
  add,
  edit,
  remove,
  savedSearch,
}) => {
  const applyFilters = (filters: EmailFiterInterface) => {
    filterHandler(filters);
  };

  const onPageChange = (pageNumber: number) => {
    filterHandler({ pageNumber });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader
            title="Email"
            searchHandler={(title: string) => {
              applyFilters({ title });
            }}
            actionButtonText="Add Email"
            actionHandler={add}
            savedSearch={savedSearch}
          />
          <PageBody>
            {emailTemplates.length > 0 ? (
              <ListEmailTemplateCards emailTemplates={emailTemplates} edit={edit} remove={remove} />
            ) : (
              <EmptyPage />
            )}
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
    </React.Fragment>
  );
};

export default EmailListing;
