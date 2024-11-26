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
      const URL = `http://localhost:8080/api/create`;
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
    <div className="py-10">
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
    </div>
  );
}
