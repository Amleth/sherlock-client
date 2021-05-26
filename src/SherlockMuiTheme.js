import { createTheme } from '@material-ui/core/styles'

export default createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            a {
                color: turquoise !important;
                text-decoration: none !important;
                transition: all 0.5s !important;
                white-space: nowrap !important;
            }
            
            a:hover {
                color: deeppink !important;
                cursor: default !important;
                transition: all 0s !important;
            }
          `,
        },
    },
    palette: {
        mode: 'dark',
        background: {
            default: 'black'
        }
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: 'Jost',
        fontFamilyMonospaced: 'Fira Code'
    }
})