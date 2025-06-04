import Image from "next/image";
import Thiru from "../public/images/thiru.jpg";
import { GoChevronRight } from "react-icons/go";
export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div>
        <h2 className="font-bold text-center text-h3">ABOUT</h2>
        <div className="flex justify-center">
          <div className="border-b-2 border-primary relative w-6"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius1"></div>
          <div className="border-b-2 border-primary relative w-6"></div>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-1 mdsm:grid-cols-1 sm:grid-cols-1 container mx-auto px-10 py-10 gap-3">
          <div className="col-span-2">
            <Image
              src={Thiru}
              alt="Thirunavukarasan is a Web Developer and Full-Stack Developer"
              title="Thirunavukarasan is a Web Developer and Full-Stack Developer"
              className=""
            />
          </div>
          <div className="col-span-4 flex items-center">
            <div>
              <h2 className="font-bold text-text text-h3 pb-2">
                Full-Stack Developer with UIUX Designer
                <br />
                <span className="text-primary">
                  (Developing Websites and Web Applications)
                </span>
              </h2>
              <p className="text-text roboto-regular font-medium pb-4">
                I&#39;m a Full-Stack Developer with expertise in the MERN stack
                (MongoDB, Express.js, React, Node.js). With experience in
                creating responsive websites, UI/UX design using Figma, and
                mobile-friendly web applications, I build engaging, user-centric
                digital experiences. Additionally, I have hands-on experience in
                CorelDraw and Photoshop.
              </p>
              <div className="flex flex-wrap xl:gap-10 lg:gap-10 md:gap-0 mdsm:gap-0 sm:gap-0 pb-2">
                <ul>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">Degree: </strong>
                      <span className="ml-2 text-primary font-medium">
                        MSc Computer Science
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">Phone: </strong>
                      <span className="ml-2 text-primary font-medium">
                        <a
                          href="tel:+918489902902"
                          target="_self"
                          className="hover:text-text hover:underline transition duration-300 underline-offset-2"
                        >
                          {" "}
                          +91 84899 02902
                        </a>
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">Location: </strong>
                      <span className="ml-2 text-primary font-medium">
                        TamilNadu, India
                      </span>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">Email: </strong>
                      <span className="ml-2 text-primary font-medium">
                        <a
                          href="mailto:thirugopi733@gmail.com"
                          target="_blank"
                          className="hover:text-text hover:underline transition duration-300 underline-offset-2"
                        >
                          thirugopi733@gmail.com
                        </a>
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">Linkedin: </strong>
                      <span className="ml-2 text-primary font-medium">
                        <a
                          href="https://www.linkedin.com/in/thirunavukarasan/"
                          target="_blank"
                          className="hover:text-text hover:underline transition duration-300 underline-offset-2"
                        >
                          linkedin.com/in/thirunavukarasan
                        </a>
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center w-[100%] pb-2">
                    <GoChevronRight className="text-primary font-medium text-xl" />
                    <div className="">
                      <strong className="text-text">GitHub: </strong>
                      <span className="ml-2 text-primary font-medium">
                        <a
                          href="https://github.com/Thirunavukarasan8489"
                          target="_blank"
                          className="hover:text-text hover:underline transition duration-300 underline-offset-2"
                        >
                          github.com/Thirunavukarasan8489
                        </a>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="text-text roboto-regular font-medium pb-2">
                Results-driven computer science student from
                <b> RVS College of Arts & Science</b> passionate about
                developing user-friendly software applications. Excellent
                problem-solving skills and ability to perform well in a team.
                Seeking to help Company Your develop their product as a software
                engineer, as well as grow and develop my own skills as a coder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
