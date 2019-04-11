import * as Yup from 'yup';
import { numberValidation, stringValidation } from '../../../utils/validations';

const clientFormSchema = Yup.object().shape({
  address1: stringValidation(2, 250, true),
  billingPlanId: numberValidation(2, true),
  city: stringValidation(1, 250, true),
  clientContact: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Required'),
    firstName: stringValidation(1, 250, true),
    lastName: stringValidation(1, 250, true),
    phone: stringValidation(1, 250, true),
    title: stringValidation(1, 250, true),
  }),
  clientInformation: stringValidation(2, 250, true),
  clientName: stringValidation(1, 250, true),
  clientTypeId: numberValidation(1, true),
  clientUser: Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Required'),
    firstName: stringValidation(1, 250, true),
    lastName: stringValidation(1, 250, true),
  }),
  phone: stringValidation(2, 50, true),
  stateId: numberValidation(2, true),
  subsidiary: stringValidation(2, 250, true),
  zip: stringValidation(2, 50, true),
});

export default clientFormSchema;
