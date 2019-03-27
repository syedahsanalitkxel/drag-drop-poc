import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Checkbox from '.';

storiesOf('Atoms.CheckBox', module)
  .add('Selected', () => (
    <Checkbox name="selectedExample" value="val" currentSelection="val">
      Selected Radio
    </Checkbox>
  ))
  .add('Not Selected', () => (
    <Checkbox name="selectedExample" value="val" currentSelection="Val2">
      Selected Radio
    </Checkbox>
  ))
  .add('Working group', () => {
    const [selected, setSelected] = useState('val1');

    const handleChange = (event: any) => {
      setSelected(event.target.value);
    };

    return (
      <div className="form-group row">
        <label className="col-sm-1 col-form-label font-bold">Type</label>
        <div className="col-sm-5">
          <Checkbox name="example" value="val1" currentSelection={selected} onChange={handleChange}>
            Selected Item
          </Checkbox>
          <Checkbox name="example" value="val2" currentSelection={selected} onChange={handleChange}>
            Another Item
          </Checkbox>
          <Checkbox name="example" value="val3" currentSelection={selected} onChange={handleChange}>
            Item 3
          </Checkbox>
        </div>
      </div>
    );
  });
