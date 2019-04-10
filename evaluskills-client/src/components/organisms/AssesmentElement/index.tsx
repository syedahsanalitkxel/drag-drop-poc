import React, { Fragment, PureComponent } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import { ErrorMessage } from 'formik';
interface AssessmentElementProps {
  key: number;
  comNumber: number;
  tag?: any;
  onChange?: (event: any, key: number) => void;
  formikprops: any;
}
const AssessmentElement: React.FunctionComponent<AssessmentElementProps> = props => {
  // constructor(props: AssessmentElementProps) {
  //   super(props);
  //   onhandlechange = onhandlechange.bind(this);
  // }
  function onhandlechange(event: any) {
    props.formikprops.handleChange(event);
  }
  function getValidation(name: string) {
    return !!(props.formikprops.touched[name] && props.formikprops.errors[name]);
  }
  const ErroorMessage = (name: any) => {
    return (
      <ErrorMessage
        name={name}
        render={msg => (
          <div className="isa_error">
            <span className="error text-danger">{msg}</span>
          </div>
        )}
      />
    );
  };
  // public render() {
  console.log('formik ' + props.formikprops.errors.itemsElements);
  return (
    <Fragment>
      {props.comNumber > 1 ? (
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
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[0].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[0].statement`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[0].statement`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[0].behaviur`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[0].behaviur`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[0].behaviur`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[0].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[0].scaling`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[0].scaling`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
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
            name={`itemElements[${props.comNumber}].itemElementOptions[1].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[1].statement`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[1].statement`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[1].behaviur`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[1].behaviur`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[1].behaviur`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[1].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[1].scaling`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[1].scaling`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
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
            name={`itemElements[${props.comNumber}].itemElementOptions[2].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[2].statement`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[2].statement`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[2].behaviur`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[2].behaviur`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[2].behaviur`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[2].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[2].scaling`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[2].scaling`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
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
            name={`itemElements[${props.comNumber}].itemElementOptions[3].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[3].statement`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[3].statement`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[3].behaviur`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[3].behaviur`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[3].behaviur`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[3].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[3].scaling`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[3].scaling`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
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
            name={`itemElements[${props.comNumber}].itemElementOptions[4].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[4].statement`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[4].statement`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label b-r border-left">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[4].behaviur`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[4].behaviur`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[4].behaviur`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
        <div className="col-sm-3 col-form-label">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            rows={2}
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[4].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(
              `itemElements[${props.comNumber}].itemElementOptions[4].scaling`
            )}
            onChange={onhandlechange}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[4].scaling`}
            render={msg => (
              <div className="isa_error">
                <span className="error text-danger">{msg}</span>
              </div>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AssessmentElement;
