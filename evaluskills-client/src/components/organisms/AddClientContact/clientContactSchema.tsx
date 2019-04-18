import * as Yup from 'yup';
import { alphabetsValidation, emailValidation, stringValidation } from '../../../utils/validations';

const clientContactSchema = Yup.object().shape({
  email: emailValidation(true),
  firstName: alphabetsValidation(2, 250, true),
  lastName: alphabetsValidation(2, 250, true),
  title: stringValidation(1, 250, true),
});

export default clientContactSchema;
