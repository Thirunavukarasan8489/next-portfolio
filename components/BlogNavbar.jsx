"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
// import { Link } from 'react-router-dom';
// import { GoChevronRight } from 'react-icons/go';
// import BlogHome from '../Blogs/BlogHome';
export default function BlogNavbar({ navName, Blogdate }) {
  //   console.log(Blogdate);
  const changeFormatDate = (Blogdate) => {
    const date = new Date(Blogdate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const [isOpen, setIsOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //     const handleScroll = () => {
  //         if (window.scrollY > 50) {
  //             setScrolled(true);
  //         } else {
  //             setScrolled(false);
  //         }
  //     };

  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //         window.removeEventListener('scroll', handleScroll);
  //     };
  // }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: [0.4, 0.6],
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleSetActive = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      {" "}
      <nav
        className={`bg-[#f9fafd] w-full z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold">
            BLOGS.
          </a>

          {/* Links for large screens */}
          <div className="hidden lg:flex space-x-8 items-center">
            {[
              { label: "HOME", href: "/" },
              { label: "BLOGS", href: "/blogs" },
              // { label: 'ABOUT', href: '#about' },
              // { label: 'SERVICES', href: '#services' },
              // { label: 'PROJECTS', href: '#projects' },
              // { label: 'BLOG', href: '#blog' },
              // { label: 'CONTACT', href: '#contact' },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => {
                  handleSetActive(item.href);
                }}
                className={`font-medium transition duration-300 ${
                  activeSection === item.href
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-primary text-text"
                }`}
              >
                {item.label}
              </Link>
              // <a
              //     key={index}
              //     href={item.href}
              //     onClick={() => {
              //         handleSetActive(item.href);
              //     }}
              //     className={`font-medium transition duration-300 ${
              //         activeSection === item.href ? 'text-primary border-b-2 border-primary' : 'hover:text-primary text-text'
              //     }`}
              // >
              //     {item.label}
              // </a>
            ))}

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="/"
                className="border p-2 rounded-md border-text text-gray hover:text-primary hover:border-primary transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="/"
                className="border p-2 rounded-md border-text text-gray hover:text-primary hover:border-primary transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="/"
                className="border p-2 rounded-md border-text text-gray hover:text-primary hover:border-primary transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="block lg:hidden text-3xl text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-gray text-white transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out lg:hidden`}
          >
            <div className="flex justify-between p-4">
              {/* Logo */}
              <a href="/" className="text-2xl font-bold">
                THIRU.
              </a>

              {/* Close Button */}
              <button
                className="text-3xl focus:outline-none"
                onClick={toggleMenu}
              >
                <FiX />
              </button>
            </div>

            <ul className="flex flex-col items-center py-20 h-full space-y-6 text-xl">
              {[
                { label: "HOME", href: "/" },
                { label: "BLOGS", href: "/blogs" },
                // { label: 'ABOUT', href: '#about' },
                // { label: 'SERVICES', href: '#services' },
                // { label: 'PROJECTS', href: '#projects' },
                // { label: 'BLOG', href: '#blog' },
                // { label: 'CONTACT', href: '#contact' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`hover:text-primary font-medium transition-colors ${
                      activeSection === item.href
                        ? "text-primary border-b-2 border-primary"
                        : "hover:text-primary"
                    }`}
                    onClick={() => {
                      handleSetActive(item.href);
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                  {/* <a
                                        href={item.href}
                                        className={`hover:text-primary font-medium transition-colors ${
                                            activeSection === item.href ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'
                                        }`}
                                        onClick={() => {
                                            handleSetActive(item.href);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {item.label}
                                    </a> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {Blogdate || navName ? (
          <div className="xl:py-8 lg:py-8 md:py-8 mdsm:py-20 sm:py-10">
            <div>
              <p className="text-center pb-5 text-h6 font-medium text-textcolor">
                {Blogdate ? changeFormatDate(Blogdate) : null}
              </p>
              <h1 className="font-bold xl:px-14 lg:px-14 md:px-14 mdsm:px-10 sm:px-10 text-center xl:text-3xl lg:text-3xl md:text-3xl mdsm:text-xl sm:text-xl pb-6 text-shadow-xl uppercase">
                {navName}
              </h1>
              {/* <div className="flex justify-center">
                            <div className="flex items-center bg-[#f9fafd] rounded-md py-2 px-5 space-x-3">
                                <Link to={`/`} className="text-text roboto-regular text-base font-medium hover:text-primary">
                                    Thiru
                                </Link>
                                <GoChevronRight className="text-text" />
                                <p className="text-primary roboto-regular text-base font-medium">Blogs</p>
                            </div>
                        </div> */}
            </div>
          </div>
        ) : null}
        {/* <BlogHome /> */}
      </nav>
    </div>
  );
}
