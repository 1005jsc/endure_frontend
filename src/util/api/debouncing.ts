const applyDebouncing = (callback: () => any, millisecond: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(callback());
    }, millisecond);
  });
};
export default applyDebouncing;
