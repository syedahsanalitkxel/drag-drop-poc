import { ErrorMessage, Field, Formik } from 'formik';
import React, { useContext } from 'react';
import { Button, FormFeedback, Input, Modal, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { styles } from '../AddUser/style';
import PageBody from '../../atoms/PageBody';
import styled from 'styled-components';
import FormikBag from '../../../interfaces/FormikBag';
import { lookups } from '../../../modules/Lookup/enum';
import LookupContext, { LookupContextConsumer } from '../../../modules/Lookup/context';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
interface ModalProps {
  visible?: boolean;
  toggle: () => void;
  submitHandler: (values: any) => void;
  name?: string;
  FormValues: any;
  cancelHandler: () => void;
  clientLookup?: any;
}

const StyledButton = styled(Button)`
  margin-left: 20px;
  margin-right: 5px;
`;

export const AddEvaluator: React.FunctionComponent<ModalProps> = ({
  visible,
  toggle,
  name,
  FormValues,
  submitHandler,
  cancelHandler,
}) => {
  const { findKey } = useContext(LookupContext);
  function submitForm(values: any) {
    submitHandler(values);
  }
  function cancelForm() {
    cancelHandler();
  }
  const addEvaluatorSchema = Yup.object().shape({
    email: Yup.string()
      .required()
      .email(),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[a-zA-Z ]+$/, 'Name Must be in Alphabets')
      .required('Required Field'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[a-zA-Z ]+$/, 'Name Must be in Alphabets')
      .required('Required Field'),
    roleId: Yup.string().required('Required'),
  });

  function renderEvaluatorRoleDropdown() {
    if (findKey) {
      return findKey(lookups.evaluationRolesLookUp).map(application => {
        return (
          <option value={application.value} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  const renderForm = (formikprops: FormikBag) => (
    <form onSubmit={formikprops.handleSubmit} className={'form'}>
      <div className=" ">
        <div className="no-borders">
          <div className="form-group row">
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">First Name</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  tag={Field}
                  invalid={!!(formikprops.touched.firstName && formikprops.errors.firstName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.firstName}</FormFeedback>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">Last Name</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  tag={Field}
                  invalid={!!(formikprops.touched.lastName && formikprops.errors.lastName)}
                />

                <FormFeedback tooltip={true}>{formikprops.errors.lastName}</FormFeedback>
              </div>
            </div>
          </div>
          <div className="hr-line-dashed" />
          <div className="form-group row">
            <div className="col-sm-6">
              <label className="col-sm-10 col-form-label font-bold">Email</label>
              <div className="col-sm-10">
                <Input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  tag={Field}
                  invalid={!!(formikprops.touched.email && formikprops.errors.email)}
                />
                <FormFeedback tooltip={true}>{formikprops.errors.email}</FormFeedback>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="col-sm-10 m-t-7">
                <FormElement
                  label="Role"
                  name="roleId"
                  formikprops={formikprops}
                  type={FormElementTypes.SELECT}
                  inline={true}
                  last={true}
                >
                  <option value=""> Select One</option>
                  {renderEvaluatorRoleDropdown()}
                </FormElement>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageBody>
        <div className="row m-b-25">
          <StyledButton type="button" size="lg" onClick={cancelForm}>
            Cancel
          </StyledButton>
          <StyledButton type="submit" color="primary" size="lg">
            Save
          </StyledButton>
        </div>
      </PageBody>
    </form>
  );

  return (
    <Modal isOpen={visible} toggle={toggle} style={styles.modal_width}>
      <ModalHeader toggle={toggle}>{name} Evaluator</ModalHeader>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        validationSchema={addEvaluatorSchema}
        onSubmit={submitForm}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </Modal>
  );
};

AddEvaluator.defaultProps = {
  visible: false,
};

export default AddEvaluator;
