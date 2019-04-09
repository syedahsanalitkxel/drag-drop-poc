import * as Yup from 'yup';
import { stringValidation } from '../../../utils/validations';

const evaluationFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  billing: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  date: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  minEvaluator: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  participantEmail: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  clientType: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  emailTemplate1: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  emailTemplate2: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  emailTemplate3: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  newParticipant: Yup.array().of(
    Yup.object().shape({
      paticipant: Yup.object().shape({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email')
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        role: Yup.string()
          .email('Invalid email')
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
      }),
      evaluator: Yup.array().of(
        Yup.object().shape({
          firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          role: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        })
      ),
    })
  ),
});

export default evaluationFormSchema;
