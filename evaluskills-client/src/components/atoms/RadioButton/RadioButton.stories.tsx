import React, { ChangeEvent, useState } from 'react';

import { storiesOf } from '@storybook/react';
import { FormGroup, Label } from 'reactstrap';

import RadioButton from '.';

storiesOf('Atoms.RadioButton', module)
  .add('Selected', () => (
    <RadioButton name="selectedExample" value="val" currentSelection="val">
      Selected Radio
    </RadioButton>
  ))
  .add('Not Selected', () => (
    <RadioButton name="selectedExample" value="val" currentSelection="Val2">
      Selected Radio
    </RadioButton>
  ))
  .add('Working group', () => {
    const [selected, setSelected] = useState('val1');

    const handleChange = (value: string) => {
      setSelected(value);
    };

    return (
      <FormGroup className="row">
        <Label className="col-sm-1 col-form-label font-bold">Type</Label>
        <div className="col-sm-5">
          <RadioButton
            name="example"
            value="val1"
            currentSelection={selected}
            onChange={handleChange}
          >
            Selected Item
          </RadioButton>
          <RadioButton
            name="example"
            value="val2"
            currentSelection={selected}
            onChange={handleChange}
          >
            Another Item
          </RadioButton>
          <RadioButton
            name="example"
            value="val3"
            currentSelection={selected}
            onChange={handleChange}
          >
            Item 3
          </RadioButton>
        </div>
      </FormGroup>
    );
  });
