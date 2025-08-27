export const getPriceQueryParams = (serachParams, key, value) => {
  const hasKeyInSearchParams = serachParams?.has(key);

  if (value && hasKeyInSearchParams) {
    serachParams.set(key, value);
  } else if (value) {
    serachParams.append(key, value);
  } else if (hasKeyInSearchParams) {
    serachParams.delete(key);
  }
  return serachParams;
};
