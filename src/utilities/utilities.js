export const createQueryFromSelectedWells = ([...arr]) => {
  return arr
    .map(item => {
      return 'wellId=' + item;
    })
    .join('&');
};


export const areThereNotSelectedValues = (...arg) => {
    return (
        arg[0].length < 1 ||
        arg[1].length < 1 ||
        arg[2].length < 1
    );
  };
