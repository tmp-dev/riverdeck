import React, { useState } from 'react';
import '@fontsource/roboto';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/Routers/main.router';
import { ThemeWrapper } from './components/Wrappers/theme.wrapper';

export default function Application() {
  return (
    <ThemeWrapper>
      <CssBaseline />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeWrapper>
  );
}
