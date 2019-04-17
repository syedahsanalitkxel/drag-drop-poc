import React, { useState } from 'react';

import { Formik } from 'formik';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import styled from 'styled-components';

import PageBody from '../../components/atoms/PageBody';
import PageHeader from '../../components/atoms/PageHeader';
import DeleteModal from '../../components/molecules/DeleteModal';
import FormElement, { FormElementTypes } from '../../components/molecules/FormElement';
import ESModal from '../../components/molecules/Modal';
import ListCardItems from '../../components/organisms/ListCardItems';
import AssessmentItemsList from '../../components/pages/AddEditInstrumentTemplate/AssessmentItemsList';
import { actionTypes } from '../../enums';
import FormikBag from '../../interfaces/FormikBag';
import { isAdd, isList } from '../../utils/routerUtils';
import { LookupContextConsumer } from '../Lookup/context';
import { lookups } from '../Lookup/enum';
import { LookupContextInterface, LookupItemInterface } from '../Lookup/interface';
import { InstrumentTemplateInterface, TemplateItem } from './interface';

interface Props extends RouteComponentProps {
  defaultValue?: InstrumentTemplateInterface;
  copy?: boolean;
  handleAction: (instrument: InstrumentTemplateInterface, mode: actionTypes) => void;
  handleDelete?: (id: string) => void;
}

const initialState: InstrumentTemplateInterface = {
  recommendedApplicationId: 0,
  templateItems: [],
  title: '',
};

const StyledButton = styled(Button)`
  margin-right: 5px;
`;

const AddEditInstrumentTemplate: React.FunctionComponent<Props> = ({
  defaultValue,
  copy,
  handleAction,
  handleDelete,
  history,
  match,
}) => {
  const [formState, setFormState] = useState(defaultValue || initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    id: '',
    visible: false,
  });

  function submitForm(values: InstrumentTemplateInterface) {
    const newFormState = {
      ...formState,
      ...values,
      templateItems: formState.templateItems,
    };

    setFormState(newFormState);

    if (!defaultValue || copy) {
      handleAction(newFormState, actionTypes.NEW);
    } else {
      handleAction(newFormState, actionTypes.EDIT);
    }
  }

  function deleteInstrument(event: React.MouseEvent) {
    event.preventDefault();
    if (defaultValue && defaultValue.id) {
      setDeleteModalState({
        id: defaultValue.id.toString(),
        visible: true,
      });
    }
  }

  function getPageHeader() {
    if (defaultValue && defaultValue.id) {
      const title = copy ? 'Copy' : 'Edit';
      return (
        <PageHeader
          title={`${title} Instrument Template`}
          actionButtonText="Delete Template"
          actionHandler={copy ? undefined : deleteInstrument}
        />
      );
    }

    return <PageHeader title="Instrument Template" />;
  }

  const renderInstrumentDropdown = (props: LookupContextInterface) => {
    const { findKey } = props;
    if (findKey) {
      return findKey(lookups.recommendedApplicationsLookUp).map((lookup: LookupItemInterface) => (
        <option key={lookup.value} value={lookup.value}>
          {lookup.text}
        </option>
      ));
    }
  };

  const renderAssessmentList = (assessments: TemplateItem[]) => (
    <React.Fragment>
      <div className="form-header row">
        <div className="col-sm-6">
          <h3 className="m-l-10 p-t-20">
            Assessment Items {formState.templateItems && formState.templateItems.length}
          </h3>
        </div>
        <div className="col-sm-6">
          <Button
            className="mt-3 float-right"
            color="primary"
            size="lg"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Edit Assessment Items
          </Button>
        </div>
      </div>

      <ListCardItems titleKey="definition" listData={assessments} />
    </React.Fragment>
  );

  function renderForm(formikprops: FormikBag) {
    return (
      <Form onSubmit={formikprops.handleSubmit} className="form">
        <PageBody card={true} wrapper={true} className="m-t-15">
          <FormElement
            label="Instrument Name"
            name="title"
            placeholder="Add Name"
            fullLength={true}
            formikprops={formikprops}
          />

          <FormElement
            label="Instrument Application"
            name="recommendedApplicationId"
            fullLength={true}
            formikprops={formikprops}
            type={FormElementTypes.SELECT}
            last={
              defaultValue && defaultValue.templateItems && defaultValue.templateItems.length !== 0 && !!defaultValue
            }
          >
            <option value="">Select One</option>
            <LookupContextConsumer>{renderInstrumentDropdown}</LookupContextConsumer>
          </FormElement>

          {((defaultValue && defaultValue.templateItems && defaultValue.templateItems.length === 0) ||
            !defaultValue) && (
            <div className="row">
              <div className="col-sm-2 col-form-label font-bold">Assessment Items</div>
              <div className="col-sm-10">
                <Button
                  onClick={() => {
                    setModalVisible(true);
                  }}
                  size="lg"
                  color="primary"
                >
                  Add Assessment Items
                </Button>
              </div>
            </div>
          )}
        </PageBody>
        {!!formState &&
          formState.templateItems &&
          !!formState.templateItems.length &&
          renderAssessmentList(formState.templateItems)}
        <div className="form-group row">
          <div className="col-sm-4 col-sm-offset-2">
            <StyledButton
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                history.push('/instrument-templates');
              }}
              color="white"
            >
              Cancel
            </StyledButton>
            <StyledButton color="primary" type="submit">
              {isAdd(match.path) ? 'Save' : 'Save Changes'}
            </StyledButton>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <PageBody>
      {getPageHeader()}
      <Formik initialValues={formState} onSubmit={submitForm}>
        {(formikprops: FormikBag) => renderForm(formikprops)}
      </Formik>

      <ESModal
        title="Add Assessment Items"
        visible={modalVisible}
        toggle={() => setModalVisible(!modalVisible)}
        primaryAction={data => {
          setFormState({
            ...formState,
            templateItems: data,
          });
          setModalVisible(false);
        }}
        primaryText="Add"
        secondaryText="Cancel"
        secondaryAction="dismiss"
        size="lg"
        parentClass="addassessModal"
      >
        <AssessmentItemsList mode="edit" selectedTemplateItems={formState.templateItems} />
      </ESModal>

      <DeleteModal
        visible={deleteModalState.visible}
        id={deleteModalState.id}
        toggle={() =>
          setDeleteModalState({
            id: deleteModalState.id,
            visible: !deleteModalState.visible,
          })
        }
        actionHandler={(id: string) => {
          setDeleteModalState({ id: '', visible: false });
          if (handleDelete) {
            handleDelete(id);
            history.push('/instrument-templates');
          }
        }}
      />
    </PageBody>
  );
};

AddEditInstrumentTemplate.defaultProps = {
  copy: false,
};

export default withRouter(AddEditInstrumentTemplate);
