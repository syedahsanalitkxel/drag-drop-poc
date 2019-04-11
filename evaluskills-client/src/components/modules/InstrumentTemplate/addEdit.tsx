import React, { useContext } from 'react';

import LookupContext from '../../../context/LookupContext';
import { InstrumentTemplateInterface } from './interface';

interface Props {
  defaultValue?: InstrumentTemplateInterface;
}

const AddEditInstrumentTemplate: React.FunctionComponent<Props> = ({ defaultValue }) => {
  const lookupContext = useContext(LookupContext);

  console.log(lookupContext);
  if (defaultValue) {
    return <h2>Edit Instrument</h2>;
  }
  return <h1>Add Instrument</h1>;
};

export default AddEditInstrumentTemplate;
