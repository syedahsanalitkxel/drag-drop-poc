import React from 'react';
import Card from '../Card';

const EmptyPage: React.FunctionComponent = () => (
  <div className="row">
    <div className="col-md-12 text-center">
      <Card>No Record Found</Card>
    </div>
  </div>
);

export default EmptyPage;
