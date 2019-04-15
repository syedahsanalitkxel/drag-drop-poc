import React, { Fragment } from 'react';
import { Button, Form } from 'reactstrap';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import IconButton from '../../atoms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  index?: number;
  formikprops: FormikBag;
  children?: React.ReactNode;
  participant?: any;
  addNewEvaluator: (id: number) => void;
  removeParticipant: (id: number) => void;
  removeEvaluatior: (index: number, evalueid: number) => void;
}

const Participants: React.FunctionComponent<Props> = ({
  addNewEvaluator,
  participant,
  index,
  formikprops,
  removeParticipant,
  removeEvaluatior,
}) => {
  console.log(formikprops);
  function getParticipantField(index: number, key: string) {
    if (index !== undefined) {
      return `newParticipant[${index}].paticipant.${key}`;
    }
    return key;
  }
  function getevalutorField(index: number, evalIndex: number, key: string) {
    if (index !== undefined) {
      return `newParticipant[${index}].evaluator[${evalIndex}].${key}`;
    }
    return key;
  }
  const AddEvaluator = (evalutorProps: any) => {
    return (
      <div className="col-sm-12 row ">
        <div className="col-md-3 col-sm-3">
          <FormElement
            label=""
            name={getevalutorField(evalutorProps.index, evalutorProps.evalindex, 'email')}
            placeholder="Add Email"
            formikprops={formikprops}
            noValidate={true}
            inline={true}
            last={true}
          />
        </div>
        <div className="col-md-3 col-sm-3">
          <FormElement
            label=""
            name={getevalutorField(evalutorProps.index, evalutorProps.evalindex, 'firstName')}
            placeholder="First Name"
            formikprops={formikprops}
            noValidate={true}
            inline={true}
            last={true}
          />
        </div>
        <div className="col-md-3 col-sm-3">
          <FormElement
            label=""
            name={getevalutorField(evalutorProps.index, evalutorProps.evalindex, 'lastName')}
            placeholder="Last Name"
            formikprops={formikprops}
            noValidate={true}
            inline={true}
            last={true}
          />
        </div>
        <div className="col-md-3  col-sm-3">
          <div className="col-sm-12 p-l-0 p-r-0 d-flex">
            <FormElement
              label=""
              name={getevalutorField(evalutorProps.index, evalutorProps.evalindex, 'role')}
              formikprops={formikprops}
              type={FormElementTypes.SELECT}
              noValidate={true}
              inline={true}
              last={true}
            >
              <option value="">Select Role</option>
              <option value="role1">Role 1</option>
              <option value="role2">Role 2</option>
            </FormElement>

            <div className="col-sm-3 ">
              <IconButton
                className="btn-danger btn-outline mt-3"
                icon="minus"
                actionHandler={(id: any) => removeEvaluatior(evalutorProps.index, evalutorProps.evalindex)}
              />
              {/* <Button className="btn-danger btn-outline mt-3 " size="sm" type="button">
                -
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const NewParticipant = (propss: any) => {
    return (
      <Fragment>
        <div className="form-group row">
          <div className="col-sm-6 font-bold align-self-start">
            <h4>Participant</h4>
          </div>
          <div className="col-sm-6">
            <Button
              className="mt-3 float-right"
              color="primary"
              size="lg"
              onClick={() => removeParticipant(propss.index)}
            >
              Remove Participant {<FontAwesomeIcon icon={'minus'} />}
            </Button>
          </div>

          <div className="col-sm-12 row">
            <div className="col-md-3">
              <FormElement
                label=""
                name={getParticipantField(propss.index, 'email')}
                placeholder="Add Email"
                formikprops={formikprops}
                noValidate={true}
                inline={true}
                last={true}
              />
            </div>
            <div className="col-md-3">
              <FormElement
                label=""
                name={getParticipantField(propss.index, 'firstName')}
                placeholder="First Name"
                formikprops={formikprops}
                noValidate={true}
                inline={true}
                last={true}
              />
            </div>
            <div className="col-md-3">
              <FormElement
                label=""
                name={getParticipantField(propss.index, 'lastName')}
                placeholder="Last Name"
                formikprops={formikprops}
                noValidate={true}
                inline={true}
                last={true}
              />
            </div>
            <div className="col-md-3">
              <FormElement
                label=""
                name={getParticipantField(propss.index, 'role')}
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                noValidate={true}
                inline={true}
                last={true}
              >
                <option value="">Select Role</option>
                <option value="role1">Role 1</option>
                <option value="role2">Role 2</option>
              </FormElement>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6">
            <h4>Evaluators</h4>
          </div>
          <div className="col-sm-6">
            <Button
              className="mt-3 float-right"
              color="primary"
              size="lg"
              onClick={() => addNewEvaluator(propss.index)}
            >
              Add Evaluators {<FontAwesomeIcon icon={'plus'} />}
            </Button>
          </div>
          {propss.participant.evaluator.map((item: any, index: any) => {
            return renderEvaluator(item, index, propss.index);
          })}
        </div>
        <div className="hr-line-dashed" />
      </Fragment>
    );
  };
  const renderParticipantList = (participant: any, index: number) => (
    <Fragment key={index}>
      <NewParticipant participant={participant} index={index} />
    </Fragment>
  );
  const renderEvaluator = (participant: any, index: number, listind: number) => (
    <Fragment key={index}>
      <AddEvaluator index={listind} evalindex={index} />
    </Fragment>
  );
  return (
    <PageBody card={true} className="m-t-15">
      <div className="ibox">
        <div className="ibox-content p-l-35">{participant && participant.map(renderParticipantList)}</div>
      </div>
    </PageBody>
  );
};

Participants.defaultProps = {
  index: undefined,
};

export default Participants;
