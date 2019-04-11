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

export const numberValidation = (min?: number, max?: number, required?: boolean) => {
  if (required) {
    return Yup.number()
      .min(min || 1, 'Too Short!')
      .min(max || 1, 'Too Short!')
      .required('Required Field');
  }
  return Yup.number().min(min || 1, 'Too Short!');
};
export const emailValidation = (required?: boolean) => {
  if (required) {
    Yup.string()
      .email('Invalid email')
      .required('Required');
  }
  return Yup.string().email('Invalid email');
};
