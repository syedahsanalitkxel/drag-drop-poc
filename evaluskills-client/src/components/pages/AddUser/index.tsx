import { Field, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Button, FormFeedback, Input, Modal, ModalFooter, ModalHeader } from 'reactstrap';
import * as Yup from 'yup';
import { styles } from './style';
import PageBody from '../../atoms/PageBody';
import styled from 'styled-components';
import FormikBag from '../../../interfaces/FormikBag';
import { lookups } from '../../../modules/Lookup/enum';
import LookupContext, { LookupContextConsumer } from '../../../modules/Lookup/context';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
// import Select from 'react-select';

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

export const AddUser: React.FunctionComponent<ModalProps> = ({
  visible,
  toggle,
  name,
  FormValues,
  submitHandler,
  cancelHandler,
  clientLookup,
}) => {
  const { findKey } = useContext(LookupContext);
  const [disabled, setDisabled] = useState(false);
  // const [selectOption, setSelectOption] = useState(FormValues.clients || []);

  function submitForm(values: any) {
    // values.clients = selectOption;
    submitHandler(values);
  }

  function cancelForm() {
    cancelHandler();
    // setSelectOption([]);
  }

  const addUserSchema = Yup.object().shape({
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
    role: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  function renderUserRoleDropdown() {
    if (findKey) {
      return findKey(lookups.userRolesLookUp).map(application => {
        return (
          <option value={application.text} key={application.value}>
            {application.text}
          </option>
        );
      });
    }
  }

  // function renderClientTypeDropdown() {
  //   const options: any = [];
  //   clientLookup.map( (application: any)  => {
  //     options.push({ value: application.value, label: application.text})
  //   });
  //   if (options.length > 0) {
  //     return (
  //         <Select
  //             value={selectOption}
  //             onChange={handleChange}
  //             options={options}
  //             isMulti={true}
  //         />
  //     );
  //   }
  // }

  // const handleChange = (selectedOption: any) => {
  //   setSelectOption( selectedOption );
  //   console.log(`Option selected:`, selectedOption);
  // };

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
                {name === 'Edit' ? (
                  <Input
                    type="text"
                    name="email"
                    className="form-control"
                    disabled={true}
                    placeholder="Email"
                    tag={Field}
                    invalid={!!(formikprops.touched.email && formikprops.errors.email)}
                  />
                ) : (
                  <Input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    tag={Field}
                    invalid={!!(formikprops.touched.email && formikprops.errors.email)}
                  />
                )}

                <FormFeedback tooltip={true}>{formikprops.errors.email}</FormFeedback>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="col-sm-10">
                <FormElement
                  label="Role"
                  name="role"
                  formikprops={formikprops}
                  type={FormElementTypes.SELECT}
                  inline={true}
                  last={true}
                >
                  <option value=""> Select One</option>
                  {renderUserRoleDropdown()}
                </FormElement>
              </div>
            </div>
          </div>
          {/*{*/}
          {/*clientLookup.length > 0 && (*/}
          {/*<React.Fragment>*/}
          {/*<div className="hr-line-dashed" />*/}
          {/*<div className="form-group row">*/}
          {/*<div className="col-sm-6">*/}
          {/*<label className="col-sm-10 col-form-label font-bold">Clients</label>*/}
          {/*<div className="col-sm-10">*/}
          {/*{renderClientTypeDropdown()}*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</React.Fragment>*/}
          {/*)*/}
          {/*}*/}
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
      <ModalHeader toggle={toggle}>{name} User</ModalHeader>
      <Formik
        enableReinitialize={true}
        initialValues={FormValues}
        validationSchema={addUserSchema}
        onSubmit={submitForm}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </Modal>
  );
};

AddUser.defaultProps = {
  visible: false,
};

export default AddUser;
