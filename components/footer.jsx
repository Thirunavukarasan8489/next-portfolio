import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
export default function Footer() {
  return (
    <div>
      <footer className="bg-text text-white py-8">
        <div className="container mx-auto text-center">
          {/* Title */}
          <h1 className="text-h1 font-semibold mb-2">THIRUNAVUKARASAN.</h1>

          {/* Description */}
          <p className="mb-6 text-sm px-4">
            I&#39;m a Full-Stack Developer with expertise in the MERN stack
            (MongoDB, Express.js, React, Node.js). With experience in creating
            responsive websites, UI/UX design using Figma, and mobile-friendly
            web applications, I build engaging, user-centric digital
            experiences. Additionally, I have hands-on experience in CorelDraw
            and Photoshop.
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-6">
            <a
              href="#"
              className="text-white border p-2 rounded-md hover:text-primary hover:border-primary transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-white border p-2 rounded-md hover:text-primary hover:border-primary transition duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="text-white border p-2 rounded-md hover:text-primary hover:border-primary transition duration-300"
            >
              <FaInstagram />
            </a>
          </div>
          <hr className="pb-5" />
          {/* Copyright */}
          <p className="text-white">
            © 2024 Thirunavukarasan. All Rights Reserved{" "}
            {/* <span className="text-primary">❤</span> by Thirunavukarasan. */}
          </p>
          <p className="text-tiny">
            <i>Designed and Devloped by Thirunavukarasan</i>
          </p>
        </div>
      </footer>
    </div>
  );
}
