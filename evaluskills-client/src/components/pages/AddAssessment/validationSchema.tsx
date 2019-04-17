import * as Yup from 'yup';
let i = 1;
export const AddAssessmentSchema = Yup.object().shape({
  categoryId: Yup.number().required('Required'),
  definition: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  itemEntities: Yup.array()
    .min(1)
    .required('required'),
  itemRecomendedApplications: Yup.array()
    .min(1)
    .required('required'),
  isFaithBased: Yup.boolean().required('Required'),
  accreditationAlignment: Yup.boolean().required('Required'),
  typeId: Yup.number().required('Required'),
  itemElements: Yup.array().of(
    Yup.object().shape({
      title: Yup.string()
        .min(2, 'Too Short!')
        .max(250, 'Too Long!')
        .required('Required'),
      itemElementOptions: Yup.array().of(
        Yup.object().shape({
          statement: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
          behaviour: Yup.string()
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
