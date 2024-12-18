import { MAX_VERSION_VALUE, MIN_VERSION_VALUE } from "../constants/versionsThresholds";
import { Version } from "../types";

export function parseVersionRange(version: Version): { start: string, end: string, inclusiveStart: boolean, inclusiveEnd: boolean } {
  const { value, option } = version;
  const mathOp = option?.mathOperator;

  if (option?.name === 'equal =') {
    return { start: value, end: value, inclusiveStart: true, inclusiveEnd: true };
  } else if (option?.name === 'greater than >' || option?.name === 'greater or equal ≥') {
    return { start: value, end: MAX_VERSION_VALUE, inclusiveStart: option.name === 'greater or equal ≥', inclusiveEnd: false };
  } else if (option?.name === 'less than <' || option?.name === 'less or equal ≤') {
    return { start: MIN_VERSION_VALUE, end: value, inclusiveStart: true, inclusiveEnd: option.id === 5 };
  } else if (option?.name === 'between including []' || option?.name === 'between excluding ][' || option?.name === 'between including and excluding [[') {
    const [start, end] = value.split(' - ').map(v => v.trim());
    if (option?.name === 'between including []') {
      return { start, end, inclusiveStart: true, inclusiveEnd: true };
    } else if (option?.name === 'between excluding ][') {
      return { start, end, inclusiveStart: false, inclusiveEnd: false };
    } else if (option?.name === 'between including and excluding [[') {
      return { start, end, inclusiveStart: true, inclusiveEnd: false };
    }
  }

  throw new Error(`Unsupported operator: ${mathOp}`);
}