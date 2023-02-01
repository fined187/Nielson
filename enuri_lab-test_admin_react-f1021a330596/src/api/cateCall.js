/* eslint-disable */

import baseApiInstance from ".";

export const callCate = async(data) => {
    const response = await baseApiInstance.get('/showLcate', data)
    return response.data.data;

}

export const callMcate = async(data) => {
    const response = await baseApiInstance.post('/selectMcate', data)
    return response.data.data;
}

export const callScate = async(data) => {
    const response = await baseApiInstance.post('/selectScate', data)
    return response.data.data;
}

export const callQCcate = async(data) => {
    const response = await baseApiInstance.get('/showQCcate', data)
    return response.data.data;
}