import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dashboard from '../layouts/Dashboard/Dashboard';
import { makeStyles, Grid } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletToolbar,
  EsaList,
  EsaButton,
  EsaPaper,
  EsaSelect
} from '../layouts/components';
import Plot from 'react-plotly.js';
import { fetchHistogramPlots } from '../services/services';
import {
  updateHistogramSelectedWells,
  updateHistogramSelectedLogs,
  updateHistogramSelectedFormations
} from '../store/actions/actions';
import { createQueryFromSelectedWells, areThereNotSelectedValues } from '../utilities/utilities';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullHeight: { height: '100%' },
  paper: {
    padding: theme.spacing(3)
  },
  button: { marginTop: theme.spacing(3) },
  logoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& svg': {
      width: '30%'
    }
  },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  headerLabel: {
    '& .MuiTypography-root': {
      fontSize: '12px',
      fontWeight: 800
    }
  },
  portletContent: {
    height: 0,
    minHeight: 780,
    display: 'flex',
    flexDirection: 'column'
  },
  listItem: {
    cursor: 'pointer',
    justifyContent: ' space-between',
    '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
      backgroundColor: 'rgba(41, 150, 243, .3)'
    },
    '&:hover, &.Mui-selected,&.Mui-selected:hover': {
      backgroundColor: theme.palette.default.light
    },
    '&::selection': { backgroundColor: 'transparent' }
  }
});
const useStyles = makeStyles(styles);
export default function Histogram({ dataState }) {
  const classes = useStyles();
  const state = useSelector(state => state.state, shallowEqual);
  const dispatch = useDispatch();
  const [barModeValue, onChangeBarModeValue] = useState('group');
  const [orientationValue, onChangeOrientationValue] = useState('v');
  const [plots, setPlots] = useState([]);

  const updateOrientation = value => {
    onChangeOrientationValue(value);
    setPlots([...plots.map(obj => ({ ...obj, orientation: value }))]);
  };

  useEffect(() => {
    setPlots([...state.histogram.plots]);
  }, [setPlots, state.histogram.plots]);

  return (
    <Dashboard>
      {!dataState.dataPending && (
        <Grid container spacing={3} className={classes.fullHeight}>
          <Grid item xs={12} md={6} container spacing={1}>
            <Grid item xs={12} container spacing={3}>
              <Grid item xs={12} >
                <Portlet>
                  <EsaPaper className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <EsaSelect
                          label="Bar Mode"
                          value={barModeValue}
                          options={[
                            { key: 'one', value: 'group', text: 'group' },
                            { key: 'two', value: 'stack', text: 'stack' }
                          ]}
                          onChange={value => onChangeBarModeValue(value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <EsaSelect
                          label="Orientation"
                          value={orientationValue}
                          options={[
                            { key: 'one', value: 'v', text: 'Vertical' },
                            { key: 'two', value: 'h', text: 'Horizontal' }
                          ]}
                          onChange={updateOrientation}
                        />
                      </Grid>
                    </Grid>
                  </EsaPaper>
                </Portlet>
              </Grid>
              <Grid item xs={12} container spacing={3}>
                <Grid item xs={4}>
                  <Portlet>
                    <PortletHeader className={classes.header}>
                      <PortletLabel title="Wells" />
                      <PortletToolbar>
                        <MoreVertIcon />
                      </PortletToolbar>
                    </PortletHeader>

                    <PortletContent className={classes.portletContent} noPadding>
                      <EsaList
                        defaultSelectedValues={state.histogram.selectedWells}
                        listOptions={[...dataState.wells]}
                        listItemName="name"
                        onChangeSelect={value => dispatch(updateHistogramSelectedWells(value))}
                      />
                    </PortletContent>
                  </Portlet>
                </Grid>
                <Grid item xs={4}>
                  <Portlet>
                    <PortletHeader className={classes.header}>
                      <PortletLabel title="Logs" />
                      <PortletToolbar>
                        <MoreVertIcon />
                      </PortletToolbar>
                    </PortletHeader>

                    <PortletContent className={classes.portletContent} noPadding>
                      <EsaList
                        defaultSelectedValues={state.histogram.selectedLogs}
                        listOptions={[...dataState.logs]}
                        listItemName="log"
                        onChangeSelect={value => dispatch(updateHistogramSelectedLogs(value))}
                      />
                    </PortletContent>
                  </Portlet>
                </Grid>
                <Grid item xs={4}>
                  <Portlet>
                    <PortletHeader className={classes.header}>
                      <PortletLabel title="Formations" />
                      <PortletToolbar>
                        <MoreVertIcon />
                      </PortletToolbar>
                    </PortletHeader>

                    <PortletContent className={classes.portletContent} noPadding minHeight={685}>
                      <EsaList
                        defaultSelectedValues={state.histogram.selectedFormations}
                        listOptions={[...dataState.formations]}
                        listItemName="name"
                        onChangeSelect={value => dispatch(updateHistogramSelectedFormations(value))}
                      />
                    </PortletContent>
                  </Portlet>
                  <PortletContent>
                    <EsaButton
                      loading={state.histogram.plotsPending}
                      fullWidth
                      className={classes.button}
                      isDisabled={areThereNotSelectedValues(
                        state.histogram.selectedWells,
                        state.histogram.selectedLogs,
                        state.histogram.selectedFormations
                      )}
                      onClick={() =>
                        dispatch(
                          fetchHistogramPlots(
                            createQueryFromSelectedWells(state.histogram.selectedWells)
                          )
                        )
                      }
                    >
                      Show Plot
                    </EsaButton>
                  </PortletContent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {state.histogram.plots.length > 0 &&
            !areThereNotSelectedValues(
              state.histogram.selectedWells,
              state.histogram.selectedLogs,
              state.histogram.selectedFormations
            ) && (
              <Grid item xs={12} md={6}>
                <Portlet>
                  <PortletContent>
                    <Plot
                      data={[...plots]}
                      layout={{
                        width: 920,
                        height: 880,
                        title: 'Wells Plot',
                        barmode: barModeValue
                      }}
                    />
                  </PortletContent>
                </Portlet>
              </Grid>
            )}
        </Grid>
      )}
    </Dashboard>
  );
}
