import { green, purple } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: purple['500']
    },
    secondary: {
      main: green['A700']
    }
  },
  typography: {
    fontFamily: ['roboto', 'Arial', 'sans-serif'].join(',')
  }
});
