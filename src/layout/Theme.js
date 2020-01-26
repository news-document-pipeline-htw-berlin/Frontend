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
        fontFamily: ['Raleway', 'Arial', 'sans-serif'].join(',')
    },
    overrides: {
        MuiTypography: {
            subtitle2: {
                fontWeight: 700,
                lineHeight: 1.75,
                lineSpacing: '0.02857em',
                textTransform: 'uppercase'
            },
            button: {
                fontWeight: 700,
                letterSpacing: '0.08em'
            }
        },
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
            },
            colorPrimary: {
                backgroundColor: '#009688'
            },
            colorSecondary: {
                backgroundColor: '#960094'
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
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#373A48',
                paddingTop: 20,
                paddingLeft: 20
            }
        },
        MuiAppBar: {
            colorDefault: {
                backgroundColor: '#fff',
                color: '#000'
            }
        },
        MuiButton: {
            outlined: {
                '&:hover': {
                    backgroundColor: '#373A48',
                    color: '#fff'
                }
            }
        }
    }
});

export default theme;
