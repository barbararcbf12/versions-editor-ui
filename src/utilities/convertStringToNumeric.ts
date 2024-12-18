export const convertStringToNumeric = (version: string) => {
  return version
    .split('.')
    .map((part) => part.padStart(3, '0')) // Pad each part to 3 digits
    .join(''); // Concatenate into a single string
};