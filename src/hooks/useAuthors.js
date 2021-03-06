import { useState, useEffect } from 'react';

import { httpInstance } from '../state/httpInstance';

/**
 * Retrieves author data by id.
 * @param {*} id
 */
function useAuthor(id) {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        httpInstance
            .get('/authors', {
                params: {
                    id
                }
            })
            .then(response => {
                setAuthor(response.data);
            })
            .catch(error => {
                setAuthor(null);
            });
    }, [id]);

    return [author, setAuthor];
}

export { useAuthor };
