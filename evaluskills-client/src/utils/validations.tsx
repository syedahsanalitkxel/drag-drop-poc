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

export const emailValidation = (required?: boolean) => {
  if (required) {
    Yup.string()
      .email('Invalid email')
      .required('Required');
  }
  return Yup.string().email('Invalid email');
};
