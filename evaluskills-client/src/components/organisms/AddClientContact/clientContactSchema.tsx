import * as Yup from 'yup';
import { emailValidation, stringValidation } from '../../../utils/validations';

const clientContactSchema = Yup.object().shape({
  email: emailValidation(true),
  firstName: stringValidation(2, 250, true),
  lastName: stringValidation(2, 250, true),
  title: stringValidation(1, 250, true),
});

export default clientContactSchema;
