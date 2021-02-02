/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-spread */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import Score from './Score';
import { wording } from '../common/common';
import { WEBSITES } from '../../constants/Websites';

/**
 * A card containing general information about given author.
 * @param {*} props author
 */
export default function AuthorInfo(props) {
    const { author } = props;
    const [favDep, setFavDep] = useState('-');
    const [occ, setOcc] = useState('-');

    function getOccupation(obj) {
        let max = 0;
        const arr = [];
        for (const [key, value] of Object.entries(obj)) {
            max = value > max ? value : max;
        }
        for (const [key, value] of Object.entries(obj)) {
            if (value === max) arr.push(WEBSITES()[key]);
        }
        if (arr.length > 0) return arr.join(', ');
        return '-';
    }

    function getFavDep(obj) {
        const arr = [];
        const max = Math.max.apply(
            Math,
            obj.map(function(o) {
                return o._2;
            })
        );
        obj.forEach(dep => {
            if (dep._2 === max) {
                arr.push(dep._1);
            }
        });
        if (arr.length > 0) return arr.join(', ');
        return '-';
    }

    useEffect(() => {
        setOcc(getOccupation(author.perWebsite));
        setFavDep(getFavDep(author.perDepartment));
    }, [author]);

    return (
        <div variant="outlined" style={{ padding: 20 }}>
            <Typography color="textSecondary">
                {wording.author.author}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {author._id}
            </Typography>
            <Typography color="textSecondary">
                {wording.author.occupation}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {occ}
            </Typography>
            <Typography color="textSecondary">
                {wording.author.favDep}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {favDep}
            </Typography>
            <Typography color="textSecondary">
                {wording.author.score}
            </Typography>
            <Score score={author.score} />
        </div>
    );
}

AuthorInfo.propTypes = {
    author: PropTypes.object.isRequired
};
