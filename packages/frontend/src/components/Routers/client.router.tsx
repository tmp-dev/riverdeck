import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export const deviceName = '/';

export default function ClientRouter () {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url + deviceName}>
        <h1>River deck</h1>
      </Route>
    </Switch>
  )
}