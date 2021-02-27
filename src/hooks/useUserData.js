import { useState, useEffect } from 'react';

import { httpInstance } from '../state/httpInstance';

/**
 * Retrieves user data by id.
 * @param {*} userId
 */
function useUserData(userId) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        httpInstance
            .get('/users/account')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                setUserData(null);
            });
    }, [userId]);

    return [userData, setUserData];
}

export default useUserData;
