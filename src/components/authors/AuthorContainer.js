import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Skeleton from '@material-ui/lab/Skeleton';
import AuthorInfo from './AuthorInfo';
import WordCount from './WordCount';
import Departments from './Departments';
import Days from './Days';
import { useAuthor } from '../../hooks/useAuthors';
import SearchAuthors from './SearchAuthors';
import Authors from './Authors';

export default function AuthorContainer() {
    const [id, setId] = useState();
    const [author, setAuthor] = useAuthor(id);

    return (
        <div>
            <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
                <SearchAuthors setId={setId} />
            </Grid>

            {(author !== null && JSON.stringify(author) !== '{}' && (
                <Authors author={author} />
            )) ||
                (id !== null && (
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Alert severity="info">No results for {id}.</Alert>
                    </Grid>
                ))}
        </div>
    );
}
