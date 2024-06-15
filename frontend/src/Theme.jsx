import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#e60049',
        },
        secondary: {
            main: '#000000',
        },

        greys: {
            light: '#373737',
            primary: '#282c34',
            secondary: '#323232'
        },

        text: {
            primary: '#000000',
            secondary: '#ffffff',
            light: '#565656'
        },

        blacks: {
            dark: '#222222',
            light: '#292929',
            primary: '#000000'
        },

        placeholder: {
            primary: '#8E8E8E'
        },

        cream: {
            primary: '#EEEEEE'
        }
    },

    components: {
        MuiPaginationItem: {
            styleOverrides: {
              root: {
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'primary',
                  color: 'white',
                },
              },
            },
          },
    }
});

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default Theme;