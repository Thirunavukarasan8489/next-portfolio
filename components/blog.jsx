"use client";
import { FaRegUser } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
// import { Link } from "react-router-dom";
export default function Blog({ cardsData }) {
  const [isScaled, setIsScaled] = useState(false);
  const handleClick = () => {
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 150);
  };
  return (
    <section id="blog" className="py-20 bg-[#f9fafd]">
      <div>
        <h2 className="font-bold text-center text-h3 pb-6">
          LATEST NEWS & BLOG
        </h2>
        <div className="flex justify-center pb-10">
          <div className="border-b-2 border-primary relative w-6"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius1"></div>
          <div className="border-b-2 border-primary relative w-6"></div>
        </div>
        <p className="font-semibold roboto-medium text-textcolor text-center px-8 pb-5">
          Stay Updated with the Latest Trends in Web Development, UI/UX Design,
          and Digital Marketing Insights
        </p>
        <div className="container mx-auto px-10 py-8">
          <div className="grid md:grid-cols-2 mdsm:grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-6">
            {cardsData?.map((v, i) => (
              <div
                key={i}
                className="bg-white group shadow-lg rounded-lg overflow-hidden transition hover:-translate-y-3 hover:shadow-2xl border-[1px] border-bordercolor duration-300 ease-in-out"
              >
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 border-t-2 border-primary">
                  <div className="flex items-center justify-between text-textblack mb-4">
                    <div className="flex items-center space-x-2 roboto-regular">
                      <FaRegUser />
                      <span>{v.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 roboto-regular">
                      <IoPricetagOutline />
                      <span>{v.category}</span>
                    </div>
                  </div>
                  <hr className="text-bordercolor pb-5" />
                  <h3 className="text-h6 text-text font-medium mb-5 hover:underline underline-offset-2 group-hover:text-primary">
                    <a href={v.link}>{v.title}</a>
                  </h3>
                  <hr className="text-bordercolor pb-5" />
                  <div className="flex justify-between items-center text-sm text-textblack">
                    <div className="flex items-center space-x-2">
                      <a
                        href={v.link}
                        className="text-base hover:underline roboto-regular"
                      >
                        Read More{" "}
                      </a>
                      <span>
                        <FaChevronRight />
                      </span>
                    </div>
                    <div className="flex items-center text-base space-x-2 roboto-regular">
                      <MdOutlineDateRange className="text-textblack" />
                      <span>{v.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-10">
            <Link href={`blogs`}>
              <button
                onClick={handleClick}
                className={`${
                  isScaled ? "scale-90" : "scale-100"
                } border py-2 px-6 rounded-md border-primary text-primary hover:bg-primary hover:text-white transition duration-300`}
              >
                More Blogs...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
