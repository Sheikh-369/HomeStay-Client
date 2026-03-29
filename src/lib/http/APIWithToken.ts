import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const APIWITHTOKEN = axios.create({
  baseURL: `${BASE_URL}/homestay/`,
  headers: {
    Authorization:
      typeof window !== "undefined" ? localStorage.getItem("token") : null,
    "Content-Type": "application/json", // send vayirako data ko format
    Accept: "application/json", // receive huda kasto type ko format ko receive garne
  },
});


export default APIWITHTOKEN;