"use client";
import BlogNavbar from "@/components/BlogNavbar";
import "../../styles/styles.css";
import BlogCards from "./blogcards";
import blogapis from "@/utils/blogapis";

export default function Blogs() {
  const blogLinks = blogapis();
  //   console.log(blogLinks.blogLinks);
  const navName = "Latest Blog";
  return (
    <div>
      <BlogNavbar navName={navName} />
      <BlogCards cardsData={blogLinks.blogLinks} />
    </div>
  );
}
