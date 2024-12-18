import type { Option } from "../types";

export const options: Option[] = [
  {id: 1, name: 'equal ='},
  {id: 2, name: 'greater than >', operator: '>', mathOperator: '>'},
  {id: 3, name: 'greater or equal ≥', operator: '≥', mathOperator: '>='},
  {id: 4, name: 'less than <', operator: '<', mathOperator: '<'},
  {id: 5, name: 'less or equal ≤', operator: '≤', mathOperator: '<='},
  {id: 6, name: 'between including []', operator: '[x]', mathOperator: ['>=', '<=']},
  {id: 7, name: 'between excluding ][', operator: ']x[', mathOperator: ['>', '<']},
  {id: 8, name: 'between including and excluding [[', operator: '[x[', mathOperator: ['>=', '<']},
];
