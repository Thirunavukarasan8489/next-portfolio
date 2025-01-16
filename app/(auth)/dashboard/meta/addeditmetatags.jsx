"use client";
import encryptdecrypt from "@/utils/encryptdecrypt";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FaRegUser, FaChevronRight, FaSearch } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Editor", href: "/dashboard/newstory", current: false },
  { name: "Meta", href: "/dashboard/meta", current: true },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Addeditmetatags() {
  const [search, setSearch] = useState("");
  const urlsearch = useSearchParams();
  const [ogimg, setOgimg] = useState();
  const getMeta = urlsearch.get("addmeta");
  const editMeta = urlsearch.get("editmeta");
  const navigate = useRouter();
  const imgclearRef = useRef();
  // console.log("getMeta: ", getMeta, "editMeta:", editMeta);
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
  const tok =
    typeof window !== "undefined"
      ? JSON.parse(encryptdecrypt.decryptData(localStorage.getItem("BLOG_LOG")))
      : {};

  const resizeAndCompressImage = (img, targetSizeKB) => {
    if (typeof window === "undefined") return;
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      const maxDimension = 1000; // Maximum width/height in pixels

      // Resize image to fit within the maxDimension
      if (width > height) {
        if (width > maxDimension) {
          height *= maxDimension / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width *= maxDimension / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const compress = (quality) => {
        return canvas.toDataURL("image/jpeg", quality);
      };

      let quality = 0.9; // Initial quality
      let compressedImage = compress(quality);

      // Iteratively reduce quality to achieve the target size
      const targetSizeBytes = targetSizeKB * 1024;
      while (compressedImage.length > targetSizeBytes && quality > 0.1) {
        quality -= 0.1;
        compressedImage = compress(quality);
      }

      resolve(compressedImage);
    });
  };

  const handleBannerImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || typeof window === "undefined") return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = async () => {
        const compressedImage = await resizeAndCompressImage(img, 100); // Compress to ~100KB
        const compressedImageSize = (compressedImage.length * (3 / 4)) / 1024; // Size in KB
        if (compressedImageSize <= 100) {
          console.log(
            `Image compressed successfully to ~${compressedImageSize.toFixed(
              2
            )} KB`
          );
          setOgimg(compressedImage);
        } else {
          alert("Unable to compress the image to the desired size.");
          imgclearRef.current.value = null;
          setOgimg("");
        }
      };
    };
    // reader.onloadend = () => {
    //   setOgimg(reader.result);
    // };
    reader.readAsDataURL(file);
  };

  const getEditMeta = () => {
    const blogid = editMeta ? editMeta : getMeta;
    console.log(blogid);
    const enData = encryptdecrypt.encryptData(JSON.stringify(blogid));
    const URL = `${process.env.NEXT_PUBLIC_HOST}/editid/${enData}`;
    const token = document.cookie
      .split("; ") // Split the cookies into an array of individual cookies
      .find((row) => row.startsWith("BLOG_ACTIVE=")) // Find the cookie with the key 'BLOG_ACTIVE'
      ?.split("=")[1]; // Extract the value (the token)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(URL, { headers })
      .then((res) => {
        let deCodeData = JSON.parse(encryptdecrypt.decryptData(res.data));
        console.log("decode edit data : ", deCodeData);
        setValues(deCodeData);
        // setOgimg()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEditMeta();
  }, []);

  const handelMetaSave = (metaStatus) => {
    let metaDatas = {
      blogid: getMeta ? getMeta : editMeta,
      metatitle: values?.metatitle,
      metadescription: values.metadescription,
      keywords: values.keywords,
      schema: values.schema,
      ogtitle: values.ogtitle,
      ogdescription: values.ogdescription,
      ogurl: values.ogurl,
      ogalt: values.ogalt,
      ogimg: ogimg,
      ismetapublished: metaStatus,
    };
    console.log("metaDatas : ", metaDatas);
    const enData = encryptdecrypt.encryptData(JSON.stringify(metaDatas));
    const URL = `${process.env.NEXT_PUBLIC_HOST}/createmeta`;
    const token = document.cookie
      .split("; ") // Split the cookies into an array of individual cookies
      .find((row) => row.startsWith("BLOG_ACTIVE=")) // Find the cookie with the key 'BLOG_ACTIVE'
      ?.split("=")[1]; // Extract the value (the token)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(URL, { data: enData }, { headers })
      .then((res) => {
        // console.log('data:', res);
        if (res.status === 200) {
          alert(res.data);
          navigate.back();
        } else {
          alert("Meta Data Not Posted");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Capitalize helper
  const capitalizeFirstLetter = (val) =>
    val ? String(val).charAt(0).toUpperCase() + String(val).slice(1) : "";
  return (
    <>
      <div className="min-h-full">
        <div className="bg-primary pb-32">
          <Disclosure
            as="nav"
            className="border-b border-bordercolor bg-primary lg:border-none"
          >
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-bordercolor">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="hidden lg:ml-10 lg:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-[#B53535] text-white"
                              : "text-white hover:bg-[#B53535]/75",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
                    <input
                      name="search"
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search"
                      aria-label="Search"
                      className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white/40 sm:text-sm/6"
                    />
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                    />
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-primary p-2 text-indigo-200 hover:bg-[#B53535]/75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      aria-hidden="true"
                      className="block text-white size-6 group-data-[open]:hidden"
                    />
                    <XMarkIcon
                      aria-hidden="true"
                      className="hidden text-white size-6 group-data-[open]:block"
                    />
                  </DisclosureButton>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="relative shrink-0 rounded-full bg-primary p-1 text-offwhit hover:text-bordercolor focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon aria-hidden="true" className="size-6" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 shrink-0">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-primary text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt=""
                            src={user.imageUrl}
                            className="size-8 rounded-full"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            <button
                              className="block w-full text-left px-3 py-1 text-sm/6 text-[#111827] data-[focus]:bg-[#f9fafb] data-[focus]:outline-none"
                              onClick={() => logOut()}
                            >
                              {item.name}
                            </button>
                          </MenuItem>
                        ))}
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-[#B53535] text-white"
                        : "text-white hover:bg-[#B53535]/75",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="border-t border-[#B53535] pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-indigo-300">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto shrink-0 rounded-full bg-primary p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      className="block rounded-md px-3 py-2 text-base font-medium text-white w-full hover:bg-[#B53535]/75"
                    >
                      <button
                        className="block w-full text-left px-3 py-1 text-sm/6 text-white data-[focus]:bg-[#f9fafb] data-[focus]:outline-none"
                        onClick={() => logOut()}
                      >
                        {item.name}
                      </button>
                    </DisclosureButton>
                  ))}
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {`${capitalizeFirstLetter(tok?.name)}'s`} Dashboard
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-2">
              <div className="container mx-auto px-4 py-3">
                <div>
                  <div className="">
                    <p className="text-primary font-semibold pb-3 text-h4">
                      {getMeta ? "Add Meta Datas" : "Edit Meta Datas"}
                    </p>
                    <div className="flex flex-wrap justify-between pb-6">
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
                          Meta Description{" "}
                          <span className="text-primary ">*</span>
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
                          name="schema"
                          value={values.schema}
                          onChange={(e) => {
                            handelChange(e);
                          }}
                          className="block rounded-md bg-white px-3 py-1.5 text-base text-[#111827] outline outline-1 -outline-offset-1 outline-[#d1d5db] placeholder:text-[#9ca3af] focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                        />
                      </div>
                    </div>
                    <p className="text-primary font-semibold pb-3 text-h4">
                      {getMeta ? "Add OG Tags" : "Edit OG Tags"}
                    </p>
                    <div className="flex flex-wrap justify-between pb-6">
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
                          OG Description{" "}
                          <span className="text-primary ">*</span>
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
                          htmlFor="file_input"
                          className="block text-sm/6 font-medium text-[#111827]"
                        >
                          Select your Blog OG Image{" "}
                          <span className="text-primary ">*</span>
                        </label>
                        {ogimg && (
                          <img
                            src={ogimg}
                            alt="Cover"
                            className="py-4"
                            width="200"
                          />
                        )}
                        <input
                          ref={imgclearRef}
                          id="file_input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleBannerImageUpload(e);
                          }}
                          className="block w-full text-sm text-textblack
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-primary file:text-white
        hover:file:bg-[#B53535]
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-primary
      "
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
              </div>
              <div className="flex justify-center space-x-8">
                <button
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                  onClick={() => handelMetaSave("meta")}
                >
                  {getMeta ? "Save Meta" : "Save Edit Meta"}
                </button>
                <button
                  onClick={() => {
                    navigate.back();
                  }}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
