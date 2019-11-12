import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import EarthNet from './earthnet/EarthNet';
import Wellbore from './earthnet/Wellbore';
import Histogram from './earthnet/Histogram';
import { fetchData } from './services/services';

function App() {
  const state = useSelector(state => state.state, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <Switch>
        <Route path="/wellbore/" exact render={() => <Wellbore dataState={{ ...state }} />} />
        <Route path="/histogram/" exact render={() => <Histogram dataState={{ ...state }} />} />
        <Route component={EarthNet} />
      </Switch>
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({ state });
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
