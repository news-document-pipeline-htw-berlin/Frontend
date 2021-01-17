/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    XYPlot,
    XAxis,
    YAxis,
    HeatmapSeries,
    VerticalGridLines,
    HorizontalGridLines,
    LabelSeries,
    RadarChart
} from 'react-vis';

function getRadarProps(data, domain) {
    return {
        data,
        domains: [
            { name: 'Digital', domain, getValue: d => d.digital },
            { name: 'Wirtschaft', domain, getValue: d => d.wirtschaft },
            { name: 'Politik', domain, getValue: d => d.politik },
            { name: 'Wissen', domain, getValue: d => d.wissen },
            { name: 'Panorama', domain, getValue: d => d.panorama },
            { name: 'Regional', domain, getValue: d => d.regional },
            { name: 'Umwelt', domain, getValue: d => d.umwelt },
            {
                name: 'Gesellschaft',
                domain,
                getValue: d => d.gesellschaft
            },
            { name: 'Kultur', domain, getValue: d => d.kultur },
            { name: 'Arbeit', domain, getValue: d => d.arbeit },
            { name: 'Sport', domain, getValue: d => d.sport },
            { name: 'Meinung', domain, getValue: d => d.meinung },
            { name: 'Satire', domain, getValue: d => d.satire },
            { name: 'Reisen', domain, getValue: d => d.reisen },
            { name: 'Geschichte', domain, getValue: d => d.geschichte }
        ],
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

export default function Departments(props) {
    const { author } = props;
    const [perDepartment, setPerDepartment] = useState(null);

    useEffect(() => {
        setPerDepartment([]);
        const data = [
            {
                digital: 0,
                wirtschaft: 0,
                politik: 0,
                wissen: 0,
                panorama: 0,
                regional: 0,
                umwelt: 0,
                gesellschaft: 0,
                kultur: 0,
                arbeit: 0,
                sport: 0,
                meinung: 0,
                satire: 0,
                reisen: 0,
                geschichte: 0
            }
        ];
        const domain = [0, getMaxValue(author.perDepartment)];
        author.perDepartment.forEach(d => {
            switch (d._1) {
                case 'Digital':
                    data[0].digital = d._2;
                    break;
                case 'Wirtschaft':
                    data[0].wirtschaft = d._2;
                    break;
                case 'Politik':
                    data[0].politik = d._2;
                    break;
                case 'Wissen':
                    data[0].wissen = d._2;
                    break;
                case 'Panorama':
                    data[0].panorama = d._2;
                    break;
                case 'Regional':
                    data[0].regional = d._2;
                    break;
                case 'Umwelt':
                    data[0].umwelt = d._2;
                    break;
                case 'Gesellschaft':
                    data[0].gesellschaft = d._2;
                    break;
                case 'Kultur':
                    data[0].kultur = d._2;
                    break;
                case 'Arbeit':
                    data[0].arbeit = d._2;
                    break;
                case 'Sport':
                    data[0].sport = d._2;
                    break;
                case 'Meinung':
                    data[0].meinung = d._2;
                    break;
                case 'Satire':
                    data[0].satire = d._2;
                    break;
                case 'Reisen':
                    data[0].reisen = d._2;
                    break;
                case 'Geschichte':
                    data[0].geschichte = d._2;
                    break;
                default:
                    break;
            }
        });
        setPerDepartment(getRadarProps(data, domain));
    }, [author]);

    return (
        <div>
            {perDepartment != null && (
                <RadarChart
                    data={perDepartment.data}
                    domains={perDepartment.domains}
                    height={perDepartment.height}
                    width={perDepartment.width}
                />
            )}
        </div>
    );
}

Departments.propTypes = {
    author: PropTypes.object.isRequired
};
