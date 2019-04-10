import * as Yup from 'yup';
let i = 1;
export const AddAssessmentSchema = Yup.object().shape({
  definiation: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  fathSelected: Yup.string()
    .min(1, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  categorySelected: Yup.string()
    .min(1, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  usage: Yup.string()
    .min(1, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  itemElements: Yup.array().of(
    Yup.object().shape({
      itemElementOptions: Yup.array().of(
        Yup.object().shape({
          statement: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          behaviur: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          scaling: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        })
      ),
    })
  ),
});
