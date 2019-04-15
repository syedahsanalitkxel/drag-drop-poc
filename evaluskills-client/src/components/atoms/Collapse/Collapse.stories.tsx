import React, { useState, Fragment } from 'react';

import { storiesOf } from '@storybook/react';

import Collapse from '.';

storiesOf('Atoms.Collapse', module)
  .add('single collaps', () => (
    <Collapse edit={() => {}} title="Instructions Title Click Arrow At Right To Expand Instructions">
      <Fragment>
        <div className="card">
          <div className="ibox-content">
            <p>
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
              consequat massa quis enim.
            </p>
            <p>
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
              a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
              Vivamus elementum semper nisi.
            </p>
          </div>
        </div>
      </Fragment>
    </Collapse>
  ))
  .add('multiple collaps', () => (
    <Fragment>
      <Collapse edit={() => {}} title="Instructions Title Click Arrow At Right To Expand Instructions">
        <div className="card">
          <div className="ibox-content">
            <p>
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
              consequat massa quis enim.
            </p>
            <p>
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
              a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
              Vivamus elementum semper nisi.
            </p>
          </div>
        </div>
      </Collapse>{' '}
      <Collapse edit={() => {}} title="Instructions Title Click Arrow At Right To Expand Instructions">
        <div className="card">
          <div className="ibox-content">
            <p>
              Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
              consequat massa quis enim.
            </p>
            <p>
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet
              a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
              Vivamus elementum semper nisi.
            </p>
          </div>
        </div>
      </Collapse>
    </Fragment>
  ));
// .add('Working group', () => {
//   const [selected, setSelected] = useState('val1');

//   const handleChange = (event: any) => {
//     setSelected(event.target.value);
//   };

//   return (
//     <div className="form-group row">
//       <label className="col-sm-1 col-form-label font-bold">Type</label>
//       <div className="col-sm-5">
//         <Checkbox name="example" value="val1" currentSelection={selected} onChange={handleChange}>
//           Selected Item
//         </Checkbox>
//         <Checkbox name="example" value="val2" currentSelection={selected} onChange={handleChange}>
//           Another Item
//         </Checkbox>
//         <Checkbox name="example" value="val3" currentSelection={selected} onChange={handleChange}>
//           Item 3
//         </Checkbox>
//       </div>
//     </div>
//   );
// });
