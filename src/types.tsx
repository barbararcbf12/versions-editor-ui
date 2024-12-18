export type Option = {
  id: number;
  name: string;
  operator?: string;
  mathOperator?: string | string[];
};

export type Version = {
  option: Option | null;
  value: string;
};

export type IntervalValue = {
  start: string;
  end: string;
};
