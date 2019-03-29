import {
  FormikActions,
  FormikComputedProps,
  FormikHandlers,
  FormikRegistration,
  FormikSharedConfig,
  FormikState,
  FormikValues,
} from 'formik';

export default interface FormikBag
  extends FormikRegistration,
    FormikHandlers,
    FormikSharedConfig,
    FormikState<FormikValues>,
    FormikComputedProps<FormikValues>,
    FormikActions<FormikValues> {}
