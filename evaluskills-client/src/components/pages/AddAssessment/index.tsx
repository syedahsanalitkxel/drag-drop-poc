import { Field, Formik } from 'formik';
import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import { FormFeedback, Input, Label } from 'reactstrap';
import Checkbox from '../../atoms/CheckBox';
import Assessmentelement from '../../organisms/AssesmentElement';
import RadioButton from '../../atoms/RadioButton';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { AddAssessmentSchema } from './validationSchema';
import { styles } from './style';
import { initialState } from './InitianalState';
const AddAssessment: React.FunctionComponent<any> = ({ changeListener, edit }) => {
  const [formState, setFormState] = useState(initialState);
  useEffect(() => {
    if (Object.getOwnPropertyNames(formState.lists).length === 0) {
      const list: any = formState.lists;
      list[0] = JSON.parse(JSON.stringify(formState.itemsElements));
      setFormState({ ...formState, lists: list });
    }
    if (edit) {
      setFormState({ ...formState, componenetName: 'Edit Assessment Items ' });
    }
  });
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }
  function elementChange(pro: any) {}
  function checkboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'recommendAppHigher') {
      setFormState({ ...formState, recommendAppHigher: !formState.recommendAppHigher });
    } else {
      setFormState({ ...formState, recommendAppCorporate: !formState.recommendAppCorporate });
    }
  }
  function entitycheckboxChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const entities = formState.entityCheck;
    if (event.target.name === 'All') {
      setFormState({ ...formState, entityCheckedAll: !formState.entityCheckedAll });
    } else {
      entities.forEach((entity: any) => {
        if (entity.value === event.target.name) {
          if (entity.isChecked === true) {
            setFormState({ ...formState, entitySelect: formState.entitySelect - 1 });
          } else {
            setFormState({ ...formState, entitySelect: 1 });
          }
          entity.isChecked = !entity.isChecked;
        }
      });
      setFormState({ ...formState, entityCheck: entities });
    }
  }
  function addElement() {
    const length = Object.getOwnPropertyNames(formState.lists).length;
    const list: any = formState.lists;
    const clonedArray = JSON.parse(JSON.stringify(formState.itemsElements));
    list[length] = clonedArray;
    setFormState({ ...formState, lists: list });
    setFormState({ ...formState, countAssetelement: formState.countAssetelement + 1 });
  }
  const renderForm = (formikprops: any) => (
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
                      name="definiation"
                      className="form-control"
                      tag={Field}
                      invalid={
                        !!(formikprops.touched.definiation && formikprops.errors.definiation)
                      }
                    />
                    <FormFeedback tooltip={true}>{formikprops.errors.definiation}</FormFeedback>
                  </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">Category</label>
                  <div className="col-sm-10">
                    <div className="form-group row">
                      <div className="col-sm-10">
                        <RadioButton
                          name="categorySelected"
                          value="val1"
                          currentSelection={formState.categorySelected}
                          onChange={changeHandler}
                        >
                          None
                        </RadioButton>

                        <RadioButton
                          name="categorySelected"
                          value="val2"
                          currentSelection={formState.categorySelected}
                          onChange={changeHandler}
                        >
                          Character
                        </RadioButton>
                        <RadioButton
                          name="categorySelected"
                          value="val3"
                          currentSelection={formState.categorySelected}
                          onChange={changeHandler}
                        >
                          Skill
                        </RadioButton>
                        <RadioButton
                          name="categorySelected"
                          value="val4"
                          currentSelection={formState.categorySelected}
                          onChange={changeHandler}
                        >
                          Action
                        </RadioButton>
                        <div className="isa_error">
                          <span className="error text-danger">
                            {formState.categorySelected === '' ? 'Required' : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">Type</label>

                  <div className="col-sm-10">
                    <RadioButton
                      name="typeSelected"
                      value="comtval"
                      currentSelection={formState.typeSelected}
                      onChange={changeHandler}
                    >
                      Competency
                    </RadioButton>
                    <RadioButton
                      name="typeSelected"
                      value="Rationalval"
                      currentSelection={formState.typeSelected}
                      onChange={changeHandler}
                    >
                      Rational
                    </RadioButton>
                    <RadioButton
                      name="typeSelected"
                      value="influval"
                      currentSelection={formState.typeSelected}
                      onChange={changeHandler}
                    >
                      Influential
                    </RadioButton>
                    <div className="isa_error">
                      <span className="error text-danger">
                        {formState.typeSelected === '' ? 'Required' : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed" />
                {formState.typeSelected === 'comtval' ? (
                  <Fragment>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label font-bold">Competency</label>
                      <div className="col-sm-10">
                        <div className="col-md-6">
                          <Input
                            type="select"
                            name="competency"
                            id="competency-select"
                            onChange={changeHandler}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </Input>{' '}
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
                      name="fathSelected"
                      value="fathyes"
                      currentSelection={formState.fathSelected}
                      onChange={changeHandler}
                    >
                      Yes
                    </RadioButton>
                    <RadioButton
                      name="fathSelected"
                      value="fathNo"
                      currentSelection={formState.fathSelected}
                      onChange={changeHandler}
                    >
                      No
                    </RadioButton>
                    <div className="isa_error">
                      <span className="error text-danger">
                        {formState.fathSelected === '' ? 'Required' : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">
                    Recomended Application
                  </label>

                  <div className="col-sm-10">
                    <Checkbox
                      name="recommendAppHigher"
                      value="edval"
                      isChecked={formState.recommendAppHigher}
                      onChange={checkboxChangeHandler}
                    >
                      Higher Education
                    </Checkbox>
                    <Checkbox
                      name="recommendAppCorporate"
                      value="Corporateval"
                      isChecked={formState.recommendAppCorporate}
                      onChange={checkboxChangeHandler}
                    >
                      Corporate
                    </Checkbox>
                    {formState.recommendAppCorporate ? null : formState.recommendAppHigher ? null : (
                      <div className="isa_error">
                        <span className="error text-danger">
                          {formState.usage === '' ? 'Required' : null}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">Entity</label>
                  <div className="col-sm-10">
                    <Checkbox
                      name="All"
                      value={'allcheckbox'}
                      isChecked={formState.entityCheckedAll}
                      onChange={entitycheckboxChangeHandler}
                    >
                      All
                    </Checkbox>
                    <Checkbox
                      name="SHRM"
                      value={formState.entityCheck[0].value}
                      isChecked={formState.entityCheck[0].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      SHRM
                    </Checkbox>
                    <Checkbox
                      name="AACSB"
                      value={formState.entityCheck[1].value}
                      isChecked={formState.entityCheck[1].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      AACSB
                    </Checkbox>
                    <Checkbox
                      name="ACBSP"
                      value={formState.entityCheck[2].value}
                      isChecked={formState.entityCheck[2].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      ACBSP
                    </Checkbox>
                    <Checkbox
                      name="IACBE"
                      value={formState.entityCheck[3].value}
                      isChecked={formState.entityCheck[3].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      IACBE
                    </Checkbox>
                    <Checkbox
                      name="AMBA"
                      value={formState.entityCheck[4].value}
                      isChecked={formState.entityCheck[4].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      AMBA
                    </Checkbox>

                    <Checkbox
                      name="ACJS"
                      value={formState.entityCheck[5].value}
                      isChecked={formState.entityCheck[5].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      ACJS
                    </Checkbox>
                    <Checkbox
                      name="NASPAA"
                      value={formState.entityCheck[6].value}
                      isChecked={formState.entityCheck[6].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      NASPAA
                    </Checkbox>
                    <Checkbox
                      name="CAEP"
                      value={formState.entityCheck[7].value}
                      isChecked={formState.entityCheck[7].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      CAEP
                    </Checkbox>
                    <Checkbox
                      name="CAHME"
                      value={formState.entityCheck[8].value}
                      isChecked={formState.entityCheck[8].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      CAHME
                    </Checkbox>
                    <Checkbox
                      name="AUPHA"
                      value={formState.entityCheck[9].value}
                      isChecked={formState.entityCheck[9].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      AUPHA
                    </Checkbox>
                    <Checkbox
                      name="NACE"
                      value={formState.entityCheck[10].value}
                      isChecked={formState.entityCheck[10].isChecked}
                      onChange={entitycheckboxChangeHandler}
                    >
                      NACE
                    </Checkbox>
                    <div className="isa_error">
                      <span className="error text-danger">
                        {formState.entitySelect === 0 ? 'Required' : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">
                    Accerditation and Usage
                  </label>
                  <div className="col-sm-10">
                    <RadioButton
                      name="usage"
                      value="fathyes"
                      currentSelection={formState.usage}
                      onChange={changeHandler}
                    >
                      Yes
                    </RadioButton>
                    <RadioButton
                      name="usage"
                      value="fathNo"
                      currentSelection={formState.usage}
                      onChange={changeHandler}
                    >
                      No
                    </RadioButton>
                    <div className="isa_error">
                      <span className="error text-danger">
                        {formState.usage === '' ? 'Required' : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hr-line-dashed" />

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-bold">Assesment Type</label>
                  <div className="col-sm-10 d-flex align-items-center">
                    <RadioButton
                      name="assessmentType"
                      value="rubricval"
                      currentSelection={formState.assessmentType}
                      onChange={changeHandler}
                    >
                      Rubric
                    </RadioButton>
                    <RadioButton
                      name="assessmentType"
                      value="openval"
                      currentSelection={formState.assessmentType}
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
                <div className="hr-line-dashed" />
                {formState.assessmentType === 'rubricval' ? (
                  Object.getOwnPropertyNames(formState.lists).length > 0 ? (
                    <Fragment>
                      <Assessmentelement
                        formikprops={formikprops}
                        tag={Field}
                        key={0}
                        comNumber={0}
                        onChange={elementChange}
                      />
                      {formState.countAssetelement > 0 ? (
                        <Fragment>
                          {(function(count, handle) {
                            let arr = [];
                            for (var i = 0; i < count; i++) {
                              arr.push(
                                <Fragment>
                                  <div className="ibox showMore">
                                    {/* <div className="ibox-title">
                                      <h5>Add Elements - {i + 1}</h5>
                                      <div className="ibox-tools">
                                        <a className="hide-link">
                                          <i className="fa fa-times" />
                                        </a>
                                      </div>
                                    </div> */}
                                    <div className="hr-line-dashed" />
                                    <Assessmentelement
                                      formikprops={formikprops}
                                      comNumber={i + 1}
                                      tag={Field}
                                      key={i + 1}
                                      onChange={elementChange}
                                    />
                                  </div>
                                </Fragment>
                              );
                            }
                            return arr;
                          })(formState.countAssetelement, changeHandler)}
                        </Fragment>
                      ) : null}
                    </Fragment>
                  ) : null
                ) : null}
              </div>
            </div>
            {formState.typeSelected === 'influval' ? (
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
  return (
    <DashboardTemplate>
      <Formik
        enableReinitialize={true}
        initialValues={{
          lists: formState.lists,
        }}
        validationSchema={AddAssessmentSchema}
        onSubmit={() => {}}
      >
        {formikprops => renderForm(formikprops)}
      </Formik>
    </DashboardTemplate>
  );
};

export default AddAssessment;
