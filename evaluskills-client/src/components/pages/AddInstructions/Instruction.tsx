import * as Yup from 'yup';
import { stringValidation } from '../../../utils/validations';

const instrcutionFormSchema = Yup.object().shape({
  instructionTitle: stringValidation(2, 250, true),
});

export default instrcutionFormSchema;
