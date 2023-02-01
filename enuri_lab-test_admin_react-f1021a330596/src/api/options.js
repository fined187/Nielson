/* eslint-disable */

import baseApiInstance from ".";

export const showLCateOptions = async(data) => {
  const reponse = await baseApiInstance.get("/showLcate", data);

  return reponse.data;
}