"use client";
import "../styles/styles.css";
import Nav from "@/components/nav";
import Herosection from "@/components/herosection";
import About from "@/components/about";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Blog from "@/components/blog";
import { useState, useEffect } from "react";
import axios from "axios";
import encryptdecrypt from "@/utils/encryptdecrypt";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrolltotop";
import blogapis from "@/utils/blogapis";
export default function homepage() {
  //   const [getdata, setGetdata] = useState();
  //   function getBlog() {
  //     const URL = "http://localhost:8080/api/getblogs";
  //     axios
  //       .get(URL)
  //       .then((res) => {
  //         // console.log("res :", res.data);
  //         let inData = JSON.parse(encryptdecrypt.decryptData(res.data));
  //         // console.log(inData);
  //         setGetdata(inData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   useEffect(() => {
  //     getBlog();
  //   }, []);
  //   const createSlug = (title) => {
  //     return title
  //       .toLowerCase()
  //       .replace(/[^a-z0-9\s-.]/g, "")
  //       .replace(/\s+/g, "-")
  //       .replace(/-+/g, "-");
  //   };
  //   const blogLinks = getdata?.map((blog) => ({
  //     ...blog,
  //     link: `/blogs/${createSlug(blog.title)}`,
  //   }));
  // const { blogLinks } = blogapis();
//   console.log("blogLinks :", blogLinks);
  return (
    <div>
      <Nav />
      <Herosection />
      <About />
      <Services />
      <Projects />
      <Blog />
      {/* <Blog cardsData={blogLinks} /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
