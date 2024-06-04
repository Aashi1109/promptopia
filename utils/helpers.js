export const createQueryString = (searchParams, name, value) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const removeQueryString = (searchParams, name) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);

  return params.toString();
};
