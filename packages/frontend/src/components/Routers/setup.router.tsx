import { Typography } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ThemeSwitcherButton from '../Buttons/theme-switcher.button';

export const deviceName = '/';

export default function SetupRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url + deviceName}>
        <Typography>Device name</Typography>
        <ThemeSwitcherButton />
      </Route>
    </Switch>
  );
}
