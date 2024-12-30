"use client";
import { useState } from "react";
import axios from "axios";
import encryptdecrypt from "@/utils/encryptdecrypt";
export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    const myjson = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };
    try {
      let data = encryptdecrypt.encryptData(JSON.stringify(myjson));
      const URL = `${process.env.NEXT_PUBLIC_HOST}/create`;
      axios
        .post(URL, { data: data })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center dashbg py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          /> */}
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-[#111827]">
            Register Your Account Post Your Blogs
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] xl:mx-96 lg:mx-72 md:mx-36 mdsm:mx-12">
          <div className="bg-white px-12 py-12 sm:px-8 shadow-lg rounded-lg">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    name="name"
                    value={values.name}
                    onChange={(e) => handleOnChange(e)}
                    type="text"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Mobile
                </label>
                <div className="mt-2">
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={(e) => handleOnChange(e)}
                    type="text"
                    onKeyPress={(e) => {
                      if (!/^[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={10}
                    minLength={10}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleOnChange(e)}
                    type="text"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={(e) => handleOnChange(e)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm/6">
                  {/* <a
                    href="#"
                    className="font-semibold text-primary hover:text-[#B53535] transition duration-300"
                  >
                    Forgot password?
                  </a> */}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center transition rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#B53535] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
              </div>
            </div>

            <div>
              <div className="relative mt-10">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-[#e5e7eb]" />
                </div>
                <div className="relative flex justify-center text-sm/6 font-medium">
                  <span className="bg-white px-6 text-[#111827]">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#111827] shadow-sm hover:shadow-md transition duration-300 ring-1 ring-inset ring-[#d1d5db] hover:bg-[#f9fafb] focus-visible:ring-transparent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm/6 font-semibold">Google</span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#111827] shadow-sm hover:shadow-md transition duration-300 ring-1 ring-inset ring-[#d1d5db] hover:bg-[#f9fafb] focus-visible:ring-transparent"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-5 fill-[#24292F]"
                  >
                    <path
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm/6 font-semibold">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm/6 text-[#6b7280]">
            Already User?{" "}
            <a
              href="/login"
              className="font-semibold text-primary hover:text-[#B53535]"
            >
              Login Here
            </a>
          </p>
        </div>
      </div>
      {/* <div className="py-10">
        <div className="space-y-5 container mx-auto">
          <div>
            <input
              name="name"
              value={values.name}
              onChange={(e) => handleOnChange(e)}
              type="text"
              placeholder="Name"
              className="border border-textcolor focus:outline-0 py-2 px-4 rounded-md"
            />
          </div>
          <div>
            <input
              name="phone"
              value={values.phone}
              onChange={(e) => handleOnChange(e)}
              type="text"
              placeholder="Mobile"
              className="border border-textcolor focus:outline-0 py-2 px-4 rounded-md"
              onKeyPress={(e) => {
                if (!/^[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={10}
              minLength={10}
            />
          </div>
          <div>
            <input
              name="email"
              value={values.email}
              onChange={(e) => handleOnChange(e)}
              type="text"
              placeholder="Email"
              className="border border-textcolor focus:outline-0 py-2 px-4 rounded-md"
            />
          </div>
          <div>
            <input
              name="password"
              value={values.password}
              onChange={(e) => handleOnChange(e)}
              type="password"
              placeholder="Password"
              className="border border-textcolor focus:outline-0 py-2 px-4 rounded-md"
            />
          </div>
          <div>
            <button
              className="border py-3 px-6 rounded-md bg-primary text-white hover:bg-white hover:text-primary transition duration-200"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
}
