import { CssBaseline, MuiThemeProvider, Theme, ThemeProvider } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { darkTheme } from '../../themes/dark.theme';
import { lightTheme } from '../../themes/light.theme';

const themes = {
  light: lightTheme,
  dark: darkTheme
};

export const DARK_THEME: ThemeName = 'dark';
export const LIGHT_THEME: ThemeName = 'light';
export type ThemeName = 'light' | 'dark';
export const getTheme = (theme: ThemeName) => themes[theme];
export const ThemeContext = React.createContext({
  themeName: 'dark',
  setThemeName: (name: ThemeName) => {}
});

export const ThemeWrapper: FC<{}> = ({ children }) => {
  let currentThemeName = localStorage.getItem('activeTheme') ?? 'dark';

  const [themeName, _setThemeName] = useState(currentThemeName);

  let theme = darkTheme;
  if (themeName === 'light' || themeName === 'dark') {
    theme = getTheme(themeName);
  }

  const setThemeName = (name: ThemeName) => {
    localStorage.setItem('activeTheme', name);
    _setThemeName(name);
  };

  const contextValue = {
    themeName: themeName,
    setThemeName: setThemeName
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
