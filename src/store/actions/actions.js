import * as types from '../types';
export const setAction = payload => ({
  type: types.ACTIONS,
  payload
});


export const fetchAction = ()=> {
  return {
      type: types.ACTION_LOAD
  }
};

export const fetchSuccess = payload => {
  return {
      type: types.ACTION_LOAD_SUCCESS,
      payload
  }
}

export const fetchFail= error => {
  return {
      type: types.ACTION_LOAD_FAIL,
      error: error
  }
}

export const fetchWellborePlotsAction = ()=> {
  return {
      type: types.ACTION_LOAD_WELLBORE_PLOTS
  }
};

export const fetchWellborePlotsSuccess = payload => {
  return {
      type: types.ACTION_LOAD_WELLBORE_PLOTS_SUCCESS,
      payload
  }
}

export const fetchWellborePlotsFail= error => {
  return {
      type: types.ACTION_LOAD_WELLBORE_PLOTS_FAIL,
      error: error
  }
}

export const updateWellBoreSelectedWells= payload => {
  return {
      type: types.ACTION_UPDATE_WELLBORE_SELECTED_WELLS,
      payload
  }
}
export const updateWellBoreSelectedLogs= payload => {
  return {
      type: types.ACTION_UPDATE_WELLBORE_SELECTED_LOGS,
      payload
  }
}
export const updateWellBoreSelectedFormations= payload => {
  return {
      type: types.ACTION_UPDATE_WELLBORE_SELECTED_FORMATIONS,
      payload
  }
}

export const fetchHistogramPlotsAction = ()=> {
  return {
      type: types.ACTION_LOAD_HISTOGRAM_PLOTS
  }
};

export const fetchHistogramPlotsSuccess = payload => {
  return {
      type: types.ACTION_LOAD_HISTOGRAM_PLOTS_SUCCESS,
      payload
  }
}

export const fetchHistogramPlotsFail= error => {
  return {
      type: types.ACTION_LOAD_HISTOGRAM_PLOTS_FAIL,
      error: error
  }
}

export const updateHistogramSelectedWells= payload => {
  return {
      type: types.ACTION_UPDATE_HISTOGRAM_SELECTED_WELLS,
      payload
  }
}
export const updateHistogramSelectedLogs= payload => {
  return {
      type: types.ACTION_UPDATE_HISTOGRAM_SELECTED_LOGS,
      payload
  }
}
export const updateHistogramSelectedFormations= payload => {
  return {
      type: types.ACTION_UPDATE_HISTOGRAM_SELECTED_FORMATIONS,
      payload
  }
}