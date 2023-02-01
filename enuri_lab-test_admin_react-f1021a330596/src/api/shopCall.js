/* eslint-disable */

import baseApiInstance from ".";

export const callShop = async(data) => {
    const response = await baseApiInstance.get('/showShopList', data)

    return response.data.data;
}