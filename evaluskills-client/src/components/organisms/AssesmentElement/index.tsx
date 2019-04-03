import React, { Fragment, PureComponent } from 'react';
import { FormFeedback, Input } from 'reactstrap';
interface AssessmentElementProps {
  key: number;
  comNumber: number;
  tag?: any;
  onChange: (event: any, key: number) => void;
  formikprops: any;
}
const AssessmentElement: React.FunctionComponent<AssessmentElementProps> = props => {
  // constructor(props: AssessmentElementProps) {
  //   super(props);
  //   onhandlechange = onhandlechange.bind(this);
  // }
  function onhandlechange(event: any) {
    props.formikprops.handleChange(event);

    props.onChange(event, props.comNumber);
  }
  // public render() {
  console.log('formik ' + props.formikprops.errors.itemsElements);
  return (
    <Fragment>
      {props.comNumber > 0 ? (
        <Fragment>
          <div className="row">
            <label className="col-sm-2 col-form-label font-bold">
              Element Title {props.comNumber + 1}
            </label>
            <div className="col-md-10">
              <Input
                type="text"
                name="element"
                className="form-control"
                invalid={
                  !!(props.formikprops.touched.definiation && props.formikprops.errors.definiation)
                }
              />
              <FormFeedback tooltip={true}>{props.formikprops.errors.definiation}</FormFeedback>
            </div>
          </div>
        </Fragment>
      ) : null}
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
            value={
              props.formikprops.values.lists[props.comNumber]
                ? props.formikprops.values.lists[props.comNumber][0].statement
                : null
            }
            id={`lists[${props.comNumber}][0].statement`}
            type="textarea"
            name={`lists[${props.comNumber}][0].statement`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('statement')
                ? props.formikprops.touched.lists[props.comNumber][0].statement &&
                  props.formikprops.errors.lists[props.comNumber][0].statement
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
            props.formikprops.touched.lists[props.comNumber][0] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('statement') &&
            props.formikprops.touched.lists[props.comNumber][0].hasOwnProperty('statement')
              ? props.formikprops.errors.lists[props.comNumber][0].statement
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][0].behaviur`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][0] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('behaviur') &&
              props.formikprops.touched.lists[props.comNumber][0].hasOwnProperty('behaviur')
                ? props.formikprops.touched.lists[props.comNumber][0].behaviur &&
                  props.formikprops.errors.lists[props.comNumber][0].behaviur
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('behaviur')
              ? props.formikprops.errors.lists[props.comNumber][0].behaviur
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][0].scaling`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][0] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('scaling') &&
              props.formikprops.touched.lists[props.comNumber][0].hasOwnProperty('scaling')
                ? props.formikprops.touched.lists[props.comNumber][0].scaling &&
                  props.formikprops.errors.lists[props.comNumber][0].scaling
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][0].hasOwnProperty('scaling')
              ? props.formikprops.errors.lists[props.comNumber][0].scaling
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
            name={`lists[${props.comNumber}][1].statement`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][1] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('statement') &&
              props.formikprops.touched.lists[props.comNumber][1].hasOwnProperty('statement')
                ? props.formikprops.touched.lists[props.comNumber][1].statement &&
                  props.formikprops.errors.lists[props.comNumber][1].statement
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('statement')
              ? props.formikprops.errors.lists[props.comNumber][1].statement
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][1].behaviur`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][1] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('behaviur') &&
              props.formikprops.touched.lists[props.comNumber][1].hasOwnProperty('behaviur')
                ? props.formikprops.touched.lists[props.comNumber][1].behaviur &&
                  props.formikprops.errors.lists[props.comNumber][1].behaviur
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('behaviur')
              ? props.formikprops.errors.lists[props.comNumber][1].behaviur
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][1].scaling`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][1] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('scaling') &&
              props.formikprops.touched.lists[props.comNumber][1].hasOwnProperty('scaling')
                ? props.formikprops.touched.lists[props.comNumber][1].scaling &&
                  props.formikprops.errors.lists[props.comNumber][1].scaling
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][1].hasOwnProperty('scaling')
              ? props.formikprops.errors.lists[props.comNumber][1].scaling
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
            name={`lists[${props.comNumber}][2].statement`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][2] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('statement') &&
              props.formikprops.touched.lists[props.comNumber][2].hasOwnProperty('statement')
                ? props.formikprops.touched.lists[props.comNumber][2].statement &&
                  props.formikprops.errors.lists[props.comNumber][2].statement
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('statement')
              ? props.formikprops.errors.lists[props.comNumber][2].statement
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][2].behaviur`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][2] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('behaviur') &&
              props.formikprops.touched.lists[props.comNumber][2].hasOwnProperty('behaviur')
                ? props.formikprops.touched.lists[props.comNumber][2].behaviur &&
                  props.formikprops.errors.lists[props.comNumber][2].behaviur
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('behaviur')
              ? props.formikprops.errors.lists[props.comNumber][2].behaviur
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][2].scaling`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][2] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('scaling') &&
              props.formikprops.touched.lists[props.comNumber][2].hasOwnProperty('scaling')
                ? props.formikprops.touched.lists[props.comNumber][2].scaling &&
                  props.formikprops.errors.lists[props.comNumber][2].scaling
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][2].hasOwnProperty('scaling')
              ? props.formikprops.errors.lists[props.comNumber][2].scaling
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
            name={`lists[${props.comNumber}][3].statement`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][3] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('statement') &&
              props.formikprops.touched.lists[props.comNumber][3].hasOwnProperty('statement')
                ? props.formikprops.touched.lists[props.comNumber][3].statement &&
                  props.formikprops.errors.lists[props.comNumber][3].statement
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('statement')
              ? props.formikprops.errors.lists[props.comNumber][3].statement
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][3].behaviur`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][3] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('behaviur') &&
              props.formikprops.touched.lists[props.comNumber][3].hasOwnProperty('behaviur')
                ? props.formikprops.touched.lists[props.comNumber][3].behaviur &&
                  props.formikprops.errors.lists[props.comNumber][3].behaviur
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('behaviur')
              ? props.formikprops.errors.lists[props.comNumber][3].behaviur
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][3].scaling`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][3] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('scaling') &&
              props.formikprops.touched.lists[props.comNumber][3].hasOwnProperty('scaling')
                ? props.formikprops.touched.lists[props.comNumber][3].scaling &&
                  props.formikprops.errors.lists[props.comNumber][3].scaling
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][3].hasOwnProperty('scaling')
              ? props.formikprops.errors.lists[props.comNumber][3].scaling
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
            name={`lists[${props.comNumber}][4].statement`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][4] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('statement') &&
              props.formikprops.touched.lists[props.comNumber][4].hasOwnProperty('statement')
                ? props.formikprops.touched.lists[props.comNumber][4].statement &&
                  props.formikprops.errors.lists[props.comNumber][4].statement
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('statement')
              ? props.formikprops.errors.lists[props.comNumber][4].statement
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][4].behaviur`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][4] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('behaviur') &&
              props.formikprops.touched.lists[props.comNumber][4].hasOwnProperty('behaviur')
                ? props.formikprops.touched.lists[props.comNumber][4].behaviur &&
                  props.formikprops.errors.lists[props.comNumber][4].behaviur
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('behaviur')
              ? props.formikprops.errors.lists[props.comNumber][4].behaviur
              : null}
          </FormFeedback>
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`lists[${props.comNumber}][4].scaling`}
            placeholder={'Add Statement'}
            invalid={
              props.formikprops.touched !== undefined &&
              props.formikprops.errors !== undefined &&
              props.formikprops.errors.hasOwnProperty('lists') &&
              props.formikprops.touched.hasOwnProperty('lists') &&
              props.formikprops.errors.lists[props.comNumber] !== undefined &&
              props.formikprops.touched.lists[props.comNumber] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
              props.formikprops.touched.lists[props.comNumber][4] !== undefined &&
              props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('scaling') &&
              props.formikprops.touched.lists[props.comNumber][4].hasOwnProperty('scaling')
                ? props.formikprops.touched.lists[props.comNumber][4].scaling &&
                  props.formikprops.errors.lists[props.comNumber][4].scaling
                : null
            }
            onChange={onhandlechange}
          />
          <FormFeedback tooltip={true}>
            {props.formikprops.touched !== undefined &&
            props.formikprops.errors !== undefined &&
            props.formikprops.errors.hasOwnProperty('lists') &&
            props.formikprops.touched.hasOwnProperty('lists') &&
            props.formikprops.errors.lists[props.comNumber] !== undefined &&
            props.formikprops.touched.lists[props.comNumber] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4] !== undefined &&
            props.formikprops.errors.lists[props.comNumber][4].hasOwnProperty('scaling')
              ? props.formikprops.errors.lists[props.comNumber][4].scaling
              : null}
          </FormFeedback>
        </div>
      </div>
    </Fragment>
  );
};

export default AssessmentElement;
