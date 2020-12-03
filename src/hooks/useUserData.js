import { useState, useEffect } from 'react';
import { httpInstance } from '../state/httpInstance';

function useUserData(userId) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        httpInstance
            .get('/users', {
                params: {
                    id: userId
                }
            })
            .then(response => {
                setUserData(response.data);
            });
    }, [userId]);

    return [userData, setUserData];
}

export default useUserData;
