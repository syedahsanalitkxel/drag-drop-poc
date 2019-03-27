import { Field, Formik } from 'formik';
import React, { Component, Fragment } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import * as Yup from 'yup';
import Checkbox from '../../atoms/CheckBox';
import RadioButton from '../../atoms/RadioButton';
import Assessmentelement from '../../organisms/AssesmentElement';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { styles } from '../AddAssessment/style';

interface State {
  countAssetelement: number;
  categorySelected: string;
  typeSelected: string;
  fathSelected: string;
  recommendAppHigher: boolean;
  recommendAppCorporate: boolean;
  entityCheck: any;
  entitySelect: number;
  entityCheckedAll: boolean;
  usage: string;
  assessmentType: string;
  competency: string;
  // itemsElement: any,
  itemsElements: any;
  lists: any;
  validateArray: any;
}
class EditAssessment extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      assessmentType: 'rubricval',
      categorySelected: '',
      competency: '',
      countAssetelement: 0,
      entityCheck: [
        { id: 1, value: 'SHRM', isChecked: false },
        { id: 2, value: 'AACSB', isChecked: false },
        { id: 3, value: 'ACBSP', isChecked: false },
        { id: 4, value: 'IACBE', isChecked: false },
        { id: 5, value: 'AMBA', isChecked: false },
        { id: 6, value: 'ACJS', isChecked: false },
        { id: 7, value: 'NASPAA', isChecked: false },
        { id: 8, value: 'CAEP', isChecked: false },
        { id: 9, value: 'CAHME', isChecked: false },
        { id: 10, value: 'AUPHA', isChecked: false },
        { id: 11, value: 'NACE', isChecked: false },
      ],
      entitySelect: 0,
      entityCheckedAll: false,
      fathSelected: '',
      itemsElements: [
        { statement: '', behaviur: '', scaling: '' },
        { statement: '', behaviur: '', scaling: '' },
        { statement: '', behaviur: '', scaling: '' },
        { statement: '', behaviur: '', scaling: '' },
        { statement: '', behaviur: '', scaling: '' },
      ],
      lists: {},
      recommendAppCorporate: false,
      recommendAppHigher: false,
      typeSelected: 'influval',
      usage: '',
      validateArray: {},
    };
    this.onClickassetelement = this.onClickassetelement.bind(this);
    this.catehandleChange = this.catehandleChange.bind(this);
    this.typehandleChange = this.typehandleChange.bind(this);
    this.fathhandleChange = this.fathhandleChange.bind(this);
    this.recommendhandleChange = this.recommendhandleChange.bind(this);
    this.entityhandleChange = this.entityhandleChange.bind(this);
    this.usagehandleChange = this.usagehandleChange.bind(this);
    this.assessmentehandleChange = this.assessmentehandleChange.bind(this);
    this.competencyhandleChange = this.competencyhandleChange.bind(this);
    this.onelementhandleChange = this.onelementhandleChange.bind(this);
    this.allEntityhandleChange = this.allEntityhandleChange.bind(this);
  }
  public onClickassetelement() {
    let length = Object.getOwnPropertyNames(this.state.lists).length;

    const list = this.state.lists;
    list[length] = this.state.itemsElements;
    this.setState({ lists: list });
    this.setState({ countAssetelement: this.state.countAssetelement + 1 });
  }
  public catehandleChange(event: any) {
    this.setState({ categorySelected: event.target.value });
  }
  public typehandleChange(event: any) {
    this.setState({ typeSelected: event.target.value });
  }
  public fathhandleChange(event: any) {
    this.setState({ fathSelected: event.target.value });
  }
  public recommendhandleChange(event: any) {
    if (event.target.name === 'Higheredu') {
      this.setState({ recommendAppHigher: !this.state.recommendAppHigher });
    } else {
      this.setState({ recommendAppCorporate: !this.state.recommendAppCorporate });
    }
  }
  public entityhandleChange(event: any) {
    let entities = this.state.entityCheck;
    entities.forEach((entity: any) => {
      if (entity.value === event.target.value) {
        if (entity.isChecked === true) {
          this.setState({ entitySelect: this.state.entitySelect - 1 });
        } else {
          this.setState({ entitySelect: this.state.entitySelect + 1 });
        }
        entity.isChecked = !entity.isChecked;
      }
    });
    this.setState({ entityCheck: entities });
  }
  public allEntityhandleChange(event: any) {
    let entities = this.state.entityCheck;
    if (this.state.entityCheckedAll === true) {
      entities.forEach((entity: any) => (entity.isChecked = false));
      this.setState({ entityCheckedAll: false });
      this.setState({ entitySelect: 0 });
    } else {
      entities.forEach((entity: any) => (entity.isChecked = true));
      this.setState({ entityCheckedAll: true });
      this.setState({ entitySelect: 11 });
    }

    this.setState({ entityCheck: entities });
  }
  public usagehandleChange(event: any) {
    this.setState({ usage: event.target.value });
  }
  public assessmentehandleChange(event: any) {
    this.setState({ assessmentType: event.target.value });
  }
  public competencyhandleChange(event: any) {
    this.setState({ competency: event.target.value });
  }
  public onelementhandleChange(event: any, key: number) {
    let list = this.state.lists;
    list[key][0].statement = event.target.value;
    //	list[key] = this.state.itemsElements
  }
  public componentWillMount() {
    if (Object.getOwnPropertyNames(this.state.lists).length === 0) {
      const list = this.state.lists;
      list[0] = this.state.itemsElements;
      this.setState({ lists: list });

      // Object.values(list2[0][0]).
      // this.setState({lists:list})
      //console.log('list ' + this.state.lists[0][0].statement);
    }
  }
  public render() {
    ///validation schema which wapply on element card textbox
    const addAssessmentSchema = Yup.object().shape({
      definiation: Yup.string()
        .min(2, 'Too Short!')
        .max(250, 'Too Long!')
        .required('Required'),
      expstatement: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      expBehaviour: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      expscaling: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      excstatement: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
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
    });

    const renderForm = (formikprops: any) => (
      <form onSubmit={formikprops.handleSubmit} className={'form'}>
        <div className="row">
          <div className="col-lg-12">
            <div className="PageHeader">
              <div className="row">
                <div className="col-lg-5 col-md-5">
                  <h2 className="font-weight-light">Edit Assesment Items</h2>
                </div>
              </div>
            </div>
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="ibox">
                <div className="ibox-content">
                  <div className="form-group  row">
                    <label className="col-sm-2 col-form-label font-bold">Defination</label>
                    <div className="col-sm-10">
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
                            name="None"
                            value="val1"
                            currentSelection={this.state.categorySelected}
                            onChange={this.catehandleChange}
                          >
                            None
                          </RadioButton>
                          <RadioButton
                            name="character"
                            value="val2"
                            currentSelection={this.state.categorySelected}
                            onChange={this.catehandleChange}
                          >
                            {' '}
                            Character{' '}
                          </RadioButton>
                          <RadioButton
                            name="skill"
                            value="val3"
                            currentSelection={this.state.categorySelected}
                            onChange={this.catehandleChange}
                          >
                            Skill
                          </RadioButton>
                          <RadioButton
                            name="Action"
                            value="val4"
                            currentSelection={this.state.categorySelected}
                            onChange={this.catehandleChange}
                          >
                            Action
                          </RadioButton>
                          <div className="isa_error">
                            <span className="error text-danger">
                              {this.state.categorySelected === '' ? 'Required' : null}
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
                        name="Competency"
                        value="comtval"
                        currentSelection={this.state.typeSelected}
                        onChange={this.typehandleChange}
                      >
                        Competency
                      </RadioButton>
                      <RadioButton
                        name="character"
                        value="Rationalval"
                        currentSelection={this.state.typeSelected}
                        onChange={this.typehandleChange}
                      >
                        Rational
                      </RadioButton>
                      <RadioButton
                        name="Influential"
                        value="influval"
                        currentSelection={this.state.typeSelected}
                        onChange={this.typehandleChange}
                      >
                        Influential
                      </RadioButton>
                      <div className="isa_error">
                        <span className="error text-danger">
                          {this.state.typeSelected === '' ? 'Required' : null}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed" />
                  {this.state.typeSelected === 'comtval' ? (
                    <Fragment>
                      <div className="form-group row">
                        {' '}
                        <label className="col-sm-2 col-form-label font-bold">Competency</label>
                        <div className="col-sm-10">
                          {' '}
                          <select
                            className="form-control m-b col-sm-4"
                            name="account"
                            value={this.state.competency}
                            onChange={this.competencyhandleChange}
                          >
                            {' '}
                            <option>Add Competency</option>
                            <option>option 2</option>
                            <option>option 3</option>
                            <option>option 4</option>
                          </select>
                        </div>
                      </div>{' '}
                      <div className="hr-line-dashed" />
                    </Fragment>
                  ) : null}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Fath Based</label>
                    <div className="col-sm-10">
                      <RadioButton
                        name="Competency"
                        value="fathyes"
                        currentSelection={this.state.fathSelected}
                        onChange={this.fathhandleChange}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="character"
                        value="fathNo"
                        currentSelection={this.state.fathSelected}
                        onChange={this.fathhandleChange}
                      >
                        No
                      </RadioButton>
                      <div className="isa_error">
                        <span className="error text-danger">
                          {this.state.fathSelected === '' ? 'Required' : null}
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
                        name="Higheredu"
                        value="edval"
                        isChecked={this.state.recommendAppHigher}
                        onChange={this.recommendhandleChange}
                      >
                        Higher Education
                      </Checkbox>
                      <Checkbox
                        name="Corporate"
                        value="Corporateval"
                        isChecked={this.state.recommendAppCorporate}
                        onChange={this.recommendhandleChange}
                      >
                        Corporate
                      </Checkbox>

                      {this.state.recommendAppCorporate ? null : this.state
                          .recommendAppHigher ? null : (
                        <div className="isa_error">
                          <span className="error text-danger">
                            {this.state.usage === '' ? 'Required' : null}
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
                        name="all"
                        value={'allcheckbox'}
                        isChecked={this.state.entityCheckedAll}
                        onChange={this.allEntityhandleChange}
                      >
                        All
                      </Checkbox>
                      <Checkbox
                        name="shrm"
                        value={this.state.entityCheck[0].value}
                        isChecked={this.state.entityCheck[0].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        SHRM
                      </Checkbox>
                      <Checkbox
                        name="aacsb"
                        value={this.state.entityCheck[1].value}
                        isChecked={this.state.entityCheck[1].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        AACSB
                      </Checkbox>
                      <Checkbox
                        name="acbsp"
                        value={this.state.entityCheck[2].value}
                        isChecked={this.state.entityCheck[2].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        ACBSP
                      </Checkbox>
                      <Checkbox
                        name="iacbe"
                        value={this.state.entityCheck[3].value}
                        isChecked={this.state.entityCheck[3].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        IACBE
                      </Checkbox>
                      <Checkbox
                        name="amba"
                        value={this.state.entityCheck[4].value}
                        isChecked={this.state.entityCheck[4].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        AMBA
                      </Checkbox>

                      <Checkbox
                        name="acjs"
                        value={this.state.entityCheck[5].value}
                        isChecked={this.state.entityCheck[5].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        ACJS
                      </Checkbox>
                      <Checkbox
                        name="naspaa"
                        value={this.state.entityCheck[6].value}
                        isChecked={this.state.entityCheck[6].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        NASPAA
                      </Checkbox>
                      <Checkbox
                        name="caep"
                        value={this.state.entityCheck[7].value}
                        isChecked={this.state.entityCheck[7].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        CAEP
                      </Checkbox>
                      <Checkbox
                        name="cahme"
                        value={this.state.entityCheck[8].value}
                        isChecked={this.state.entityCheck[8].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        CAHME
                      </Checkbox>
                      <Checkbox
                        name="aupha"
                        value={this.state.entityCheck[9].value}
                        isChecked={this.state.entityCheck[9].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        AUPHA
                      </Checkbox>
                      <Checkbox
                        name="nace"
                        value={this.state.entityCheck[10].value}
                        isChecked={this.state.entityCheck[10].isChecked}
                        onChange={this.entityhandleChange}
                      >
                        NACE
                      </Checkbox>
                      <div className="isa_error">
                        <span className="error text-danger">
                          {this.state.entitySelect === 0 ? 'Required' : null}
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
                        name="Competency"
                        value="fathyes"
                        currentSelection={this.state.usage}
                        onChange={this.usagehandleChange}
                      >
                        Yes
                      </RadioButton>
                      <RadioButton
                        name="character"
                        value="fathNo"
                        currentSelection={this.state.usage}
                        onChange={this.usagehandleChange}
                      >
                        No
                      </RadioButton>
                      <div className="isa_error">
                        <span className="error text-danger">
                          {this.state.usage === '' ? 'Required' : null}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed" />

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label font-bold">Assesment Type</label>
                    <div className="col-sm-10 d-flex align-items-center">
                      <RadioButton
                        name="rubric"
                        value="rubricval"
                        currentSelection={this.state.assessmentType}
                        onChange={this.assessmentehandleChange}
                      >
                        Rubric
                      </RadioButton>
                      <RadioButton
                        name="open"
                        value="openval"
                        currentSelection={this.state.assessmentType}
                        onChange={this.assessmentehandleChange}
                      >
                        Open Ended
                      </RadioButton>
                    </div>
                  </div>
                  <div className="isa_error">
                    <span className="error text-danger">
                      {this.state.assessmentType === '' ? 'Required' : null}
                    </span>
                  </div>
                  <div className="hr-line-dashed" />

                  {this.state.assessmentType === 'rubricval' ? (
                    <Fragment>
                      <Assessmentelement
                        formikprops={formikprops}
                        tag={Field}
                        key={0}
                        comNumber={0}
                        onChange={this.onelementhandleChange}
                      />
                      {this.state.countAssetelement > 0 ? (
                        <Fragment>
                          {' '}
                          {(function(count, handle) {
                            let arr = [];
                            for (var i = 0; i < count; i++) {
                              arr.push(
                                <Fragment>
                                  <div className="ibox showMore">
                                    <div className="ibox-title">
                                      <h5>Add Elements - {i + 1}</h5>
                                      <div className="ibox-tools">
                                        <a className="hide-link">
                                          <i className="fa fa-times" />
                                        </a>
                                      </div>
                                    </div>
                                    <Assessmentelement
                                      formikprops={formikprops}
                                      comNumber={i + 1}
                                      tag={Field}
                                      key={i + 1}
                                      onChange={handle}
                                    />
                                  </div>
                                </Fragment>
                              );
                            }
                            return arr;
                          })(this.state.countAssetelement, this.onelementhandleChange)}
                        </Fragment>
                      ) : null}
                    </Fragment>
                  ) : null}
                </div>
              </div>
              {this.state.typeSelected === 'influval' ? (
                <div className="">
                  <button
                    type="button"
                    id="helper"
                    onClick={this.onClickassetelement}
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
          initialValues={{
            categorySelected: this.state.categorySelected,
            definiation: '',
            expstatement: '',
            expBehaviour: '',
            expscaling: '',
            excstatement: '',
            excbehaviour: '',
            excscaling: '',
            comstatement: '',
            combehavior: '',
            comscaling: '',
            marstatement: '',
            marbehaviour: '',
            marscaling: '',
            unstatement: '',
            unbehaviour: '',
            unscaling: '',
          }}
          validationSchema={addAssessmentSchema}
          onSubmit={() => {}}
        >
          {formikprops => renderForm(formikprops)}
        </Formik>
      </DashboardTemplate>
    );
  }
}

export default EditAssessment;
