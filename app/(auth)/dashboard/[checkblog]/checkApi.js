import axios from "axios";
import { useState, useEffect } from "react";
import encryptdecrypt from "@/utils/encryptdecrypt";
function useCheckApi() {
  const [getdata, setGetdata] = useState();
  function getBlog() {
    const token = document.cookie
      .match(/BLOG_ACTIVE/)
      .input.replace("BLOG_ACTIVE=", "");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const URL = `${process.env.NEXT_PUBLIC_HOST}/authuser`;
    axios
      .get(URL, { headers })
      .then((res) => {
        let inData = JSON.parse(encryptdecrypt.decryptData(res.data));
        // console.log("inData :", inData);
        setGetdata(inData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBlog();
  }, []);
  // const createSlug = (metatitle) => {
  //   return metatitle
  //     ?.toLowerCase()
  //     .replace(/[^a-z0-9\s-.]/g, "")
  //     .replace(/\s+/g, "-")
  //     .replace(/-+/g, "-");
  // };
  const checkLinks = getdata?.map((blog) => ({
    ...blog,
    link: `/dashboard/${blog.url}`,
  }));
  return { checkLinks };
}
export default useCheckApi;
