import * as Yup from 'yup';
import { stringValidation } from '../../../utils/validations';

const emailFormSchema = Yup.object().shape({
  title: stringValidation(2, 250, true),
  subject: stringValidation(2, 250, true),
  emailTypeId: stringValidation(1, 250, true),
});

export default emailFormSchema;
