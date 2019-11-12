import * as types from '../types';
import {
  ACTION_LOAD,
  ACTION_LOAD_SUCCESS,
  ACTION_LOAD_FAIL,
  ACTION_LOAD_WELLBORE_PLOTS,
  ACTION_LOAD_WELLBORE_PLOTS_SUCCESS,
  ACTION_LOAD_WELLBORE_PLOTS_FAIL,
  ACTION_UPDATE_WELLBORE_SELECTED_WELLS,
  ACTION_UPDATE_WELLBORE_SELECTED_LOGS,
  ACTION_UPDATE_WELLBORE_SELECTED_FORMATIONS,
  ACTION_LOAD_HISTOGRAM_PLOTS,
  ACTION_LOAD_HISTOGRAM_PLOTS_SUCCESS,
  ACTION_LOAD_HISTOGRAM_PLOTS_FAIL,
  ACTION_UPDATE_HISTOGRAM_SELECTED_WELLS,
  ACTION_UPDATE_HISTOGRAM_SELECTED_LOGS,
  ACTION_UPDATE_HISTOGRAM_SELECTED_FORMATIONS
} from '../types';

const INITIAL_STATE = {
  dataPending: false,
  wells: [],
  logs: [],
  formations: [],
  dataError: null,
  wellBore: {
    selectedWells: [],
    selectedLogs: [],
    selectedFormations: [],
    plots: [],
    plotsPending: false,
    plotsError: null
  },
  histogram: {
    selectedWells: [],
    selectedLogs: [],
    selectedFormations: [],
    plots: [],
    plotsPending: false,
    plotsError: null
  }
};

const setAction = (state, { payload }) => ({
  ...state,
  payload
});

const loadAction = (state, { payload }) => ({
  ...state,
  dataPending: true
});
const loadActionSuccess = (state, { payload }) => ({
  ...state,
  dataPending: false,
  wells: [...payload[0]],
  logs: [...payload[1]],
  formations: [...payload[2]]
});
const loadActionFail = (state, { error }) => ({
  ...state,
  dataPending: false,
  dataError: error
});
const loadWellborePlotsAction = (state, { payload }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    plotsPending: true
  }
});
const loadWellborePlotsActionSuccess = (state, { payload }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    plots: [...payload.map(obj => ({ ...obj, type: 'scatter' }))],

    plotsPending: false
  }
});
const loadWellborePlotsActionFail = (state, { error }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    plotsPending: false,
    plotsError: error
  }
});

const updateWellBoreSelectedWells = (state, { payload }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    selectedWells: [...payload]
  }
});
const updateWellBoreSelectedLogs = (state, { payload }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    selectedLogs: [...payload]
  }
});
const updateWellBoreSelectedFormations = (state, { payload }) => ({
  ...state,
  wellBore: {
    ...state.wellBore,
    selectedFormations: [...payload]
  }
});

const loadHistogramPlotsAction = (state, { payload }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    plotsPending: true
  }
});
const loadHistogramPlotsActionSuccess = (state, { payload }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    plots: [...payload.map(obj => ({ ...obj, type: 'histogram', orientation: 'v' }))],

    plotsPending: false
  }
});
const loadHistogramPlotsActionFail = (state, { error }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    plotsPending: false,
    plotsError: error
  }
});

const updateHistogramSelectedWells = (state, { payload }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    selectedWells: [...payload]
  }
});
const updateHistogramSelectedLogs = (state, { payload }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    selectedLogs: [...payload]
  }
});
const updateHistogramSelectedFormations = (state, { payload }) => ({
  ...state,
  histogram: {
    ...state.histogram,
    selectedFormations: [...payload]
  }
});

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ACTIONS:
      return setAction(state, action);

    case ACTION_LOAD:
      return loadAction(state, action);
    case ACTION_LOAD_SUCCESS:
      return loadActionSuccess(state, action);
    case ACTION_LOAD_FAIL:
      return loadActionFail(state, action);
    case ACTION_LOAD_WELLBORE_PLOTS:
      return loadWellborePlotsAction(state, action);
    case ACTION_LOAD_WELLBORE_PLOTS_SUCCESS:
      return loadWellborePlotsActionSuccess(state, action);
    case ACTION_LOAD_WELLBORE_PLOTS_FAIL:
      return loadWellborePlotsActionFail(state, action);

    case ACTION_UPDATE_WELLBORE_SELECTED_WELLS:
      return updateWellBoreSelectedWells(state, action);
    case ACTION_UPDATE_WELLBORE_SELECTED_LOGS:
      return updateWellBoreSelectedLogs(state, action);
    case ACTION_UPDATE_WELLBORE_SELECTED_FORMATIONS:
      return updateWellBoreSelectedFormations(state, action);
    case ACTION_LOAD_HISTOGRAM_PLOTS:
      return loadHistogramPlotsAction(state, action);
    case ACTION_LOAD_HISTOGRAM_PLOTS_SUCCESS:
      return loadHistogramPlotsActionSuccess(state, action);
    case ACTION_LOAD_HISTOGRAM_PLOTS_FAIL:
      return loadHistogramPlotsActionFail(state, action);

    case ACTION_UPDATE_HISTOGRAM_SELECTED_WELLS:
      return updateHistogramSelectedWells(state, action);
    case ACTION_UPDATE_HISTOGRAM_SELECTED_LOGS:
      return updateHistogramSelectedLogs(state, action);
    case ACTION_UPDATE_HISTOGRAM_SELECTED_FORMATIONS:
      return updateHistogramSelectedFormations(state, action);
    default:
      return state;
  }
};

export default actionsReducer;
