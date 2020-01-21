import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useQueryParams from '../../hooks/useQueryParams';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const queryParams = useQueryParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, queryParams]);

    return null;
}
