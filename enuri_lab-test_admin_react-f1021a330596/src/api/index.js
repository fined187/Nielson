/* eslint-disable */

import axios from "axios";

const baseURL = "http://192.168.213.54:9000";
//const baseURL = "http://10.10.10.44:9000";
const headers = {
  "Content-Type": "application/json",
}

const baseApiInstance = axios.create({
  baseURL,
  headers,
})

export default baseApiInstance;