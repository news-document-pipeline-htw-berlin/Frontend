import { useEffect, useState } from 'react';
import EndpointConstants from '../constants/EndpointConstants';
import { unauthorized } from '../state/httpClient';

export const useDepartment = () => {
    const [async, setAsync] = useState({ isLoading: false, error: null });
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        async function fetchDepartments() {
            const { method, path } = EndpointConstants.DEPARTMENT_LIST;
            try {
                setAsync({ isLoading: true, error: null });
                const res = await unauthorized({ path, method });

                setDepartments(res);
                setAsync({ isLoading: false, error: null });
            } catch (err) {
                setAsync({ isLoading: false, error: err });
            }
        }
        fetchDepartments();
    }, []);
    return {
        isLoading: async.isLoading,
        error: async.error,
        departments
    };
};
