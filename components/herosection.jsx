"use client";
import { useState } from "react";
import Thiru from "../public/images/Gopi.png";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";
// import Resume from "../public/docs/THIRUNAVUKARASAN RESUME FULL STACK.pdf";
export default function Herosection() {
  const [isScaled, setIsScaled] = useState(false);
  const handleClick = () => {
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 150);
  };
  return (
    <section id="home" className="py-20 pt-28 bg-[#f9fafd] herobg">
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 sm:grid-cols-1 md:grid-cols-1  container mx-auto px-10">
        <div className="col-span-3 flex items-center">
          {/* <div className=""> */}
          <div className="">
            <p className="font-semibold xl:text-base text-base pb-1">
              Hello I&#39;m
            </p>
            <h1 className="font-bold text-wrap text-primary xl:text-7xl lg:text-7xl md:text-xl mdsm:text-xl sm:text-h1   pb-2">
              Thirunavukarasan
            </h1>
            <p className="font-semibold text-base pb-2">
              Professional Web Designer Specializing in Dynamic and Responsive
              Web Projects
            </p>
            <p className="text-text font-medium xl:text-base lg:text-base md:text-base mdsm:text-base sm:text-sm pb-5">
              Obviously i&#39;m a experienced Web Developer & Full-Stack
              Developer. I create dynamic, responsive websites with a focus on
              user-centric design and optimized performance. With hands-on
              expertise in front-end and back-end development, I deliver
              complete web solutions that meet the needs of businesses.
            </p>
            <div className="flex sm:pb-5">
              <a
                href="./docs/THIRUNAVUKARASAN_RESUME_FULL_STACK.pdf"
                alt="Download CV - Web Developer Thirunavukarasan"
                download
                rel="noreferrer"
                target="_blank"
                onClick={handleClick}
                className={`border-[1.5px] border-primary font-semibold py-3 px-5 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer ${
                  isScaled ? "scale-90" : "scale-100"
                }`}
              >
                Download CV{" "}
                <span>
                  <FiDownload className="mt-1 mx-2" />
                </span>
              </a>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-center items-center">
            <Image
              src={Thiru}
              draggable="false"
              loading="lazy"
              alt="Thirunavukarasan is a Web Developer and Full-Stack Developer"
              title="Thirunavukarasan is a Web Developer and Full-Stack Developer"
              className="shadow-xl rounded-[50%]"
              width={502}
              height={502}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
