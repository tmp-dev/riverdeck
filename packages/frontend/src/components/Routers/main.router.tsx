import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClientRouter from './client.router';
import ServerRouter from './server.router';
import SetupRouter from './setup.router';

export const setup = '/setup';
export const server = '/server';
export const client = '/client';

export default function MainRouter () {
  return (
    <Switch>
      <Route path={setup}>
        <SetupRouter/>
      </Route>
      <Route path={server}>
        <ServerRouter/>
      </Route>
      <Route path={client}>
        <ClientRouter/>
      </Route>
    </Switch>
  )
}