import * as Yup from 'yup';
import { stringValidation } from '../../../utils/validations';

const clientFormSchema = Yup.object().shape({
  address: stringValidation(2, 250, true),
  billing: stringValidation(2, 250, true),
  city: stringValidation(1, 250, true),
  clientInformation: stringValidation(2, 250, true),
  clientName: stringValidation(1, 250, true),
  clientType: stringValidation(1, 250, true),
  phone: stringValidation(2, 50, true),
  school: stringValidation(2, 250, true),
  state: stringValidation(2, 250, true),
  userEmail: stringValidation(2, 50, true),
  userFirstName: stringValidation(2, 50, true),
  userLastName: stringValidation(2, 50, true),
  zip: stringValidation(2, 50, true),
});

export default clientFormSchema;
