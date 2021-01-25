import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

export default function getTheme(dark) {
    return createMuiTheme({
        palette: {
            type: dark ? 'dark' : 'light',
            primary: teal
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
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                },
                button: {
                    letterSpacing: '0.06em'
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
                colorDefault: {
                    backgroundColor: '#373A48'
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
                    padding: 20
                }
            },
            MuiAppBar: {
                colorDefault: {
                    backgroundColor: dark ? '#303030' : '#fff',
                    color: dark ? '#fff' : '#000'
                },
                colorPrimary: {
                    backgroundColor: '#373A48',
                    color: '#fff'
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
}
