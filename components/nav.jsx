"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Link from "next/link";
// import { Link } from "react-router-dom";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [submenuOpen, setSubmenuOpen] = useState(false); // For desktop hover submenu
  const [submenuOpenMobile, setSubmenuOpenMobile] = useState(false); // For mobile click submenu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const toggleSubmenuMobile = () => {
    setSubmenuOpenMobile(!submenuOpenMobile);
  };

  return (
    <div>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-16">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold ">
            THIRU.
          </a>

          {/* Links for large screens */}
          <div className="hidden lg:flex space-x-8 items-center">
            {[
              { label: "HOME", href: "#home" },
              { label: "ABOUT", href: "#about" },
              { label: "SERVICES", href: "#services" },
              { label: "PROJECTS", href: "#projects" },
              { label: "BLOG", href: "#blog" },
              { label: "CONTACT", href: "#contact" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <a
                  href={item.href}
                  onClick={() => handleSetActive(item.href)}
                  onMouseEnter={() =>
                    item.label === "BLOG" && setSubmenuOpen(true)
                  }
                  onMouseLeave={() =>
                    item.label === "BLOG" && setSubmenuOpen(false)
                  }
                  className={`font-medium transition duration-300 ${
                    activeSection === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "hover:text-primary text-text"
                  }`}
                >
                  {item.label}
                </a>

                {/* Submenu for BLOG (Desktop) */}
                {item.label === "BLOG" && submenuOpen && (
                  <div
                    onMouseEnter={() => setSubmenuOpen(true)}
                    onMouseLeave={() => setSubmenuOpen(false)}
                    className="absolute top-full left-0 p-2 -mt-1 w-40 bg-white shadow-lg rounded-lg transition duration-300"
                  >
                    <Link
                      href={`blogs`}
                      className="block px-4 py-2 text-text hover:bg-primary hover:text-white rounded transition duration-300"
                    >
                      ALL BLOGS
                    </Link>
                  </div>
                )}
              </div>
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
                <FaLinkedinIn />
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
                { label: "HOME", href: "#home" },
                { label: "ABOUT", href: "#about" },
                { label: "SERVICES", href: "#services" },
                { label: "PROJECTS", href: "#projects" },
                { label: "BLOG", href: "#blog" },
                { label: "CONTACT", href: "#contact" },
              ].map((item, index) => (
                <li key={index} className="relative">
                  <a
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
                  </a>

                  {/* Submenu for BLOG (Mobile) */}
                  {item.label === "BLOG" && (
                    <>
                      <button
                        className="text-sm mt-2"
                        onClick={toggleSubmenuMobile}
                      >
                        {submenuOpenMobile ? "▲" : "▼"}
                      </button>

                      {submenuOpenMobile && (
                        <div className="absolute left-0 mt-2 w-44 bg-white shadow-lg rounded-lg transition duration-300 z-10">
                          <Link
                            href={`blogs`}
                            className="block px-4 py-2 text-text hover:bg-primary hover:text-white rounded transition duration-300"
                          >
                            ALL BLOGS
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
