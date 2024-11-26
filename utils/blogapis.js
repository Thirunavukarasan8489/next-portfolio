import axios from "axios";
import { useState, useEffect } from "react";
import encryptdecrypt from "./encryptdecrypt";
function blogapis() {
  const [getdata, setGetdata] = useState();
  function getBlog() {
    const URL = "http://localhost:8080/api/getblogs";
    axios
      .get(URL)
      .then((res) => {
        let inData = JSON.parse(encryptdecrypt.decryptData(res.data));
        setGetdata(inData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBlog();
  }, []);
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-.]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };
  const blogLinks = getdata?.map((blog) => ({
    ...blog,
    link: `/blogs/${createSlug(blog.title)}`,
  }));
  return { blogLinks };
}
export default blogapis;
