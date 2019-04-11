import { Field, Formik, ErrorMessage } from 'formik';
import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import Checkbox from '../../atoms/CheckBox';
import Assessmentelement from '../../organisms/AssesmentElement';
import RadioButton from '../../atoms/RadioButton';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { AddAssessmentSchema } from './validationSchema';
import { styles } from './style';
import { initialState, Initalvalues } from './InitialState';
import ErrorContext from '../../../context/ErrorContext';
import { LookupContextConsumer } from '../../../context/LookupContext';
import { lookups } from '../../../enums';
import { LookupContextInterface, LookupItemInterface } from '../../../interfaces/Lookup';
const AddAssessment: React.FunctionComponent<any> = ({
  assessmenListItems,
  addAssessment,
  changeListener,
  edit,
}) => {
  const [formState, setFormState] = useState(initialState);
  const [forvalues, setFormvalues] = useState(Initalvalues);
  const errorContext = useContext(ErrorContext);
  useEffect(() => {
    // if (formState.itemElements.length === 0) {
    //   const list: any = formState.itemElements;
    //   list.push(JSON.parse(JSON.stringify(formState.elementObject)));
    //   setFormState({ ...formState, itemElements: list });
    // }
    if (edit) {
      setFormState({ ...formState, componenetName: 'Edit Assessment Items ' });
    }
  }, []);
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
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

  function addElement() {
    const list: any = forvalues.itemElements;

    const clonedArray = JSON.parse(JSON.stringify(formState.elementObject));
    list.push(clonedArray);
    setFormvalues({ ...forvalues, itemElements: list });
    setFormState({ ...formState, countAssetelement: formState.countAssetelement + 1 });
  }
  const renderForm = (formikprops: any) => {
    const renderElementList = (contact: any, index: number) => (
      <Fragment key={index}>
        <Assessmentelement
          comNumber={index}
          tag={Field}
          key={index}
          onChange={elementChange}
          formikprops={formikprops}
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
                  <h2 className="font-weight-light">{formState.componenetName}</h2>
                </div>
              </div>
            </div>
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="ibox">
                <div className="ibox-content">
                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label font-bold">Defination</label>
                    <div className="col-md-12">
                      <Input
                        type="text"
                        name="definition"
                        className="form-control"
                        tag={Field}
                        id={'definition'}
                        invalid={
                          !!(formikprops.touched.definition && formikprops.errors.definition)
                        }
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
                  {forvalues.typeId === 1 ? (
                    <Fragment>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label font-bold">Competency</label>
                        <div className="col-sm-10">
                          <div className="col-md-6">
                            <Input
                              type="select"
                              name="competencyId"
                              id="competency-select"
                              onChange={changeHandler}
                            >
                              <LookupContextConsumer>
                                {rendercompetencyDropdown}
                              </LookupContextConsumer>
                            </Input>
                          </div>
                        </div>
                      </div>
                      <div className="hr-line-dashed" />
                    </Fragment>
                  ) : null}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Fath Based</label>
                    <div className="col-sm-10">
                      <RadioButton
                        name="isFaithBased"
                        value="true"
                        currentSelection={forvalues.isFaithBased === true ? 'true' : 'false'}
                        onChange={fathchangehandler}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="isFaithBased"
                        value="false"
                        currentSelection={forvalues.isFaithBased === true ? 'true' : 'false'}
                        onChange={fathchangehandler}
                      >
                        No
                      </RadioButton>
                      <ErrorMessage
                        name={`fathSelected`}
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
                    <label className="col-sm-2 col-form-label font-bold">
                      Recomended Application
                    </label>

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
                    <label className="col-sm-2 col-form-label font-bold">
                      Accerditation and Usage
                    </label>
                    <div className="col-sm-10">
                      <RadioButton
                        name="accreditationAlignment"
                        value="true"
                        currentSelection={
                          forvalues.accreditationAlignment === true ? 'true' : 'false'
                        }
                        onChange={fathchangehandler}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="accreditationAlignment"
                        value="false"
                        currentSelection={
                          forvalues.accreditationAlignment === true ? 'true' : 'false'
                        }
                        onChange={fathchangehandler}
                      >
                        No
                      </RadioButton>
                      <ErrorMessage
                        name={`usage`}
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
                    <label className="col-sm-2 col-form-label font-bold">Assesment Type</label>
                    <div className="col-sm-10 d-flex align-items-center">
                      <RadioButton
                        name="questionTypeId"
                        value={1}
                        currentSelection={forvalues.questionTypeId}
                        onChange={changeHandler}
                      >
                        Rubric
                      </RadioButton>
                      <RadioButton
                        name="questionTypeId"
                        value={2}
                        currentSelection={forvalues.questionTypeId}
                        onChange={changeHandler}
                      >
                        Open Ended
                      </RadioButton>
                    </div>
                  </div>
                  <div className="isa_error">
                    <span className="error text-danger">
                      {formState.assessmentType === '' ? 'Required' : null}
                    </span>
                  </div>

                  {formState.itemElements && forvalues.itemElements.map(renderElementList)}
                </div>
              </div>
              {forvalues.typeId === 3 ? (
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
                <button type="button" style={styles.btn} className="btn btn-default btn-lg">
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.btn}
                  id={'submit'}
                  name="submit"
                  className="btn btn-primary btn-lg"
                >
                  Save
                </button>
                <button type="button" style={styles.btn} className="btn btn-primary btn-lg">
                  Save As Draft
                </button>
                <button type="button" style={styles.btn} className="btn btn-primary btn-lg">
                  Save Add More
                </button>
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
          currentSelection={forvalues.categoryId}
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
          currentSelection={forvalues.typeId}
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
      return findKey(lookups.recommendedApplicationsLookUp).map(
        (lookup: LookupItemInterface, index) => (
          <Checkbox
            name="itemRecomendedApplications"
            value={lookup.value}
            isChecked={
              lookup.value && forvalues.itemRecomendedApplications.includes(lookup.value)
                ? true
                : false
            }
            onChange={checkboxChangeHandler}
          >
            {lookup.text}
          </Checkbox>
        )
      );
    }
  };
  const itemEntitiesLookUp = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.entitiesLookUp).map((lookup: LookupItemInterface, index) => (
        <Checkbox
          name="itemEntities"
          value={lookup.value}
          isChecked={lookup.value && forvalues.itemEntities.includes(lookup.value) ? true : false}
          onChange={entitycheckboxChangeHandler}
        >
          {lookup.text}
        </Checkbox>
      ));
    }
  };
  async function submitForm(values: any) {
    try {
      console.log(values);
      const data = await addAssessment(values);
      console.log(data);
      assessmenListItems();
    } catch (error) {
      errorContext.setError(error, true);
    }
    setFormState({ ...formState, ...values });
  }
  return (
    <DashboardTemplate>
      <Formik
        enableReinitialize={true}
        initialValues={forvalues}
        validationSchema={AddAssessmentSchema}
        onSubmit={submitForm}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddAssessment;
