export const initialState = {
  assessmentType: 'rubricval',
  categorySelected: '',
  competency: '',
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
  expstatement: [{ statement: '' }],
  expBehaviour: [{ behaviour: '' }],
  expstatementList: {},
  entityCheckedAll: false,
  fathSelected: '',
  itemElementOptions: [
    {
      value: 1,
      title: 'Unsatisfactory',
      statement: 'ali',
      behaviur: '',
      scaling: '',
    },
    {
      value: 2,
      title: 'Marginal',
      statement: 'ali',
      behaviur: '',
      scaling: '',
    },
    {
      value: 3,
      title: 'Competent',
      statement: 'ali',
      behaviur: '',
      scaling: '',
    },
    {
      value: 4,
      title: 'Excellent',
      statement: 'ali',
      behaviur: '',
      scaling: '',
    },
    {
      value: 5,
      title: 'Exceptional',
      statement: 'ali',
      behaviur: '',
      scaling: '',
    },
  ],
  itemElements: [],
  lists: {},
  recommendAppCorporate: false,
  recommendAppHigher: false,
  typeSelected: 'influval',
  usage: '',
  validateArray: {},
};
