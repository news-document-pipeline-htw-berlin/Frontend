import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Button } from '@material-ui/core';

import Author from './Author';
import { wording } from '../common/common';

/**
 * A container for author stats.
 * May contain information about the article from which the represented page has been linked from.
 * If the article link is present, a button to return to the article will be displayed on top.
 */
export default function AuthorLinkContainer() {
    const params = useParams();
    const history = useHistory();
    const location = useLocation();

    return (
        <div>
            <Author id={params.id}>
                {location.state && location.state.title && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => history.goBack()}
                    >
                        <ArrowBackIosOutlinedIcon />
                        {wording.author.back} {`"${location.state.title}"`}
                    </Button>
                )}
            </Author>
        </div>
    );
}
