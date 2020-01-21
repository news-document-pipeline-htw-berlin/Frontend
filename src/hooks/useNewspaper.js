import { useEffect, useState } from 'react';
import EndpointConstants from '../constants/EndpointConstants';
import { unauthorized } from '../state/httpClient';

export const useNewspaper = () => {
    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [newspapers, setNewspapers] = useState([]);
    useEffect(() => {
        async function fetchNewspaper() {
            const { method, path } = EndpointConstants.NEWSPAPER_LIST;
            try {
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({ path, method });
                setNewspapers(res);
                setAsync({ isLoading: false, error: null });
            } catch (err) {
                setAsync({ isLoading: false, error: err });
            }
        }
        fetchNewspaper();
    }, []);
    return {
        isLoading: async.isLoading,
        error: async.error,
        newspapers
    };
};
