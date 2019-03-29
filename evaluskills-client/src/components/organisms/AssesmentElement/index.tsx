import React, { PureComponent, Component, Fragment } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import DashboardTemplate from '../../templates/DashboardTemplate';
import { faThList } from '@fortawesome/free-solid-svg-icons';

import { Formik, Field, FieldArray } from 'formik';

interface props {
  key: number;
  comNumber: number;

  tag?: any;
  onChange: (event: any, key: number) => void;
  formikprops: any;
}
class Assessmentelement extends PureComponent<props, any> {
  constructor(props: props) {
    super(props);
    this.state = {
      expstatement: '',
    };
    this.onhandlechange = this.onhandlechange.bind(this);
  }
  onhandlechange(event: any) {
    console.log('reff', event.target.name);
    this.setState({ expstatement: event.target.value });
    this.props.formikprops.handleChange(event);
    this.props.formikprops.handleBlur(event);
    this.props.onChange(event, this.props.comNumber);
  }
  render() {
    console.log('formik ' + this.props.formikprops.errors);
    return (
      <Fragment>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold">Rubric</label>
          <label className="col-sm-3 col-form-label font-bold">Statement</label>
          <label className="col-sm-3 col-form-label font-bold">Behaviour</label>
          <label className="col-sm-3 col-form-label font-bold">Scaling</label>
        </div>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">
            5 - Exceptional
          </label>
          <div className="col-sm-3 col-form-label font-bold">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`expstatement[${this.props.comNumber}].expstatement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched &&
                this.props.formikprops.errors &&
                this.props.formikprops.errors.expstatement &&
                this.props.formikprops.touched.expstatement
                  ? this.props.formikprops.touched.expstatement[this.props.comNumber]
                      .expstatement &&
                    this.props.formikprops.errors.expstatement[this.props.comNumber].expstatement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.errors && this.props.formikprops.errors.expstatement
                ? this.props.formikprops.errors.expstatement[this.props.comNumber].expstatement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'expBehaviour'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['expBehaviour'] &&
                  this.props.formikprops.errors['expBehaviour']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.expBehaviour}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'expscaling'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['expscaling'] &&
                  this.props.formikprops.errors['expscaling']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.expscaling}</FormFeedback>
          </div>
        </div>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">
            4 - Excellent
          </label>
          <div className="col-sm-3 col-form-label font-bold">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'excstatement'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['excstatement'] &&
                  this.props.formikprops.errors['excstatement']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.excstatement}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'excbehaviour'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['excbehaviour'] &&
                  this.props.formikprops.errors['excbehaviour']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.excbehaviour}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'excscaling'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['excscaling'] &&
                  this.props.formikprops.errors['excscaling']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.excscaling}</FormFeedback>
          </div>
        </div>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">
            3 - Competent/ Meet&nbsp,Expectation
          </label>
          <div className="col-sm-3 col-form-label font-bold">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'comstatement'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['comstatement'] &&
                  this.props.formikprops.errors['comstatement']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.comstatement}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'combehavior'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['combehavior'] &&
                  this.props.formikprops.errors['combehavior']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.combehavior}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'comscaling'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['comscaling'] &&
                  this.props.formikprops.errors['comscaling']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.comscaling}</FormFeedback>
          </div>
        </div>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">
            2 - Marginal
          </label>
          <div className="col-sm-3 col-form-label font-bold">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'marstatement'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['marstatement'] &&
                  this.props.formikprops.errors['marstatement']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.marstatement}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'marbehaviour'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['marbehaviour'] &&
                  this.props.formikprops.errors['marbehaviour']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.marbehaviour}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'marscaling'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['marscaling'] &&
                  this.props.formikprops.errors['marscaling']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.marscaling}</FormFeedback>
          </div>
        </div>
        <div className="form-group row m-b-0">
          <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">
            1 - Unsatisfactory
          </label>
          <div className="col-sm-3 col-form-label font-bold">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'unstatement'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['unstatement'] &&
                  this.props.formikprops.errors['unstatement']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.unstatement}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'unbehaviour'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['unbehaviour'] &&
                  this.props.formikprops.errors['unbehaviour']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.unbehaviour}</FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={'unscaling'}
              placeholder={'Add Statement'}
              invalid={
                !!(
                  this.props.formikprops.touched['unscaling'] &&
                  this.props.formikprops.errors['unscaling']
                )
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip>{this.props.formikprops.errors.unscaling}</FormFeedback>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Assessmentelement;
