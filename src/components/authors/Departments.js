/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { RadarChart } from 'react-vis';
import { DEPARTMENTS } from '../../constants/Departments';

/**
 * Represents the departments of an author in a radial chart.
 * @param {*} props author
 */
export default function Departments(props) {
    const { author } = props;
    const [perDepartment, setPerDepartment] = useState(null);

    function getRadarProps(data, domain) {
        const domains = [];
        DEPARTMENTS.forEach((dep, index) =>
            domains.push({
                name: dep,
                domain,
                getValue: d => data[index]
            })
        );

        return {
            data,
            domains,
            height: 500,
            width: 500
        };
    }

    function getMaxValue(data) {
        let res = 0;
        data.forEach(element => {
            res = element._2 > res ? element._2 : res;
        });
        return res;
    }

    useEffect(() => {
        const data = [];

        DEPARTMENTS.forEach(d => data.push(0));
        author.perDepartment.forEach(d => {
            data[DEPARTMENTS.findIndex(e => e === d._1)] = d._2;
        });

        const domain = [0, getMaxValue(author.perDepartment)];
        setPerDepartment(getRadarProps(data, domain));
    }, [author]);

    return (
        <div>
            {perDepartment != null && (
                <RadarChart
                    tickFormat={t => Math.round(t)}
                    margin={{ left: 100, right: 100, top: 50, bottom: 50 }}
                    data={perDepartment.data}
                    domains={perDepartment.domains}
                    height={600}
                    width={700}
                />
            )}
        </div>
    );
}

Departments.propTypes = {
    author: PropTypes.object.isRequired
};
