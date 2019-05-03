import * as Yup from 'yup';
import { bodyValidation, stringValidation } from '../../../utils/validations';

const emailFormSchema = Yup.object().shape({
  title: stringValidation(2, 250, true),
  subject: stringValidation(2, 250, true),
  emailTypeId: stringValidation(1, 250, true),
  body: bodyValidation(),
});

export default emailFormSchema;
