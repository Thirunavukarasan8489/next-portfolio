"use client";
import BlogNavbar from "@/components/BlogNavbar";
import "../../styles/styles.css";
import BlogCards from "./blogcards";
import blogapis from "@/utils/blogapis";
import Footer from "@/components/footer";

export default function Blogs() {
  const blogLinks = blogapis();
  const navName = "Latest Blogs";
  return (
    <div>
      <BlogNavbar navName={navName} />
      <BlogCards cardsData={blogLinks.blogLinks} />
      <Footer />
    </div>
  );
}
