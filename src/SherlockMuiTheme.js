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
        },
        colors: {
            MI_MAGENTA: 'rgba(236, 1, 106, 1)',
            MI_ORANGE: 'rgba(255, 132, 36, 1)',
            MI_TEAL: 'rgba(0, 169, 190, 1)',
            MI_YELLOW: 'rgba(235, 181, 37, 1)'
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