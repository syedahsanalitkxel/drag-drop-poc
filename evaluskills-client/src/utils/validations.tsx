import * as Yup from 'yup';

export const stringValidation = (min?: number, max?: number, required?: boolean) => {
  if (required) {
    return Yup.string()
      .min(min || 0, 'Too Short!')
      .max(max || 100, 'Too Long!')
      .required('Required Field');
  }
  return Yup.string()
    .min(min || 0, 'Too Short!')
    .max(max || 100, 'Too Long!');
};

export const alphabetsValidation = (min?: number, max?: number, required?: boolean) => {
  if (required) {
    return Yup.string()
      .min(min || 0, 'Too Short!')
      .max(max || 100, 'Too Long!')
      .matches(/^[a-zA-Z ]+$/, 'Name Must be in Alphabets')
      .required('Required Field');
  }
  return Yup.string()
    .min(min || 0, 'Too Short!')
    .max(max || 100, 'Too Long!')
    .matches(/^[a-zA-Z ]+$/, 'Name Must be in Alphabets');
};

export const numberValidation = (min?: number, max?: number, required?: boolean) => {
  if (required) {
    return Yup.number()
      .min(min || 1, 'Too Short!')
      .min(max || 1, 'Too Short!')
      .required('Required Field');
  }
  return Yup.number().min(min || 1, 'Too Short!');
};
export const imageValidation = () => {
  return Yup.mixed().required('image required');
};
export const bodyValidation = () => {
  return Yup.string().required('Required Field');
};
export const emailValidation = (required?: boolean) => {
  if (required) {
    Yup.string()
      .email('Invalid email')
      .required('Required');
  }
  return Yup.string().email('Invalid email');
};
