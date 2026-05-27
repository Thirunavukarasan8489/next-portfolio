"use client";
// import { useState } from "react";
// import MNCVEL from "@/public/images/projects/MNC Vel.jpg";
import RVSYUVA from "@/public/images/projects/rvsyuvalogo.png";
// import MantelCorp from "@/public/images/projects/mantel corp.png";
// import Rithans from "@/public/images/projects/rithans.png";
import Dashboard from "@/public/images/projects/dashboard.png";
import Transformtechin from "@/public/images/projects/transformtechin.png";
// import Transformtechai from "@/public/images/projects/transformtechai.png";
import Harish from "@/public/images/projects/harish.png";
import Creative from "@/public/images/projects/creative.png";
import IasPipp from "@/public/images/projects/ias-pipp.png";
import Truegut from "@/public/images/projects/truegut.png";
import Pipp from "@/public/images/projects/pipp.png";
import Image from "next/image";
import Link from "next/link";
export default function Projects() {
  // Sample data for the portfolio items
  const items = [
    {
      id: 1,
      title: "RVS YUVA",
      category: "Website",
      image: RVSYUVA,
      link: "https://rvsyuva.org/",
    },
    {
      id: 2,
      title: "Padmavathi Institute of Public Policy",
      category: "Website",
      image: Pipp,
      link: "https://pipp.org.in/",
    },
    {
      id: 3,
      title: "RVS Institute Database Dashboard",
      category: "Web Application",
      image: Dashboard,
      link: "https://dashboard-rvscas.vercel.app/login",
    },
    {
      id: 4,
      title: "Padmavathi IAS Academy (PIA)",
      category: "Website",
      image: IasPipp,
      link: "https://ias.pipp.org.in/",
    },
    {
      id: 5,
      title: "Truegut",
      category: "E-commerce Website",
      image: Truegut,
      link: "https://truegut.com/",
    },
    {
      id: 6,
      title: "transformtech.in",
      category: "Website",
      image: Transformtechin,
      link: "https://transformtech.in/",
    },
    // {
    //   id: 7,
    //   title: "transformtech.ai",
    //   category: "Website",
    //   image: Transformtechai,
    //   link: "https://transformtech.ai/",
    // },
    {
      id: 8,
      title: "Harish Photography",
      category: "Portfolio Website",
      image: Harish,
      link: "https://harish-portfolio-jade.vercel.app/",
    },
    {
      id: 9,
      title: "Creative Designs",
      category: "Business Website",
      image: Creative,
      link: "https://creativelinegraphics.com/",
    },
    // {
    //   id: 10,
    //   title: "",
    //   category: "",
    //   image: Pipp,
    //   link: "",
    // },
    // {
    //   id: 11,
    //   title: "",
    //   category: "",
    //   image: Pipp,
    //   link: "",
    // },
    // {
    //   id: 12,
    //   title: "",
    //   category: "",
    //   image: Pipp,
    //   link: "",
    // },
    // {
    //   id: 1,
    //   title: "MNC Vel Kalyana Mandapam",
    //   category: "Website",
    //   image: MNCVEL,
    //   link: "https://www.mncvel.com/",
    // },
  ];
  // Tabs for filtering
  // const categories = [
  //   "All",
  //   "UIUX",
  //   "Development",
  //   "Designing",
  //   "Digital Marketing",
  // ];
  // const [activeCategory, setActiveCategory] = useState("All");

  // Filter items based on active category
  // const filteredItems =
  //   activeCategory === "All"
  //     ? items
  //     : items.filter((item) => item.category === activeCategory);
  return (
    <section id="projects" className="py-20 bg-white">
      <div>
        <div>
          <h2 className="font-bold text-center text-h3 pb-6">MY PROJECTS</h2>
          <div className="flex justify-center pb-10">
            <div className="border-b-2 border-primary relative w-6"></div>
            <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius"></div>
            <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius1"></div>
            <div className="border-b-2 border-primary relative w-6"></div>
          </div>
          <p className="font-semibold roboto-medium text-text text-center px-8">
            Explore My Latest Web Development and UI/UX Design Work
          </p>
          <div className="container mx-auto py-12 px-10">
            {/* grid section start */}
            <div className="grid grid-cols-1 md:grid-cols-2 mdsm:grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md group rounded-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl"
                >
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </Link>
                  <div className="p-4 text-center border-t-2 border-primary">
                    <h3 className="text-lg font-semibold group-hover:underline underline-offset-2 decoration-primary">
                      <a href={item.link} target="_blank">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* grid section end */}
            {/* Tab section */}
            {/* <div className="flex flex-wrap justify-center space-x-6 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 rounded-md border border-bordercolor xl:mb-0 lg:mb-0 md:mb-0 mdsm:mb-3 sm:mb-3 ${
                    activeCategory === category
                      ? "bg-primary text-white scale-105"
                      : "bg-white text-text hover:bg-primary hover:text-white"
                  } transition-all font-medium duration-300 ease-in-out`}
                >
                  {category}
                </button>
              ))}
            </div> */}

            {/* Grid section */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 mdsm:grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                  <div className="p-4 text-center border-t-2 border-primary">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
