import { createTheme } from '@material-ui/core/styles'

export default createTheme({
    palette: {
        mode: 'dark',
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: 'Jost',
        fontFamilyMonospaced: 'Fira Code'
    }
})