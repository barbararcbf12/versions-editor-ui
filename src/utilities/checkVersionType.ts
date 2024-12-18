import type { Version } from "../types";

const MAX_TEST_VERSION_VALUE = 999;
const MIN_TEST_VERSION_VALUE = 0;

export const isTestVersion = (version: Version) => {
  const versionNumberParts = version.value.split('.');
  return Number(versionNumberParts[0]) === MAX_TEST_VERSION_VALUE && (Number(versionNumberParts[1]) > MIN_TEST_VERSION_VALUE || Number(versionNumberParts[2]) > MIN_TEST_VERSION_VALUE);
}