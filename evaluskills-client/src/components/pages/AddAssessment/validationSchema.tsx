import * as Yup from 'yup';
let i = 1;
export const AddAssessmentSchema = Yup.object().shape({
  definiation: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),

  // excstatement: Yup.string()
  // 	.min(2, "Too Short!")
  // 	.max(50, "Too Long!")
  // 	.required("Required"),
  excbehaviour: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  excscaling: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  comstatement: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  combehavior: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  comscaling: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  marstatement: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  marbehaviour: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  marscaling: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  unstatement: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  unbehaviour: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  unscaling: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  categorySelected: Yup.string()
    .min(1, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),

  expstatement: Yup.array().of(
    Yup.object().shape({
      statement: Yup.string().required('Required'),
    })
  ),
  expBehaviour: Yup.array().of(
    Yup.object().shape({
      behaviour: Yup.string().required('Required'),
    })
  ),
  excstatement: Yup.array().of(
    Yup.object().shape({
      statement: Yup.string().required('Required'),
    })
  ),
  itemsElements: Yup.array().of(
    Yup.object().shape({
      statement: Yup.string().required('Required'),
      behaviur: Yup.string().required('Required'),
      scaling: Yup.string().required('Required'),
    })
  ),

  lists: Yup.object().shape({
    0: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    1: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    2: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    3: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    4: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    5: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    6: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    7: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    8: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
    9: Yup.array().of(
      Yup.object().shape({
        statement: Yup.string().required('Required'),
        behaviur: Yup.string().required('Required'),
        scaling: Yup.string().required('Required'),
      })
    ),
  }),
});
