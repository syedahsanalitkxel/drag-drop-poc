import React, { Fragment, PureComponent } from 'react';
import { FormFeedback, Input } from 'reactstrap';
interface AssessmentElementProps {
  key: number;
  comNumber: number;
  tag?: any;
  onChange: (event: any, key: number) => void;
  formikprops: any;
}
class AssessmentElement extends PureComponent<AssessmentElementProps, any> {
  constructor(props: AssessmentElementProps) {
    super(props);
    this.onhandlechange = this.onhandlechange.bind(this);
  }
  public onhandlechange(event: any) {
    this.setState({ expstatement: event.target.value });
    this.props.formikprops.handleChange(event);
    this.props.formikprops.handleBlur(event);
    this.props.onChange(event, this.props.comNumber);
  }
  public render() {
    console.log('formik ' + this.props.formikprops.errors.itemsElements);
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
              value={this.props.formikprops.values.lists[this.props.comNumber][0].statement}
              id={`lists[${this.props.comNumber}][0].statement`}
              type="textarea"
              name={`lists[${this.props.comNumber}][0].statement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty(
                  'statement'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][0].statement &&
                    this.props.formikprops.errors.lists[this.props.comNumber][0].statement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber][0] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty(
                'statement'
              ) &&
              this.props.formikprops.touched.lists[this.props.comNumber][0].hasOwnProperty(
                'statement'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][0].statement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][0].behaviur`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][0] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty(
                  'behaviur'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][0].hasOwnProperty(
                  'behaviur'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][0].behaviur &&
                    this.props.formikprops.errors.lists[this.props.comNumber][0].behaviur
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty(
                'behaviur'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][0].behaviur
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][0].scaling`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][0] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty(
                  'scaling'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][0].hasOwnProperty(
                  'scaling'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][0].scaling &&
                    this.props.formikprops.errors.lists[this.props.comNumber][0].scaling
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][0].hasOwnProperty('scaling')
                ? this.props.formikprops.errors.lists[this.props.comNumber][0].scaling
                : null}
            </FormFeedback>
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
              name={`lists[${this.props.comNumber}][1].statement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty(
                  'statement'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][1].hasOwnProperty(
                  'statement'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][1].statement &&
                    this.props.formikprops.errors.lists[this.props.comNumber][1].statement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty(
                'statement'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][1].statement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][1].behaviur`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty(
                  'behaviur'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][1].hasOwnProperty(
                  'behaviur'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][1].behaviur &&
                    this.props.formikprops.errors.lists[this.props.comNumber][1].behaviur
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty(
                'behaviur'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][1].behaviur
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][1].scaling`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][1] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty(
                  'scaling'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][1].hasOwnProperty(
                  'scaling'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][1].scaling &&
                    this.props.formikprops.errors.lists[this.props.comNumber][1].scaling
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][1].hasOwnProperty('scaling')
                ? this.props.formikprops.errors.lists[this.props.comNumber][1].scaling
                : null}
            </FormFeedback>
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
              name={`lists[${this.props.comNumber}][2].statement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty(
                  'statement'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][2].hasOwnProperty(
                  'statement'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][2].statement &&
                    this.props.formikprops.errors.lists[this.props.comNumber][2].statement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty(
                'statement'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][2].statement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][2].behaviur`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty(
                  'behaviur'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][2].hasOwnProperty(
                  'behaviur'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][2].behaviur &&
                    this.props.formikprops.errors.lists[this.props.comNumber][2].behaviur
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty(
                'behaviur'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][2].behaviur
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][2].scaling`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][2] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty(
                  'scaling'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][2].hasOwnProperty(
                  'scaling'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][2].scaling &&
                    this.props.formikprops.errors.lists[this.props.comNumber][2].scaling
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][2].hasOwnProperty('scaling')
                ? this.props.formikprops.errors.lists[this.props.comNumber][2].scaling
                : null}
            </FormFeedback>
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
              name={`lists[${this.props.comNumber}][3].statement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty(
                  'statement'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][3].hasOwnProperty(
                  'statement'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][3].statement &&
                    this.props.formikprops.errors.lists[this.props.comNumber][3].statement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty(
                'statement'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][3].statement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][3].behaviur`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty(
                  'behaviur'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][3].hasOwnProperty(
                  'behaviur'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][3].behaviur &&
                    this.props.formikprops.errors.lists[this.props.comNumber][3].behaviur
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty(
                'behaviur'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][3].behaviur
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][3].scaling`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][3] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty(
                  'scaling'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][3].hasOwnProperty(
                  'scaling'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][3].scaling &&
                    this.props.formikprops.errors.lists[this.props.comNumber][3].scaling
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][3].hasOwnProperty('scaling')
                ? this.props.formikprops.errors.lists[this.props.comNumber][3].scaling
                : null}
            </FormFeedback>
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
              name={`lists[${this.props.comNumber}][4].statement`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty(
                  'statement'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][4].hasOwnProperty(
                  'statement'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][4].statement &&
                    this.props.formikprops.errors.lists[this.props.comNumber][4].statement
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty(
                'statement'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][4].statement
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label b-r border-left">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][4].behaviur`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty(
                  'behaviur'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][4].hasOwnProperty(
                  'behaviur'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][4].behaviur &&
                    this.props.formikprops.errors.lists[this.props.comNumber][4].behaviur
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty(
                'behaviur'
              )
                ? this.props.formikprops.errors.lists[this.props.comNumber][4].behaviur
                : null}
            </FormFeedback>
          </div>
          <div className="col-sm-3 col-form-label">
            <Input
              className="assesmentTextarea"
              aria-multiline="true"
              rows={2}
              type="textarea"
              name={`lists[${this.props.comNumber}][4].scaling`}
              placeholder={'Add Statement'}
              invalid={
                this.props.formikprops.touched !== undefined &&
                this.props.formikprops.errors !== undefined &&
                this.props.formikprops.errors.hasOwnProperty('lists') &&
                this.props.formikprops.touched.hasOwnProperty('lists') &&
                this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.touched.lists[this.props.comNumber][4] !== undefined &&
                this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty(
                  'scaling'
                ) &&
                this.props.formikprops.touched.lists[this.props.comNumber][4].hasOwnProperty(
                  'scaling'
                )
                  ? this.props.formikprops.touched.lists[this.props.comNumber][4].scaling &&
                    this.props.formikprops.errors.lists[this.props.comNumber][4].scaling
                  : null
              }
              onChange={this.onhandlechange}
            />
            <FormFeedback tooltip={true}>
              {this.props.formikprops.touched !== undefined &&
              this.props.formikprops.errors !== undefined &&
              this.props.formikprops.errors.hasOwnProperty('lists') &&
              this.props.formikprops.touched.hasOwnProperty('lists') &&
              this.props.formikprops.errors.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.touched.lists[this.props.comNumber] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4] !== undefined &&
              this.props.formikprops.errors.lists[this.props.comNumber][4].hasOwnProperty('scaling')
                ? this.props.formikprops.errors.lists[this.props.comNumber][4].scaling
                : null}
            </FormFeedback>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AssessmentElement;
