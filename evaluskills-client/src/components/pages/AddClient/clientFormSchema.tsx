import * as Yup from 'yup';
import { numberValidation, stringValidation } from '../../../utils/validations';

const clientFormSchema = Yup.object().shape({
  address1: stringValidation(2, 250, true),
  city: stringValidation(1, 250, true),
  clientContacts: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Required'),
      firstName: stringValidation(1, 250, true),
      lastName: stringValidation(1, 250, true),
      phone: stringValidation(1, 250, true),
      title: stringValidation(1, 250, true),
    })
  ),
  clientName: stringValidation(1, 250, true),
  clientTypeId: numberValidation(1, 1, true),
  clientUser: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Required'),
    firstName: stringValidation(1, 250, true),
    lastName: stringValidation(1, 250, true),
  }),
  stateId: numberValidation(1, 1, true),
  subsidiary: stringValidation(2, 250, true),
  zip: stringValidation(2, 50, true),
});

export default clientFormSchema;
