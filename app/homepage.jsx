"use client";
import "../styles/styles.css";
import Nav from "@/components/nav";
import Herosection from "@/components/herosection";
import About from "@/components/about";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Blog from "@/components/blog";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scrolltotop";
import blogapis from "@/utils/blogapis";
export default function homepage() {
  const { blogLinks } = blogapis();
  return (
    <div>
      <Nav />
      <Herosection />
      <About />
      <Services />
      <Projects />
      <Blog cardsData={blogLinks} />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
