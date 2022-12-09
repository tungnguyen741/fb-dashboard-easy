const toNumber = (str: number | string) => {
  if (!str) return;

  return parseInt(`${str}`, 10);
};

export default toNumber;
