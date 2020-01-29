import React from 'react';
import { Toolbar, Grid, Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { ARTICLES_PER_PAGE } from '../../constants/CommonConstants';

const PopularKeywords = ({ keywords }) => {
    const history = useHistory();
    function handleClick(keyword) {
        history.push({
            pathname: '/articles',
            search: `?${stringify({
                query: keyword,
                page: 1,
                count: ARTICLES_PER_PAGE
            })}`
        });
    }
    return (
        <React.Fragment>
            <Toolbar>
                <Grid container justify="center">
                    {keywords.map(keyword => (
                        <Chip
                            color="default"
                            onClick={() => handleClick(keyword.lemma)}
                            key={keyword.lemma}
                            label={keyword.lemma}
                            clickable
                            variant="outlined"
                        />
                    ))}
                </Grid>
            </Toolbar>
        </React.Fragment>
    );
};

PopularKeywords.propTypes = {
    keywords: PropTypes.array.isRequired
};

export default PopularKeywords;
