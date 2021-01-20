/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-spread */
/* eslint-disable no-plusplus */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Typography } from '@material-ui/core';

import Score from './Score';

/**
 * A card containing general information about given author.
 * @param {*} props author
 */
export default function AuthorInfo(props) {
    const { author } = props;
    const [favDep, setFavDep] = useState('');

    useEffect(() => {
        let res = '';
        let count = 0;
        const max = Math.max.apply(
            Math,
            author.perDepartment.map(function(o) {
                return o._2;
            })
        );
        author.perDepartment.forEach(dep => {
            if (dep._2 === max) {
                const comma = count > 0 ? ',' : '';
                res = `${res + comma} ${dep._1}`;
                count++;
            }
        });
        setFavDep(res);
    }, [author]);

    return (
        <Card
            variant="outlined"
            style={{ width: '20vw', minHeight: '70%', margin: '0' }}
        >
            <CardContent>
                <Typography color="textSecondary">Name</Typography>
                <Typography variant="h5" gutterBottom>
                    {author._id}
                </Typography>
                <Typography color="textSecondary">Occupation</Typography>
                <Typography variant="h5" gutterBottom>
                    -
                </Typography>
                <Typography color="textSecondary">
                    Favourite Department
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {(favDep !== '' && favDep) || 'None'}
                </Typography>
                <Typography color="textSecondary">Score</Typography>
                <Score score={author.score} />
            </CardContent>
        </Card>
    );
}

AuthorInfo.propTypes = {
    author: PropTypes.object.isRequired
};
