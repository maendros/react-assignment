import React from 'react';
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
  EsaButton
} from '../layouts/components';
import Plot from 'react-plotly.js';
import { fetchWellborePlots } from '../services/services';
import {
  updateWellBoreSelectedWells,
  updateWellBoreSelectedLogs,
  updateWellBoreSelectedFormations
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
    minHeight: 880,
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
export default function Wellbore({ dataState }) {
  const classes = useStyles();
  const state = useSelector(state => state.state, shallowEqual);
  const dispatch = useDispatch();

  return (
    <Dashboard>
      {!dataState.dataPending && (
        <Grid item xs={12} container spacing={4}>
          <Grid item xs={2}>
            <Portlet>
              <PortletHeader className={classes.header}>
                <PortletLabel title="Wells" />
                <PortletToolbar>
                  <MoreVertIcon />
                </PortletToolbar>
              </PortletHeader>

              <PortletContent className={classes.portletContent} noPadding>
                <EsaList
                  defaultSelectedValues={state.wellBore.selectedWells}
                  listOptions={[...dataState.wells]}
                  listItemName="name"
                  onChangeSelect={value => dispatch(updateWellBoreSelectedWells(value))}
                />
              </PortletContent>
            </Portlet>
          </Grid>
          <Grid item xs={2}>
            <Portlet>
              <PortletHeader className={classes.header}>
                <PortletLabel title="Logs" />
                <PortletToolbar>
                  <MoreVertIcon />
                </PortletToolbar>
              </PortletHeader>

              <PortletContent className={classes.portletContent} noPadding>
                <EsaList
                  defaultSelectedValues={state.wellBore.selectedLogs}
                  listOptions={[...dataState.logs]}
                  listItemName="log"
                  onChangeSelect={value => dispatch(updateWellBoreSelectedLogs(value))}
                />
              </PortletContent>
            </Portlet>
          </Grid>
          <Grid item xs={2}>
            <Portlet>
              <PortletHeader className={classes.header}>
                <PortletLabel title="Formations" />
                <PortletToolbar>
                  <MoreVertIcon />
                </PortletToolbar>
              </PortletHeader>

              <PortletContent className={classes.portletContent} noPadding minHeight={785}>
                <EsaList
                  defaultSelectedValues={state.wellBore.selectedFormations}
                  listOptions={[...dataState.formations]}
                  listItemName="name"
                  onChangeSelect={value => dispatch(updateWellBoreSelectedFormations(value))}
                />
              </PortletContent>
            </Portlet>
            <PortletContent>
              <EsaButton
                loading={state.wellBore.plotsPending}
                fullWidth
                className={classes.button}
                isDisabled={areThereNotSelectedValues(
                  state.wellBore.selectedWells,
                  state.wellBore.selectedLogs,
                  state.wellBore.selectedFormations
                )}
                onClick={() =>
                  dispatch(
                    fetchWellborePlots(createQueryFromSelectedWells(state.wellBore.selectedWells))
                  )
                }
              >
                Show Plot
              </EsaButton>
            </PortletContent>
          </Grid>
          {state.wellBore.plots.length > 0 &&
            !areThereNotSelectedValues(
              state.wellBore.selectedWells,
              state.wellBore.selectedLogs,
              state.wellBore.selectedFormations
            ) && (
              <Grid item xs={6}>
                <Portlet>
                  <PortletContent>
                    <Plot
                      data={[...state.wellBore.plots]}
                      layout={{ width: 920, height: 880, title: 'Wells Plot' }}
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
