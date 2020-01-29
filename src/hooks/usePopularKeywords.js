import { useEffect, useState } from 'react';
import EndpointConstants from '../constants/EndpointConstants';
import { unauthorized } from '../state/httpClient';

export function usePopularKeywords() {
    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        async function fetchKeywords() {
            try {
                const {
                    method,
                    path
                } = EndpointConstants.ANALYTICS_GET_KEYWORDS;
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({
                    method,
                    path
                });

                setKeywords(res.lemmas);
                setAsync({ isLoading: false, error: null });
            } catch (err) {
                setAsync({ isLoading: false, error: err });
            }
        }
        fetchKeywords();
    }, []);

    return {
        keywords,
        async
    };
}
