import React, { Fragment } from 'react';
import { Button, Form } from 'reactstrap';
import FormikBag from '../../../interfaces/FormikBag';
import PageBody from '../../atoms/PageBody';
import FormElement, { FormElementTypes } from '../../molecules/FormElement';
import IconButton from '../../atoms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LookupContextConsumer } from '../../../modules/Lookup/context';
import { LookupContextInterface, LookupItemInterface } from '../../../modules/Lookup/interface';
import { lookups } from '../../../modules/Lookup/enum';

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
  const renderRolesDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.evaluationRolesLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };
  function getParticipantField(index: number, key: string) {
    if (index !== undefined) {
      return `participants[${index}].${key}`;
    }
    return key;
  }
  function getevalutorField(index: number, evalIndex: number, key: string) {
    if (index !== undefined) {
      return `participants[${index}].evaluators[${evalIndex}].${key}`;
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
              name={getevalutorField(evalutorProps.index, evalutorProps.evalindex, 'roleId')}
              formikprops={formikprops}
              type={FormElementTypes.SELECT}
              noValidate={true}
              inline={true}
              last={true}
            >
              <option value="0">Select Role</option>
              <LookupContextConsumer>{renderRolesDropdown}</LookupContextConsumer>
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
                name={getParticipantField(propss.index, 'roleId')}
                formikprops={formikprops}
                type={FormElementTypes.SELECT}
                noValidate={true}
                inline={true}
                last={true}
              >
                <option value="0">Select Role</option>
                <LookupContextConsumer>{renderRolesDropdown}</LookupContextConsumer>
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
          {propss.participant.evaluators.map((item: any, index: any) => {
            return renderEvaluator(item, index, propss.index);
          })}
        </div>
        <div className="hr-line-dashed" />
      </Fragment>
    );
  };
  const renderParticipantList = (participant: any, index: number) => (
    <Fragment>
      <div className="form-group row">
        <div className="col-sm-6 font-bold align-self-start">
          <h4>Participant</h4>
        </div>
        <div className="col-sm-6">
          <Button className="mt-3 float-right" color="primary" size="lg" onClick={() => removeParticipant(index)}>
            Remove Participant {<FontAwesomeIcon icon={'minus'} />}
          </Button>
        </div>

        <div className="col-sm-12 row">
          <div className="col-md-3">
            <FormElement
              label=""
              name={getParticipantField(index, 'email')}
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
              name={getParticipantField(index, 'firstName')}
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
              name={getParticipantField(index, 'lastName')}
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
              name={getParticipantField(index, 'roleId')}
              formikprops={formikprops}
              type={FormElementTypes.SELECT}
              noValidate={true}
              inline={true}
              last={true}
            >
              <option value="0">Select Role</option>
              <LookupContextConsumer>{renderRolesDropdown}</LookupContextConsumer>
            </FormElement>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <h4>Evaluators</h4>
        </div>
        <div className="col-sm-6">
          <Button className="mt-3 float-right" color="primary" size="lg" onClick={() => addNewEvaluator(index)}>
            Add Evaluators {<FontAwesomeIcon icon={'plus'} />}
          </Button>
        </div>
        {participant.evaluators.map((item: any, index: any) => {
          return renderEvaluator(item, index, index);
        })}
      </div>
      <div className="hr-line-dashed" />
    </Fragment>
  );
  const renderEvaluator = (participant: any, index: number, listind: number) => (
    <AddEvaluator key={index} index={listind} evalindex={index} />
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
