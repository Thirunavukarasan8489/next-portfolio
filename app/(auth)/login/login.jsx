"use client";
import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import encryptdecrypt from "@/utils/encryptdecrypt";
export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useRouter();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    let mylogin = {
      email: values.email,
      password: values.password,
    };
    let data = encryptdecrypt.encryptData(JSON.stringify(mylogin));
    const URL = `http://localhost:8080/api/login`;
    axios
      .post(URL, { data: data })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const now = new Date();
          now.setTime(now.getTime() + 5 * 1000);
          // document.cookie = `BLOG_ACTIVE=${res.data.token};expires=${now.toUTCString()}; path=/`;
          document.cookie = `BLOG_ACTIVE=${res.data.token}; path=/`;
          localStorage.setItem("BLOG_LOG", res.data.enData);
          navigate.push("/dashboard");
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="py-10">
      <div className="space-y-5 container mx-auto">
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
    </div>
  );
}
