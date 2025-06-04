import Mobile from "../public/icons/mobile-icon-svg.svg";
import Email from "../public/icons/Email-icon-svg.svg";
import Location from "../public/icons/location-icon-svg.svg";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
export default function Contact() {
  const [isSaveClick, setIsSaveClick] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validation = (values) => {
    var error = {};
    let regex = /^[A-Za-z\s]+$/;
    let email = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
    if (values.name === "") {
      error.name = "Enter the Name";
    } else if (!regex.test(values.name)) {
      error.name = "Name must be alphabets only";
      setLoading(true);
    }
    if (values.email === "") {
      error.email = "Enter the Email";
    } else if (!email.test(values.email)) {
      error.email = "Invalid email type";
      setLoading(true);
    }
    if (values.subject === "") {
      error.subject = "Enter the Subject";
    }
    if (values.message === "") {
      error.message = "Enter the Message";
    }
    return error;
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    if (isSaveClick) {
      setErrors(validation({ ...values, [name]: value }));
    }
  };

  const handleSubmit = () => {
    setLoading(false);
    let temp_state = isSaveClick;
    temp_state = true;
    setIsSaveClick(temp_state);
    var errorVal;
    errorVal = validation(values);
    setErrors(errorVal);
    if (Object.keys(errorVal).length === 0) {
      const myjson = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };
      // console.log("myjson : ", myjson);

      // const URL = `http://localhost:8080/api/contact`;
      const URL = `${process.env.NEXT_PUBLIC_HOST}/contact`;
      // const URL = `https://portfolio-backend-five-inky.vercel.app/api/enquiry`;
      axios
        .post(URL, myjson)
        .then((res) => {
          if (res.status === 200) {
            setValues({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
            alert(res.data);
            setTimeout(() => {
              setLoading(true);
            }, 3000);
          } else {
            alert("Error in Submitting Please try again later");
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 403) {
            // console.log(err.response.data);
            setLoading(true);
            alert(`${err.response.data} we will contact you shortly`);
          }
          if (err.response.status === 500) {
            setLoading(true);
            alert(err.response.data);
          } else {
            alert("Form Not submitted");
          }
        });
    }
  };
  return (
    <section id="contact" className="py-20">
      <div>
        <h2 className="font-bold text-center text-h3 pb-6">CONTACT ME</h2>
        <div className="flex justify-center pb-10">
          <div className="border-b-2 border-primary relative w-6"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius1"></div>
          <div className="border-b-2 border-primary relative w-6"></div>
        </div>
        {/* <p className="font-semibold roboto-medium text-text text-center px-8 pb-5">
          Get in Touch with a Thirunavukarasan Full-Stack Developer and UI/UX
          Designer.
        </p> */}
        <p className="font-semibold roboto-medium text-text text-center px-8 pb-5">
          Contact Thirunavukarasan, a skilled Full-Stack Developer and UI/UX
          Designer.
        </p>
        <div className="container mx-auto px-4 py-8">
          {/* Contact Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Phone */}
            <div className="text-center">
              <div className="flex justify-center pb-5">
                <Image
                  src={Mobile}
                  alt="mobile icon"
                  draggable="false"
                  className="select-none"
                />
              </div>
              <h4 className="font-medium text-h6 mb-3">MOBILE</h4>
              <p className="text-text roboto-regular mb-2">
                For quick assistance and real-time support, contact us via
                mobile
              </p>
              <p className="text-primary roboto-regular">
                <a
                  href="tel:+91848990902"
                  target="_self"
                  className="hover:text-text transition duration-300 hover:underline underline-offset-2"
                >
                  +91 84899 02902
                </a>
              </p>
            </div>
            {/* Email */}
            <div className="text-center">
              <div className="flex justify-center pb-5">
                <Image
                  src={Email}
                  alt="Email icon"
                  draggable="false"
                  className="select-none"
                />
              </div>
              <h4 className="font-medium text-h6 mb-3">EMAIL</h4>
              <p className="text-text roboto-regular mb-2">
                Promising development turmoil inclusive education transformative
                community
              </p>
              <a
                href="mailto:thirugopi733@gmail.com"
                className="text-primary roboto-regular hover:text-text transition duration-300 hover:underline underline-offset-2"
              >
                thirugopi733@gmail.com
              </a>
            </div>
            {/* Location */}
            <div className="text-center">
              <div className="flex justify-center pb-5">
                <Image
                  src={Location}
                  alt="Location icon"
                  draggable="false"
                  className="select-none"
                />
              </div>
              <h4 className="font-medium text-h6 mb-3">LOCATION</h4>
              <p className="text-text roboto-regular mb-2">
                2/412 Thirumalai Nagar, Ganapathypalayam, Tiruppur - 641 605
              </p>
              <a
                href="#"
                className="text-primary roboto-regular hover:text-text transition duration-300 hover:underline underline-offset-2"
              >
                View on Google map
              </a>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name:
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="name"
                id="name"
                value={values.name}
                onChange={(e) => {
                  handelChange(e);
                }}
                className={`${
                  errors.name ? "border-red" : "border-bordercolor"
                } w-full border rounded-lg p-3 outline-0 focus:ring-0 focus:ring-primary`}
              />
              <div>
                {errors.name && (
                  <span className="text-red text-sm sm:text-[10px]">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email:
              </label>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                id="email"
                value={values.email}
                onChange={(e) => {
                  handelChange(e);
                }}
                className={`${
                  errors.email ? "border-red" : "border-bordercolor"
                } w-full border rounded-lg p-3 outline-0 focus:ring-0 focus:ring-primary`}
              />
              <div>
                {errors.email && (
                  <span className="text-red text-sm sm:text-[10px]">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            {/* Subject */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Subject:
              </label>
              <input
                type="text"
                placeholder="Your Subject"
                name="subject"
                id="subject"
                value={values.subject}
                onChange={(e) => {
                  handelChange(e);
                }}
                className={`${
                  errors.subject ? "border-red" : "border-bordercolor"
                } w-full border border-bordercolor rounded-lg p-3 outline-0 focus:ring-0 focus:ring-primary`}
              />
              <div>
                {errors.subject && (
                  <span className="text-red text-sm sm:text-[10px]">
                    {errors.subject}
                  </span>
                )}
              </div>
            </div>
            {/* Message */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message:
              </label>
              <textarea
                placeholder="Your Message"
                name="message"
                id="message"
                value={values.message}
                onChange={(e) => {
                  handelChange(e);
                }}
                className={`${
                  errors.message ? "border-red" : "border-bordercolor"
                } w-full border border-bordercolor rounded-lg p-3 outline-0 focus:ring-0 focus:ring-primary h-32`}
              ></textarea>
              <div>
                {errors.message && (
                  <span className="text-red text-sm sm:text-[10px]">
                    {errors.message}
                  </span>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 text-right">
              <button
                id="submit"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                disabled={
                  values.name !== "" &&
                  values.email !== "" &&
                  values.subject !== "" &&
                  values.message !== ""
                    ? false
                    : true
                }
                className={`${
                  values.name !== "" &&
                  values.email !== "" &&
                  values.subject !== "" &&
                  values.message !== ""
                    ? "bg-primary"
                    : "bg-primary opacity-50 cursor-not-allowed"
                }  text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors`}
              >
                {!loading ? (
                  <div className="flex justify-center gap-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <p>Submitting...</p>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
