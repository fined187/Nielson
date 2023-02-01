/* eslint-disable */

import baseApiInstance from ".";

export const sendFormMathcing = async (data) => {
  try {
    const response = await baseApiInstance.post("/matchingRateApi", data)
    // throw ERROR
    return response.data.data
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: api/sendFormMathcing")
  } 
}

export const sendFormPrice = async(data) => {
  try {
    const response = await baseApiInstance.post("/matchingRateApi", data)
    return response.data.data
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: api/sendFormPrice")
  }
}

export const sendFormOverview = async(data) => {
  // TO DO (overview url)
  try {
    const response = await baseApiInstance.post("/allStatusApi", data)
    return response.data.data
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: api/sendFormOverview")
  }
}


// // SERVER
// const data = req.body;
// const keywordInList = data.keywords.map(keyword => keyword.in); // ["blabla", "blabla2"];
// const keywordOutList = data.keywords.map(keyword => {
//   if (keyword.out === "") {
//     return null;
//   }
//   return keyword.out;
// }); // ["hi", null];

export const sendLcateList = async(data) => {
  try {
    const response = await baseApiInstance.post("/matchingRateApi", data)
    return response.data.data
  } catch (error) {
    console.error(error);
    throw new Error("ERROR: api/sendFormMathcing")
  }
}