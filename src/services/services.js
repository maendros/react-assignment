import {
  fetchAction,
  fetchSuccess,
  fetchFail,
  fetchWellborePlotsAction,
  fetchWellborePlotsSuccess,
  fetchWellborePlotsFail,
  fetchHistogramPlotsAction,
  fetchHistogramPlotsSuccess,
  fetchHistogramPlotsFail
} from '../store/actions/actions';

const api = 'http://localhost:8000';

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const fetchData = () => {
  return dispatch => {
    dispatch(fetchAction());
    const fetchWells = fetch(`${api}/wells`, { headers }).then(res => res.json());
    const fetchLogs = fetch(`${api}/logs`, { headers }).then(res => res.json());
    const fetchFormations = fetch(`${api}/formations`, { headers }).then(res => res.json());
    Promise.all([fetchWells, fetchLogs, fetchFormations])
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchFail(err)));
  };
};

export const fetchWellborePlots = params => {
  return dispatch => {
    dispatch(fetchWellborePlotsAction());
    fetch(`${api}/plots?${params}`, { headers })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchWellborePlotsSuccess(res));
        return res.wells;
      })
      .catch(error => {
        dispatch(fetchWellborePlotsFail(error));
      });
  };
};

export const fetchHistogramPlots = params => {
  return dispatch => {
    dispatch(fetchHistogramPlotsAction());
    fetch(`${api}/plots?${params}`, { headers })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchHistogramPlotsSuccess(res));
        return res.wells;
      })
      .catch(error => {
        dispatch(fetchHistogramPlotsFail(error));
      });
  };
};
