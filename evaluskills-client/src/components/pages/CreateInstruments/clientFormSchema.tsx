import * as Yup from 'yup';

const evaluationFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  dueDate: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  sendInstrument: Yup.string().required('Required'),
  allowParticipantsToAddEvaluators: Yup.string().required('Required'),
  date1: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  date2: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  date3: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  emailTemplate1: Yup.string().required('Required'),
  emailTemplate2: Yup.string().required('Required'),
  emailTemplate3: Yup.string().required('Required'),
  participants: Yup.array().of(
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
      roleId: Yup.string().required('Required'),
      evaluators: Yup.array().of(
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
          roleId: Yup.string().required('Required'),
        })
      ),
    })
  ),
});

export default evaluationFormSchema;
