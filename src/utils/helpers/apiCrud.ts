/* eslint-disable @typescript-eslint/no-explicit-any */

import useApi from '../../hooks/useApi';
import apiMethods from '../constants/apiMethods';

const useCrud = () => {
    const { callApi, loading, error } = useApi();

    const get = async (url: string, params = {}) => {
        return await callApi(apiMethods.GET, url, null, params);
    };

    const post = async (url: string, data: any) => {
        return await callApi(apiMethods.POST, url, data);
    };

    const put = async (url: string, data: any) => {
        return await callApi(apiMethods.PUT, url, data);
    };

    const del = async (url: string) => {
        return await callApi(apiMethods.DELETE, url);
    };

    return { get, post, put, del, loading, error };
};

export default useCrud;
