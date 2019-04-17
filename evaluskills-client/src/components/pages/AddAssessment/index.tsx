import React, { Fragment, useContext, useEffect, useState } from 'react';

import { ErrorMessage, Field, Formik } from 'formik';
import { FormFeedback, Input } from 'reactstrap';

import ErrorContext from '../../../context/ErrorContext';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
import Checkbox from '../../atoms/CheckBox';
import RadioButton from '../../atoms/RadioButton';
import Assessmentelement from '../../organisms/AssesmentElement';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { Initalvalues, initialState } from './InitialState';
import { AddAssessmentSchema } from './validationSchema';

import { styles } from './style';
import { AddAssessmentItemInterface } from '../../../interfaces/AssessmentItem';

interface PropsInterface {
  assessmenListItems: () => void;
  addAssessment: (value: AddAssessmentItemInterface, buttonType?: string) => void;
  changeListener?: (formValues: any) => void;
  edit?: boolean;
  copy?: boolean;
  assessmenData: AddAssessmentItemInterface;
}

const AddAssessment: React.FunctionComponent<PropsInterface> = ({
  assessmenListItems,
  addAssessment,
  changeListener,
  assessmenData,
  edit,
  copy,
}) => {
  console.log(assessmenData);
  const [formState, setFormState] = useState(initialState);
  const [submit, setSubmit] = useState();
  const [forvalues, setFormvalues] = useState(assessmenData);
  const errorContext = useContext(ErrorContext);
  useEffect(() => {
    if (edit) {
      // setFormvalues(assessmenData);
      setFormvalues({ ...forvalues, componenetName: 'Edit Assessment Items ' });
      //setFormvalues({ ...forvalues, assessmenListItems });
    }
  }, []);
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormvalues({ ...forvalues, [event.target.name]: parseInt(event.target.value, 10) });
  }
  function versionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let check = forvalues && forvalues.saveAsNewVersion;
    setFormvalues({ ...forvalues, saveAsNewVersion: !check });
  }
  function assessmentTypeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.target.value, 10) === 1) {
      const list: any = forvalues.itemElements;
      if (list.length === 0) {
        const clonedArray = JSON.parse(JSON.stringify(formState.elementObject));
        clonedArray.title = 'default';
        list.push(clonedArray);
        setFormvalues({ ...forvalues, itemElements: list });
      }
    }
    setFormvalues({ ...forvalues, [event.target.name]: parseInt(event.target.value, 10) });
  }
  function fathchangehandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === 'true') {
      setFormvalues({ ...forvalues, [event.target.name]: true });
    } else {
      setFormvalues({ ...forvalues, [event.target.name]: false });
    }
  }
  function elementChange(pro: any) {}
  function checkboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(event.target.value, 10);
    let arr = forvalues.itemRecomendedApplications;
    let check = arr.includes(number);

    if (check) {
      var index = arr.indexOf(number);
      arr.splice(index, 1);
    } else {
      arr.push(number);
    }

    setFormvalues({
      ...forvalues,
      itemRecomendedApplications: arr,
    });
  }
  function entitycheckboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const number = parseInt(event.target.value, 10);
    let arr = forvalues.itemEntities;
    let check = arr.includes(number);

    if (check) {
      var index = arr.indexOf(number);
      arr.splice(index, 1);
    } else {
      arr.push(number);
    }

    setFormvalues({
      ...forvalues,
      itemEntities: arr,
    });
  }
  function onelementhandleChange(event: any, key: number, itemOption: number, objectname: string) {
    let list = forvalues.itemElements;
    if (objectname === 'statement') {
      list[key].itemElementOptions[itemOption].statement = event.target.value;
    } else if (objectname === 'behaviour') {
      list[key].itemElementOptions[itemOption].behaviour = event.target.value;
    } else if (objectname === 'scaling') {
      list[key].itemElementOptions[itemOption].scaling = event.target.value;
    }
    setFormvalues({ ...forvalues, itemElements: list });
  }
  function addElement() {
    const list: any = forvalues.itemElements;

    const clonedArray = JSON.parse(JSON.stringify(formState.elementObject));
    list.push(clonedArray);
    setFormvalues({ ...forvalues, itemElements: list });
    setFormState({ ...formState, countAssetelement: formState.countAssetelement + 1 });
  }

  const getChecked = (forvalues: any, key: string) => {
    if (forvalues) {
      if (forvalues[key] === undefined) {
        return undefined;
      } else if (typeof forvalues[key] === 'boolean') {
        return forvalues[key].toString();
      }
    }
    return undefined;
  };

  const renderForm = (formikprops: any) => {
    const renderElementList = (contact: any, index: number) => (
      <Fragment key={index}>
        <Assessmentelement
          comNumber={index}
          tag={Field}
          key={index}
          formikprops={formikprops}
          onChange={onelementhandleChange}
        />
      </Fragment>
    );
    return (
      <form onSubmit={formikprops.handleSubmit} className={'form'}>
        <div className="row">
          <div className="col-lg-12">
            <div className="PageHeader">
              <div className="row">
                <div className="col-lg-5 col-md-5">
                  <h2 className="font-weight-light">{forvalues.componenetName}</h2>
                </div>
              </div>
            </div>
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="ibox">
                <div className="ibox-content">
                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label font-bold">definition</label>
                    <div className="col-md-12">
                      <Input
                        type="text"
                        name="definition"
                        className="form-control"
                        tag={Field}
                        id={'definition'}
                        invalid={!!(formikprops.touched.definition && formikprops.errors.definition)}
                      />
                      <FormFeedback tooltip={true}>{formikprops.errors.definition}</FormFeedback>
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Category</label>
                    <div className="col-sm-10">
                      <div className="form-group row">
                        <div className="col-sm-10">
                          <LookupContextConsumer>{renderAssessmentCategory}</LookupContextConsumer>
                          <ErrorMessage
                            name={`categoryId`}
                            render={msg => (
                              <div className="isa_error">
                                <span className="error text-danger">{msg}</span>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Type</label>

                    <div className="col-sm-10">
                      <LookupContextConsumer>{rendertypeId}</LookupContextConsumer>

                      <ErrorMessage
                        name={`typeId`}
                        render={msg => (
                          <div className="isa_error">
                            <span className="error text-danger">{msg}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  {forvalues && forvalues.typeId && forvalues.typeId === 1 ? (
                    <Fragment>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-bold">Competency</label>
                        <div className="col-sm-10">
                          <div className="col-md-6">
                            <Input type="select" name="competencyId" id="competency-select" onChange={changeHandler}>
                              <option value={''}>Add Competency</option>
                              <LookupContextConsumer>{rendercompetencyDropdown}</LookupContextConsumer>
                            </Input>
                            <ErrorMessage
                              name={`competencyId`}
                              render={msg => (
                                <div className="isa_error">
                                  <span className="error text-danger">Please select Compitency</span>
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="hr-line-dashed" />
                    </Fragment>
                  ) : null}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Faith Based</label>
                    <div className="col-sm-10">
                      <RadioButton
                        name="isFaithBased"
                        value="true"
                        currentSelection={getChecked(forvalues, 'isFaithBased')}
                        onChange={fathchangehandler}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="isFaithBased"
                        value="false"
                        currentSelection={getChecked(forvalues, 'isFaithBased')}
                        onChange={fathchangehandler}
                      >
                        No
                      </RadioButton>
                      <ErrorMessage
                        name={`isFaithBased`}
                        render={msg => (
                          <div className="isa_error">
                            <span className="error text-danger">{msg}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Recomended Application</label>

                    <div className="col-sm-10">
                      <LookupContextConsumer>{recommendedApplicationsLookUp}</LookupContextConsumer>
                      <ErrorMessage
                        name={`itemRecomendedApplications`}
                        render={msg => (
                          <div className="isa_error">
                            <span className="error text-danger">{msg}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Entity</label>
                    <div className="col-sm-10">
                      <LookupContextConsumer>{itemEntitiesLookUp}</LookupContextConsumer>
                      <ErrorMessage
                        name={`itemEntities`}
                        render={msg => (
                          <div className="isa_error">
                            <span className="error text-danger">{msg}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Accerditation and Usage</label>
                    <div className="col-sm-10">
                      <RadioButton
                        name="accreditationAlignment"
                        value="true"
                        currentSelection={getChecked(forvalues, 'accreditationAlignment')}
                        onChange={fathchangehandler}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="accreditationAlignment"
                        value="false"
                        currentSelection={getChecked(forvalues, 'accreditationAlignment')}
                        onChange={fathchangehandler}
                      >
                        No
                      </RadioButton>
                      <ErrorMessage
                        name={`accreditationAlignment`}
                        render={msg => (
                          <div className="isa_error">
                            <span className="error text-danger">{msg}</span>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="hr-line-dashed" />

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Question Type Id </label>
                    <div className="col-sm-10 d-flex align-items-center">
                      <RadioButton
                        name="questionTypeId"
                        value={1}
                        currentSelection={forvalues && forvalues.questionTypeId}
                        onChange={assessmentTypeHandler}
                      >
                        Rubric
                      </RadioButton>
                      <RadioButton
                        name="questionTypeId"
                        value={2}
                        currentSelection={forvalues && forvalues.questionTypeId}
                        onChange={assessmentTypeHandler}
                      >
                        Open Ended
                      </RadioButton>
                    </div>
                  </div>

                  {forvalues &&
                    forvalues.questionTypeId === 1 &&
                    forvalues.itemElements &&
                    forvalues.itemElements.map(renderElementList)}
                </div>
              </div>
              {forvalues && forvalues.typeId === 3 && forvalues.questionTypeId === 1 ? (
                <div className="">
                  <button
                    type="button"
                    id="helper"
                    onClick={addElement}
                    data-toggle="tooltip"
                    className="btn btn-outline btn-primary showmore"
                  >
                    Add More Elements
                  </button>
                </div>
              ) : null}
              <div className="m-t-15 m-b-15 button-wrapper">
                {edit ? (
                  <div className="form-group row">
                    <div className="col-sm-5 d-flex align-items-center">
                      <Checkbox
                        name="saveAsNewVersion"
                        value="saveAsNewVersion"
                        isChecked={forvalues && forvalues.saveAsNewVersion}
                        onChange={versionHandler}
                      >
                        Save As New Version
                      </Checkbox>
                    </div>
                  </div>
                ) : null}
                <div className="hr-line-dashed" />
                <button
                  type="button"
                  onClick={() => {
                    OnCancelClick();
                  }}
                  style={styles.btn}
                  className="btn btn-default btn-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.btn}
                  id={'submit'}
                  name="submit"
                  onClick={() => {
                    setSubmit('a');
                    //formikprops.submitForm();
                  }}
                  className="btn btn-primary btn-lg"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmit('b');
                    formikprops.submitForm();
                  }}
                  style={styles.btn}
                  className="btn btn-primary btn-lg"
                >
                  Save and publish
                </button>
                {edit ? null : (
                  <button
                    type="button"
                    onClick={() => {
                      setSubmit('c');
                      formikprops.submitForm();
                    }}
                    style={styles.btn}
                    className="btn btn-primary btn-lg"
                  >
                    Save and Add More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const renderAssessmentCategory = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.categoriesLookUp).map((lookup: LookupItemInterface) => (
        <RadioButton
          name="categoryId"
          value={lookup.value}
          currentSelection={forvalues && forvalues.categoryId}
          onChange={changeHandler}
        >
          {lookup.text}
        </RadioButton>
      ));
    }
  };
  const rendercompetencyDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.competenciesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  const rendertypeId = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.assessmentTypesLookUp).map((lookup: LookupItemInterface) => (
        <RadioButton
          name="typeId"
          value={lookup.value}
          currentSelection={forvalues && forvalues.typeId}
          onChange={changeHandler}
        >
          {lookup.text}
        </RadioButton>
      ));
    }
  };
  const recommendedApplicationsLookUp = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map((lookup: LookupItemInterface, index) => (
        <Checkbox
          name="itemRecomendedApplications"
          value={lookup.value}
          isChecked={
            lookup.value && forvalues && forvalues.itemRecomendedApplications.includes(lookup.value) ? true : false
          }
          onChange={checkboxChangeHandler}
        >
          {lookup.text}
        </Checkbox>
      ));
    }
  };
  const itemEntitiesLookUp = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.entitiesLookUp).map((lookup: LookupItemInterface, index) => (
        <Checkbox
          name="itemEntities"
          value={lookup.value}
          isChecked={lookup.value && forvalues && forvalues.itemEntities.includes(lookup.value) ? true : false}
          onChange={entitycheckboxChangeHandler}
        >
          {lookup.text}
        </Checkbox>
      ));
    }
  };
  function OnCancelClick() {
    addAssessment(Initalvalues, 'd');
  }
  function submitForm(values: any) {
    if (submit === 'a') {
      // ...
      addAssessment(values, 'a');
    }

    if (submit === 'b') {
      // ...
      addAssessment(values, 'b');
    }
    if (submit === 'c') {
      // ...
      addAssessment(values, 'c');
    }
    if (submit === 'd') {
      // ...
      addAssessment(values, 'c');
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={forvalues}
      validationSchema={AddAssessmentSchema}
      onSubmit={submitForm}
    >
      {formikprops => renderForm(formikprops)}
    </Formik>
  );
};
AddAssessment.defaultProps = {
  copy: false,
};
export default AddAssessment;
