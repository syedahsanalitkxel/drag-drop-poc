import React, { useState } from 'react';

import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import { Input, Label } from 'reactstrap';

interface Props {
  index?: number;
  formikprops: FormikBag;
  children?: React.ReactNode;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, index: any) => void;
}

const ReminderCard: React.FunctionComponent<Props> = ({ index, formikprops, handleChange }) => {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name);
    handleChange(event, index);
    // setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  function getReminderField(key: string) {
    if (index !== undefined) {
      return `reminders[${index}].${key}`;
    }
    return key;
  }

  function formatDate(values: any) {
    if (index !== undefined) {
      const d = new Date(values[index].reminderDate);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [year, month, day].join('-');
    }
  }

  function emailValue(values: any) {
    if (index !== undefined) {
      return values[index].emailTemplateId.toString();
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-6">
          <Label className="font-bold">Email Template</Label>
          <Input
            type="select"
            name={getReminderField('emailTemplateId')}
            id={getReminderField('emailTemplateId')}
            onChange={changeHandler}
            value={emailValue(formikprops.values)}
          >
            <option value="">All</option>
            <option value="1">Higer Education</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Input>
        </div>
        <div className="col-sm-6">
          <Label className="font-bold">Date</Label>
          <Input
            type="date"
            name={getReminderField('reminderDate')}
            id={getReminderField('reminderDate')}
            onChange={changeHandler}
            defaultValue={formatDate(formikprops.values)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

ReminderCard.defaultProps = {
  index: undefined,
};

export default ReminderCard;
