"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function Addeditmetatags() {
  const urlsearch = useSearchParams();
  const getMeta = urlsearch.get("addmeta");
  const editMeta = urlsearch.get("editmeta");
  const navigate = useRouter();
  console.log("getMeta: ", getMeta, "editMeta:", editMeta);
  const [values, setValues] = useState({
    blogid: getMeta,
    metatitle: "",
    metadescription: "",
    keywords: "",
    schema: "",
    ogtitle: "",
    ogdescription: "",
    ogurl: "",
    ogalt: "",
    ismetapublished: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div>
      <div>Meta</div>
      <div className="flex justify-center py-10">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              Meta Title <span className="text-primary ">*</span>
            </label>
            <input
              name="metatitle"
              value={values.metatitle}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="metadescription"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              Meta Description <span className="text-primary ">*</span>
            </label>
            <input
              name="metadescription"
              value={values.metadescription}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              Keywords <span className="text-primary ">*</span>
            </label>
            <input
              name="keywords"
              value={values.keywords}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              Schema <span className="text-primary ">*</span>
            </label>
            <textarea
              name="keywords"
              value={values.keywords}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              OG Title <span className="text-primary ">*</span>
            </label>
            <input
              name="ogtitle"
              value={values.ogtitle}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              OG Description <span className="text-primary ">*</span>
            </label>
            <input
              name="ogdescription"
              value={values.ogdescription}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              OG url <span className="text-primary ">*</span>
            </label>
            <input
              name="ogurl"
              value={values.ogurl}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-[#111827]"
            >
              OG alt <span className="text-primary ">*</span>
            </label>
            <input
              name="ogalt"
              value={values.ogalt}
              onChange={(e) => {
                handelChange(e);
              }}
              className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
