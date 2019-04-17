import { AddAssessmentItemInterface } from '../../../interfaces/AssessmentItem';

export const Initalvalues: AddAssessmentItemInterface = {
  isSystemDefined: false,
  clientId: 2,
  itemsStatusId: '',
  definition: '',
  typeId: 1,
  competencyId: '',
  categoryId: '',
  isFaithBased: '',
  accreditationAlignment: '',
  questionTypeId: 1,
  itemEntities: [''],
  itemRecomendedApplications: [''],
  itemElements: [
    {
      title: 'default',
      itemElementOptions: [
        {
          value: 5,
          title: 'Exceptional',
          statement: '',
          behaviour: '',
          scaling: '',
        },
        {
          value: 4,
          title: 'Excellent',
          statement: '',
          behaviour: '',
          scaling: '',
        },
        {
          value: 3,
          title: 'Competent',
          statement: '',
          behaviour: '',
          scaling: '',
        },
        {
          value: 2,
          title: 'Marginal',
          statement: '',
          behaviour: '',
          scaling: '',
        },
        {
          value: 1,
          title: 'Unsatisfactory',
          statement: '',
          behaviour: '',
          scaling: '',
        },
      ],
    },
  ],
};

export const initialState = {
  assessmentType: 'rubricval',
  categorySelected: '',
  itemsStatusId: 1,
  accreditationAlignment: false,
  questionTypeId: 1,
  itemEntities: [1],
  itemRecomendedApplications: [1],
  categoryId: 1,
  isFaithBased: false,
  clientId: 2,
  definition: 'abc',
  competency: '',
  competencyId: 1,
  typeId: 1,
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
  componenetName: 'Add Assesment Items',
  entitySelect: 0,
  entityCheckedAll: false,
  fathSelected: '',
  elementObject: {
    title: '',
    itemElementOptions: [
      {
        value: 5,
        title: 'Exceptional',
        statement: '',
        behaviour: '',
        scaling: '',
      },
      {
        value: 4,
        title: 'Excellent',
        statement: '',
        behaviour: '',
        scaling: '',
      },
      {
        value: 3,
        title: 'Competent',
        statement: '',
        behaviour: '',
        scaling: '',
      },
      {
        value: 2,
        title: 'Marginal',
        statement: '',
        behaviour: '',
        scaling: '',
      },
      {
        value: 1,
        title: 'Unsatisfactory',
        statement: '',
        behaviour: '',
        scaling: '',
      },
    ],
  },
  itemElements: [
    {
      title: 'default',
      itemElementOptions: [
        {
          value: 5,
          title: 'Unsatisfactory',
          statement: ' ',
          behaviur: '',
          scaling: '',
        },
        {
          value: 4,
          title: 'Marginal',
          statement: ' ',
          behaviur: '',
          scaling: '',
        },
        {
          value: 3,
          title: 'Competent',
          statement: ' ',
          behaviur: '',
          scaling: '',
        },
        {
          value: 2,
          title: 'Excellent',
          statement: ' ',
          behaviur: '',
          scaling: '',
        },
        {
          value: 1,
          title: 'Exceptional',
          statement: ' ',
          behaviur: '',
          scaling: '',
        },
      ],
    },
  ],

  recommendAppCorporate: false,
  recommendAppHigher: false,
  typeSelected: 'influval',
};
