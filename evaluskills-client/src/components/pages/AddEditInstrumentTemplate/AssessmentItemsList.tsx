import React, { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uniq } from 'lodash-es';

import { PageDetailsInterface } from '../../../api/ResponseInterface';
import ErrorContext from '../../../context/ErrorContext';
import ModalContext from '../../../context/ModalContext';
import LookupContext from '../../../modules/Lookup/context';
import { lookups } from '../../../modules/Lookup/enum';
import { getAssessments } from '../../../services/assessmentsService';
import Spinner from '../../atoms/Spinner';
import Pager from '../../molecules/Pager';
import ListCardItems from '../../organisms/ListCardItems';

interface Props {
  mode: 'new' | 'edit';
  selectedTemplateItems?: any[];
}

interface State {
  isLoading: boolean;
  filters: any;
  pageDetails?: PageDetailsInterface;
  templateItems: any[];
  shouldReset: boolean;
}

const AssessmentItemsList: React.FunctionComponent<Props> = ({ mode, selectedTemplateItems }) => {
  const errorContext = useContext(ErrorContext);
  const lookupContext = useContext(LookupContext);
  const modalContext = useContext(ModalContext);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const [dropdownState, setDropdownState] = useState({
    Search: '',
    categoryId: '',
    competencyId: '',
    isFaithBased: false,
    typeId: '',
  });

  const [state, setState] = useState<State>({
    filters: {
      PageNumber: 1,
      PageSize: 10,
    },
    isLoading: false,
    pageDetails: {
      currentPage: 1,
      pageSize: 25,
      totalCount: 10,
    },
    shouldReset: false,
    templateItems: [],
  });

  useEffect(() => {
    fetchAssessments();
  }, [state.filters]);

  function markChecked(id: string) {
    if (checkedItems.indexOf(id) > -1) {
      // remove already selected
      const index = checkedItems.indexOf(id);
      checkedItems.splice(index, 1);
      setCheckedItems(checkedItems);
    } else {
      // check assessment
      const newChecked = [...checkedItems];
      newChecked.push(id);
      setCheckedItems(newChecked);
    }

    // find full object
    const assessmentObject = state.templateItems.find(templateItem => {
      return templateItem.id === id;
    });

    // create a new array and push it
    let allSelectedAssessments = [];
    allSelectedAssessments.push(assessmentObject);

    if (modalContext.setModalState) {
      if (modalContext.modalState && modalContext.modalState.length) {
        allSelectedAssessments = allSelectedAssessments.concat(modalContext.modalState);
      }
      modalContext.setModalState(allSelectedAssessments);
    }
  }

  async function fetchAssessments() {
    setState({ ...state, isLoading: true });
    try {
      const { data, pageDetails } = await getAssessments(state.filters);
      if (selectedTemplateItems && selectedTemplateItems.length) {
        const foundItems: string[] = [];
        selectedTemplateItems.forEach(item => {
          const matched = data.find(assessment => {
            return item.id === assessment.id;
          });
          if (matched) {
            foundItems.push(matched.id);
          }
        });
        setCheckedItems(foundItems);
      }
      setState({
        ...state,
        pageDetails,
        shouldReset: false,
        templateItems: data,
      });
    } catch (e) {
      errorContext.setError(e, true);
      setState({ ...state, isLoading: false });
    }
  }

  function applyFilter(filters: any) {
    const newFilters = {
      ...state,
      filters: {
        ...state.filters,
        ...filters,
      },
      shoudReset: true,
    };
    setState(newFilters);
  }

  function handleDropdownChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setDropdownState({
      ...dropdownState,
      [event.target.name]: event.target.value,
    });
  }

  if (state.isLoading) {
    return <Spinner lightBg={true} />;
  }

  return (
    <React.Fragment>
      <div className="assessmentModalheader p-l-15 d-flex">
        <label className="col-form-label p-l-15 p-r-5">Search:</label>
        <select
          className="form-control col-sm-2"
          name="typeId"
          value={dropdownState.typeId}
          onChange={handleDropdownChange}
        >
          <option>type</option>
          {lookupContext.findKey &&
            lookupContext.findKey(lookups.assessmentTypesLookUp).map(type => (
              <option value={type.value} key={type.value}>
                {type.text}
              </option>
            ))}
        </select>
        <select
          className="form-control col-sm-2"
          name="competencyId"
          value={dropdownState.competencyId}
          onChange={handleDropdownChange}
        >
          <option>Competency</option>
          {lookupContext.findKey &&
            lookupContext.findKey(lookups.competenciesLookUp).map(type => (
              <option value={type.value} key={type.value}>
                {type.text}
              </option>
            ))}
        </select>
        <select
          className="form-control col-sm-2"
          name="categoryId"
          value={dropdownState.categoryId}
          onChange={handleDropdownChange}
        >
          <option>Category</option>
          {lookupContext.findKey &&
            lookupContext.findKey(lookups.categoriesLookUp).map(type => (
              <option value={type.value} key={type.value}>
                {type.text}
              </option>
            ))}
        </select>
        <select
          className="form-control col-sm-2"
          name="isFaithBased"
          value={dropdownState.isFaithBased.toString()}
          onChange={handleDropdownChange}
        >
          <option>Faith Base</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <div className="last d-flex">
          <input
            type="text"
            className="form-control col-sm-10 wCustom m-r-10"
            name="Search"
            value={dropdownState.Search}
            placeholder="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDropdownState({ ...dropdownState, [e.target.name]: e.target.value });
            }}
          />
          <button className="btn btn-outline btn-primary" type="button" onClick={() => applyFilter(dropdownState)}>
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
      </div>

      <div className="m-t-20">
        <ListCardItems
          checkbox={true}
          titleKey="definition"
          listData={state.templateItems}
          handleCheckbox={markChecked}
          checkedItems={checkedItems}
        />
      </div>
      {state.pageDetails && (
        <Pager
          shouldReset={state.shouldReset}
          pageNumber={state.pageDetails.currentPage}
          pageSize={state.pageDetails.pageSize}
          totalRecords={state.pageDetails.totalCount || 0}
          onPageChanged={(PageNumber: number) => {
            applyFilter({ PageNumber });
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AssessmentItemsList;
