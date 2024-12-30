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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Editor", href: "/dashboard/newstory", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [getData, setGetData] = useState();
  const [search, setSearch] = useState("");
  const [publishStatus, setPublishStatus] = useState({});
  const navigate = useRouter();
  const logOut = () => {
    localStorage.clear();
    document.cookie = "BLOG_ACTIVE" + "=; expires=Thu, 01-Jan-24 00:00:01 GMT;";
    navigate.push("/login");
  };
  // const [tok, setTok] = useState(null);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const data = localStorage.getItem("BLOG_LOG");
  //     if (data) {
  //       const decryptedData = JSON.parse(encryptdecrypt.decryptData(data));
  //       setTok(decryptedData);
  //     }
  //   }
  // }, []);
  const tok = JSON.parse(
    encryptdecrypt.decryptData(localStorage.getItem("BLOG_LOG"))
  );

  const getUserBlog = () => {
    try {
      const token = document.cookie
        .match(/BLOG_ACTIVE/)
        .input.replace("BLOG_ACTIVE=", "");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let hashId = encryptdecrypt.encryptData(tok?.id);
      const URL = `${process.env.NEXT_PUBLIC_HOST}/getusercontent/${hashId}`;
      axios
        .get(URL, { headers })
        .then((res) => {
          let deContent = JSON.parse(encryptdecrypt.decryptData(res.data));
          setGetData(deContent);
        })
        .catch((err) => {
          if (err.response.data.message === "JWT token expired") {
            localStorage.clear();
            document.cookie =
              "BLOG_ACTIVE" + "=; expires=Thu, 01-Jan-24 00:00:01 GMT;";
            navigate.push("/login");
          } else {
            console.log(err);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserBlog();
  }, []);

  const linkSlug = getData?.map((blog) => ({
    ...blog,
    link: `/dashboard/${blog.url}`,
  }));

  const formatDateDDMMYYYY = (inputDate) => {
    const date = new Date(inputDate); // Convert the string into a Date object
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const filteredCards = linkSlug?.filter(
    (card) =>
      card?.metatitle?.toLowerCase()?.includes(search.toLowerCase()) ||
      card?.author?.toLowerCase()?.includes(search.toLowerCase()) ||
      card?.category?.toLowerCase()?.includes(search.toLowerCase())
  );

  const handleEdit = (v) => {
    let hashId = encryptdecrypt.encryptData(v._id);
    navigate.push(`/dashboard/newstory?edit=${hashId}`);
  };

  const getPublishedUnpublished = () => {
    const token = document.cookie
      .match(/BLOG_ACTIVE/)
      .input.replace("BLOG_ACTIVE=", "");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const tokId = encryptdecrypt.encryptData(tok.id);
    const URL = `${process.env.NEXT_PUBLIC_HOST}/getpublish/${tokId}`;
    axios
      .get(URL, { headers })
      .then((res) => {
        const statusMap = {};
        res.data.forEach((item) => {
          const { id, ispublished } = item;
          statusMap[id] = ispublished; // Directly map "Published" or "Unpublished"
        });
        setPublishStatus(statusMap);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPublishedUnpublished();
  }, []);

  const handlePublishToggle = (id) => {
    console.log("Id pub : ", id);
    const currentStatus = publishStatus[id] || "Unpublished";
    console.log(currentStatus);
    const newStatus =
      currentStatus === "Published" ? "Unpublished" : "Published";
    console.log("newStatus : ", newStatus);
    setPublishStatus((prev) => ({ ...prev, [id]: newStatus }));
    console.log(`Post ID: ${id}, New Status: ${newStatus}`);
    const token = document.cookie
      .match(/BLOG_ACTIVE/)
      .input.replace("BLOG_ACTIVE=", "");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let hashIdd = encryptdecrypt.encryptData(id);
    const URL = `${process.env.NEXT_PUBLIC_HOST}/setpublish/${hashIdd}`;
    let myjson = { ispublished: newStatus };
    const hashData = encryptdecrypt.encryptData(JSON.stringify(myjson));
    axios
      .put(URL, { enData: hashData }, { headers })
      .then(() => {
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (v) => {
    try {
      const token = document.cookie
        .match(/BLOG_ACTIVE/)
        .input.replace("BLOG_ACTIVE=", "");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let hashId = encryptdecrypt.encryptData(v);
      const URL = `${process.env.NEXT_PUBLIC_HOST}/delete/${hashId}`;
      axios
        .delete(URL, { headers })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            getUserBlog();
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

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
              <div className="container mx-auto px-4 py-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards?.length ? (
                    filteredCards.map((v, i) => (
                      <div
                        key={i}
                        className="bg-white p-4 group shadow-lg rounded-lg overflow-hidden transition hover:-translate-y-3 hover:shadow-2xl border-[1px] border-bordercolor duration-300 ease-in-out flex flex-col justify-between"
                      >
                        <div className="flex flex-col h-full">
                          <img
                            src={v.bannerimg}
                            alt={v.metatitle}
                            className="w-full h-48 object-cover rounded-lg transition-all group-hover:scale-105 group-hover:shadow-xl"
                          />
                          <div className="mt-auto">
                            <div>
                              <div className="flex items-center justify-between text-textblack mb-4 mt-4">
                                <div className="flex items-center space-x-2 roboto-regular">
                                  <FaRegUser />
                                  <span>{capitalizeFirstLetter(v.author)}</span>
                                </div>
                                <div className="flex items-center space-x-2 roboto-regular">
                                  <IoPricetagOutline />
                                  <span>
                                    {capitalizeFirstLetter(v.category)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr className="text-bordercolor pb-5" />
                            <h3 className="text-h6 text-text font-medium mb-5 group-hover:underline underline-offset-2 group-hover:text-primary">
                              <Link href={v.link}>{v.metatitle}</Link>
                            </h3>
                            <hr className="text-bordercolor pb-5" />
                            <div className="flex justify-between items-center text-sm text-textblack pb-3">
                              <div className="flex items-center space-x-2">
                                <Link
                                  href={v.link}
                                  className="text-base hover:underline roboto-regular"
                                >
                                  Read More
                                </Link>
                                <span>
                                  <FaChevronRight />
                                </span>
                              </div>
                              <div className="flex items-center text-base space-x-2 roboto-regular">
                                <MdOutlineDateRange className="text-textblack" />
                                <span>{formatDateDDMMYYYY(v.updatedDate)}</span>
                              </div>
                            </div>
                            <div className="2xl:flex xl:flex lg:flex mdsm:block sm:block 2xl:justify-between xl:justify-between lg:justify-between mdsm:text-center sm:text-center items-end mt-3 2xl:space-x-2 xl:space-x-2 lg:space-x-2 mdsm:space-x-0 sm:space-x-0 mdsm:space-y-3 sm:space-y-3">
                              <div>
                                <button
                                  className="bg-primary text-white mdsm:w-full sm:w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handleEdit(v);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div>
                                <button
                                  className="bg-primary text-white mdsm:w-full sm:w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handlePublishToggle(v._id);
                                  }}
                                >
                                  {publishStatus[v._id] === "Published"
                                    ? "Unpublish"
                                    : "Publish"}
                                </button>
                              </div>
                              <div>
                                <button
                                  className="bg-primary text-white mdsm:w-full sm:w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handleDelete(v._id);
                                  }}
                                >
                                  Delete
                                </button>
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
          </div>
        </main>

        {/* <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-2">
              <div className="container mx-auto px-4 py-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCards?.length ? (
                    filteredCards.map((v, i) => (
                      <div
                        key={i}
                        className="bg-white group shadow-lg rounded-lg overflow-hidden transition hover:-translate-y-3 hover:shadow-2xl border-[1px] border-bordercolor duration-300 ease-in-out"
                      >
                        <img
                          src={v.bannerimg}
                          alt={v.metatitle}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4 border-t-2 border-primary">
                          <div className="">
                            <div className="flex items-center justify-between text-textblack mb-4">
                              <div className="flex items-center space-x-2 roboto-regular">
                                <FaRegUser />
                                <span>{capitalizeFirstLetter(v.author)}</span>
                              </div>
                              <div className="flex items-center space-x-2 roboto-regular">
                                <IoPricetagOutline />
                                <span>{capitalizeFirstLetter(v.category)}</span>
                              </div>
                            </div>
                            <hr className="text-bordercolor pb-5" />
                            <h3 className="text-h6 text-text font-medium mb-5 hover:underline underline-offset-2 group-hover:text-primary">
                              <Link href={v.link}>{v.metatitle}</Link>
                            </h3>
                            <hr className="text-bordercolor pb-5" />
                            <div className="flex justify-between items-end text-sm text-textblack pb-3">
                              <div className="flex items-center space-x-2">
                                <Link
                                  href={v.link}
                                  className="text-base hover:underline roboto-regular"
                                >
                                  Read More{" "}
                                </Link>
                                <span>
                                  <FaChevronRight />
                                </span>
                              </div>
                              <div className="flex items-center text-base space-x-2 roboto-regular">
                                <MdOutlineDateRange className="text-textblack" />
                                <span>{formatDateDDMMYYYY(v.updatedDate)}</span>
                              </div>
                            </div>
                            <div className="2xl:flex xl:flex lg:flex mdsm:block sm:block 2xl:justify-between xl:justify-between lg:justify-between mdsm:text-center sm:text-center mdsm:space-y-4 sm:space-y-4 items-end">
                              <div>
                                <button
                                  className="bg-primary text-white w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handleEdit(v);
                                  }}
                                >
                                  Edit
                                </button>
                              </div>
                              <div>
                                <button
                                  className="bg-primary text-white w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handlePublishToggle(v._id);
                                  }}
                                >
                                  {publishStatus[v._id] === "Published"
                                    ? "Unpublish"
                                    : "Publish"}
                                </button>
                              </div>
                              <div>
                                <button
                                  className="bg-primary text-white w-full py-1 px-5 rounded-md hover:bg-[#B53535]"
                                  onClick={() => {
                                    handleDelete(v._id);
                                  }}
                                >
                                  Delete
                                </button>
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
          </div>
        </main> */}
      </div>
    </>
  );
}
