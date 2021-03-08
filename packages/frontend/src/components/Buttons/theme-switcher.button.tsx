import { Button, SvgIcon } from '@material-ui/core';
import React, { useContext } from 'react';
import { DARK_THEME, LIGHT_THEME, ThemeContext } from '../Wrappers/theme.wrapper';
import { Brightness2, WbSunny } from '@material-ui/icons';

export default function ThemeSwitcherButton() {
  const { themeName, setThemeName } = useContext(ThemeContext);

  const isDark = themeName === DARK_THEME;

  const handleClick = () => setThemeName(isDark ? LIGHT_THEME : DARK_THEME);

  return (
    <Button color="primary" onClick={handleClick}>
      {isDark ? <SvgIcon component={WbSunny} /> : <SvgIcon component={Brightness2} />}
    </Button>
  );
}
