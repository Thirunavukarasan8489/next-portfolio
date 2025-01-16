"use client";
import { useState } from "react";
import { FaRegUser, FaChevronRight, FaSearch } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
export default function BlogCards({ cardsData }) {
  // console.log("cardsData :", cardsData);
  const [search, setSearch] = useState("");
  const formatDateDDMMYYYY = (inputDate) => {
    const date = new Date(inputDate); // Convert the string into a Date object
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const filteredCards = cardsData?.filter(
    (card) =>
      card?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
      card?.author?.toLowerCase()?.includes(search.toLowerCase()) ||
      card?.category?.toLowerCase()?.includes(search.toLowerCase())
  );
  return (
    <div className="bg-[#f9fafd]">
      <div className="flex justify-center items-center p-4 ">
        <div className="flex items-center relative">
          <FaSearch className="text-text absolute left-4 " />
          <input
            placeholder="Search by title, author, or category..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-primary rounded-md focus:outline-none px-10 py-2"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards?.length ? (
            filteredCards.map((v, i) => (
              <div
                key={i}
                className="bg-white p-4 group shadow-lg rounded-lg overflow-hidden transition hover:-translate-y-3 hover:shadow-2xl border-[1px] border-bordercolor duration-300 ease-in-out flex flex-col justify-between"
              >
                <img
                  src={v.bannerimg}
                  alt={v.title}
                  className="w-full h-48 object-cover rounded-lg transition-all group-hover:scale-105 group-hover:shadow-xl"
                />
                <div className="mt-auto">
                  <div className="">
                    <div className="flex items-center justify-between text-textblack mb-4 mt-4">
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
                    <h3 className="text-h6 text-text font-medium mb-5 group-hover:underline underline-offset-2 group-hover:text-primary">
                      <a href={v.link}>{v.title}</a>
                    </h3>
                    <hr className="text-bordercolor pb-5" />
                    <div className="flex justify-between items-end text-sm text-textblack">
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
                        <span>{formatDateDDMMYYYY(v.updatedDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray">
              No Data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
