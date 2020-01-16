import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parse } from 'query-string';

export default function useQueryParams() {
    const { search } = useLocation();
    const [queryParams, setQueryParams] = useState(
        parse(search, { arrayFormat: 'comma' })
    );

    useEffect(() => {
        setQueryParams(parse(search), { arrayFormat: 'comma' });
    }, [search]);

    return queryParams;
}
