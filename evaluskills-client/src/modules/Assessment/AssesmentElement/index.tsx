import React, { Fragment, PureComponent } from 'react';
import { FormFeedback, Input } from 'reactstrap';
import { ErrorMessage, Field } from 'formik';
interface AssessmentElementProps {
  key: number;
  comNumber: number;
  tag?: any;
  onChange: (event: any, key: number, objectKey: number, objectName: string) => void;
  formikprops: any;
}
const AssessmentElement: React.FunctionComponent<AssessmentElementProps> = props => {
  // constructor(props: AssessmentElementProps) {
  //   super(props);
  //   onhandlechange = onhandlechange.bind(this);
  // }
  function onhandlechange(event: any, key: number, objectName: string) {
    props.onChange(event, props.comNumber, key, objectName);
    props.formikprops.handleChange(event);
  }
  function getValidation(name: string) {
    return !!(props.formikprops.touched[name] && props.formikprops.errors[name]);
  }
  // public render() {
  console.log('formik ' + props.formikprops.errors.itemsElements);
  return (
    <Fragment>
      <div className="hr-line-dashed" />
      {props.comNumber > 0 ? (
        <Fragment>
          <div className="row">
            <label className="col-sm-2 col-form-label font-bold">Element Title {props.comNumber + 1}</label>
            <div className="col-md-10">
              <Input
                type="text"
                tag={Field}
                id={'itemElements[${props.comNumber}].title'}
                placeholder={'Add Title'}
                name={`itemElements[${props.comNumber}].title`}
                className="form-control"
                invalid={getValidation(`itemElements[${props.comNumber}].title`)}
              />
              <ErrorMessage
                name={`itemElements[${props.comNumber}].title`}
                render={msg => (
                  <div className="isa_error">
                    <span className="error text-danger">{msg}</span>
                  </div>
                )}
              />
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
        <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">5 - Exceptional</label>
        <div className="col-sm-3 col-form-label font-bold">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[0].statement}
            id={`itemElements[${props.comNumber}].itemElementOptions[0].statement`}
            name={`itemElements[${props.comNumber}].itemElementOptions[0].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[0].statement`)}
            onChange={e => {
              onhandlechange(e, 0, 'statement');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[0].behaviour}
            name={`itemElements[${props.comNumber}].itemElementOptions[0].behaviour`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[0].behaviour`)}
            onChange={e => {
              onhandlechange(e, 0, 'behaviour');
            }}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[0].behaviour`}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[0].scaling}
            name={`itemElements[${props.comNumber}].itemElementOptions[0].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[0].scaling`)}
            onChange={e => {
              onhandlechange(e, 0, 'scaling');
            }}
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
        <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">4 - Excellent</label>
        <div className="col-sm-3 col-form-label font-bold">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            type="textarea"
            name={`itemElements[${props.comNumber}].itemElementOptions[1].statement`}
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[1].statement}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[1].statement`)}
            onChange={e => {
              onhandlechange(e, 1, 'statement');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[1].behaviour}
            name={`itemElements[${props.comNumber}].itemElementOptions[1].behaviour`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[1].behaviour`)}
            onChange={e => {
              onhandlechange(e, 1, 'behaviour');
            }}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[1].behaviour`}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[1].scaling}
            name={`itemElements[${props.comNumber}].itemElementOptions[1].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[1].scaling`)}
            onChange={e => {
              onhandlechange(e, 1, 'scaling');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[2].statement}
            name={`itemElements[${props.comNumber}].itemElementOptions[2].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[2].statement`)}
            onChange={e => {
              onhandlechange(e, 2, 'statement');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[2].behaviour}
            name={`itemElements[${props.comNumber}].itemElementOptions[2].behaviour`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[2].behaviour`)}
            onChange={e => {
              onhandlechange(e, 2, 'behaviour');
            }}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[2].behaviour`}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[2].scaling}
            name={`itemElements[${props.comNumber}].itemElementOptions[2].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[2].scaling`)}
            onChange={e => {
              onhandlechange(e, 2, 'scaling');
            }}
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
        <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">2 - Marginal</label>
        <div className="col-sm-3 col-form-label font-bold">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[3].statement}
            name={`itemElements[${props.comNumber}].itemElementOptions[3].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[3].statement`)}
            onChange={e => {
              onhandlechange(e, 3, 'statement');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[3].behaviour}
            name={`itemElements[${props.comNumber}].itemElementOptions[3].behaviour`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[3].behaviour`)}
            onChange={e => {
              onhandlechange(e, 3, 'behaviour');
            }}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[3].behaviour`}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[3].scaling}
            name={`itemElements[${props.comNumber}].itemElementOptions[3].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[3].scaling`)}
            onChange={e => {
              onhandlechange(e, 3, 'scaling');
            }}
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
        <label className="col-sm-2 col-form-label font-bold d-flex align-items-center">1 - Unsatisfactory</label>
        <div className="col-sm-3 col-form-label font-bold">
          <Input
            className="assesmentTextarea"
            aria-multiline="true"
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[4].statement}
            name={`itemElements[${props.comNumber}].itemElementOptions[4].statement`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[4].statement`)}
            onChange={e => {
              onhandlechange(e, 4, 'statement');
            }}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[4].behaviour}
            name={`itemElements[${props.comNumber}].itemElementOptions[4].behaviour`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[4].behaviour`)}
            onChange={e => {
              onhandlechange(e, 4, 'behaviour');
            }}
          />
          <ErrorMessage
            name={`itemElements[${props.comNumber}].itemElementOptions[4].behaviour`}
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
            type="textarea"
            value={props.formikprops.values.itemElements[props.comNumber].itemElementOptions[4].scaling}
            name={`itemElements[${props.comNumber}].itemElementOptions[4].scaling`}
            placeholder={'Add Statement'}
            invalid={getValidation(`itemElements[${props.comNumber}].itemElementOptions[4].scaling`)}
            onChange={e => {
              onhandlechange(e, 4, 'scaling');
            }}
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
