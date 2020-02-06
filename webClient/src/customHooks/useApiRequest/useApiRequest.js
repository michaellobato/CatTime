import { useReducer, useCallback } from 'react';
import axios from 'axios';
import reducer, { initialState } from './reducer';
import { fetching, success, error } from './actionCreators';
import getOr from 'lodash/fp/getOr';

const useApiRequest = (endpoint, { verb = 'get', params = {} } = {}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const makeRequest = useCallback(async () => {
        dispatch(fetching());
        try {
            const response = await axios[verb](endpoint, {
                ...params,
                headers: {
                    'Access-Control-Allow-Origin': 'localhost:5000', // TODO: obviously don't hardcode this
                },
            });
            dispatch(success(response));
        } catch (e) {   
            // TODO: better error handling
            dispatch(error(getOr({}, 'response.data', e)));
        }
    }, [endpoint, verb, params]);

    return [state, makeRequest];
};

export default useApiRequest;