import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: purple
    },
    status: {
        danger: 'orange'
    },
    typography: {
        fontFamily: [
            'Raleway Light',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    overrides: {
        MuiCard: {
            root: {
                margin: 40
            }
        },
        MuiCardMedia: {
            root: {
                height: 0,
                paddingTop: '56.25%' // 16:9
            }
        },
        MuiChip: {
            root: {
                margin: 5
            }
        },
        MuiGridList: {
            root: {
                width: 500,
                height: 450
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: '#000'
            }
        }
    }
});

export default theme;
