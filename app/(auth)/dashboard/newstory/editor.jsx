"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
// import { EDITOR_JS_TOOLS } from "./tools";
import "./editor.css";
import axios from "axios";
import dynamic from "next/dynamic";
import encryptdecrypt from "@/utils/encryptdecrypt";
import { useRouter, useSearchParams } from "next/navigation";
const EDITOR_JS_TOOLS = dynamic(() => import("./tools"), {
  ssr: false, // Disable SSR for this component
});
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};
const Editor = ({ editorBlock }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [editorInstance, setEditorInstance] = useState(null);
  const [isEditorInitialized, setEditorInitialized] = useState(false);
  const [bannerimg, setBannerimg] = useState();
  const imgclearRef = useRef();
  const navigate = useRouter();
  const urlsearch = useSearchParams();
  const getEditId = urlsearch.get("edit");
  const [showEditor, setShowEditor] = useState(false);
  const getBlogDetails =
    typeof window !== "undefined"
      ? JSON.parse(encryptdecrypt.decryptData(localStorage.getItem("BLOG_LOG")))
      : {};

  const [values, setValues] = useState({
    uid: getBlogDetails.id,
    metatitle: "",
    metadescription: "",
    author: getBlogDetails.name,
    category: "",
    url: "",
    ispublished: "",
  });

  const ref = useRef();

  const editById = () => {
    if (typeof window !== "undefined" && getEditId) {
      setShowEditor(true);
      try {
        const token = document.cookie
          .match(/BLOG_ACTIVE/)
          .input.replace("BLOG_ACTIVE=", "");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const URL = `${process.env.NEXT_PUBLIC_HOST}/editid/${getEditId}`;
        axios
          .get(URL, { headers })
          .then((res) => {
            let decodeEditData = JSON.parse(
              encryptdecrypt.decryptData(res.data)
            );
            // setting a data to input boxes for edit
            const blockss = decodeEditData.blogContent[0].blocks.map(
              (block) => {
                if (block.type === "list") {
                  return {
                    ...block,
                    data: {
                      ...block.data,
                      items: block.data.items.map((item) =>
                        typeof item === "object" ? item.content : item
                      ),
                    },
                  };
                }
                return block;
              }
            );
            setValues(decodeEditData);
            // setting a image for edit
            setBannerimg(decodeEditData.bannerimg);
            // setting a blog content for edit
            setData({
              time: new Date().getTime(),
              blocks: blockss,
              // blocks: decodeEditData.blogContent[0].blocks.map((v) => v) || [],
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowEditor(false);
      // console.log("No");
    }
  };
  useEffect(() => {
    editById();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (editorInstance && data) {
  //       editorInstance?.blocks
  //         ?.render(data) // Dynamically load content into the editor
  //         .catch((err) => console.error("Failed to render editor data:", err));
  //     }
  //   }, 500);
  // }, [data, editorInstance]);

  useEffect(() => {
    // Render the initial data only once when editorInstance and data are ready
    if (showEditor) {
      setTimeout(() => {
        if (editorInstance && data && !isEditorInitialized) {
          editorInstance?.blocks
            ?.render(data) // Dynamically load initial content into the editor
            .then(() => {
              // console.log("Initial data successfully loaded into Editor.js");
              setEditorInitialized(true); // Mark as initialized
            })
            .catch((err) =>
              console.error("Failed to render editor data:", err)
            );
        }
      }, 500);
    }
  }, [editorInstance, data, isEditorInitialized]);

  // useEffect(() => {
  //   if (editorInstance && data.blocks && data.blocks.length > 0) {
  //     // Clear the editor and render new blocks
  //     editorInstance
  //       .clear()
  //       .then(() => editorInstance.blocks.render(data.blocks))
  //       .catch((err) =>
  //         console.error("Failed to render blocks in editor:", err)
  //       );
  //   }
  // }, [data, editorInstance]);

  useEffect(() => {
    if (typeof window !== "undefined" && !ref.current) {
      const editor = new EditorJS({
        holder: "editorjs-container",
        data: data,
        tools: EDITOR_JS_TOOLS,
        placeholder: "Start typing your story...",
        async onChange(api) {
          try {
            const updatedData = await api.saver.save();
            setData(updatedData); // Update state with new blocks
          } catch (error) {
            console.error("Error saving editor data:", error);
          }
        },
      });
      ref.current = editor;
      setEditorInstance(editor);
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

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
          setBannerimg(compressedImage);
        } else {
          alert("Unable to compress the image to the desired size.");
          imgclearRef.current.value = null;
          setBannerimg("");
        }
      };
    };
    // reader.onloadend = () => {
    //   setBannerimg(reader.result);
    // };
    reader.readAsDataURL(file);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = async (publishStatus) => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const url = values.metatitle
          .toLowerCase()
          .replace(/[^a-z0-9\s-.]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        let metaDatas = {
          uid: getBlogDetails.id,
          url: url,
          metatitle: values.metatitle,
          metadescription: values.metadescription,
          author: getBlogDetails.name,
          bannerimg: bannerimg,
          category: values.category,
          blogContent: outputData,
          ispublished: publishStatus,
        };

        const enData = encryptdecrypt.encryptData(JSON.stringify(metaDatas));
        const URL = `${process.env.NEXT_PUBLIC_HOST}/blogcontent`;
        const token = document.cookie
          .match(/BLOG_ACTIVE/)
          .input.replace("BLOG_ACTIVE=", "");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .post(URL, { data: enData }, { headers })
          .then((res) => {
            if (res.status === 200) {
              alert(res.data);
              setBannerimg(""); // Clear banner image
              setValues({
                uid: "",
                metatitle: "",
                metadescription: "",
                author: "",
                category: "",
                url: "",
              });
              imgclearRef.current.value = null;
              setData(INITIAL_DATA); // Clear editor content
              ref.current.clear(); // Clear editor instance content
              // console.log("Data posted successfully");
              navigate.push("/dashboard");
            } else {
              console.log("Data not posted");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Saving failed:", error);
      }
    }
  };

  const handleUpdateBlog = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        const url = values.metatitle
          .toLowerCase()
          .replace(/[^a-z0-9\s-.]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");

        let metaDatas = {
          url: url,
          metatitle: values.metatitle,
          metadescription: values.metadescription,
          author: getBlogDetails.name,
          bannerimg: bannerimg,
          category: values.category,
          blogContent: outputData,
        };
        const enData = encryptdecrypt.encryptData(JSON.stringify(metaDatas));
        const URL = `${process.env.NEXT_PUBLIC_HOST}/edit/${getEditId}`;
        const token = document.cookie
          .match(/BLOG_ACTIVE/)
          .input.replace("BLOG_ACTIVE=", "");

        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .put(URL, { data: enData }, { headers })
          .then((res) => {
            // console.log(res);
            if (res.status === 200) {
              alert(res.data);
              navigate.push("/dashboard");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    navigate.back();
  };

  return (
    <div>
      {showEditor ? (
        <>
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
                    values.metatitle = e.target.value;
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
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Enter your Blog Category{" "}
                  <span className="text-primary ">*</span>
                </label>
                <input
                  name="category"
                  value={values.category}
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
                  Select your Blog Thumbnail Image{" "}
                  <span className="text-primary ">*</span>
                </label>
                {bannerimg && (
                  <img
                    src={bannerimg}
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
            </div>
          </div>
          <div>
            <p className="text-center font-medium text-[#111827] pb-10">
              Edit your Story here 👇
            </p>
            <div id={editorBlock}></div>
            <div className="py-5 fixed bottom-0 w-full z-10 bg-[#f9fafd] border-y-primary border-t-2 ">
              <div className="flex justify-center space-x-8">
                <button
                  onClick={handleUpdateBlog}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Update Blog
                </button>
                <button
                  onClick={handleCancel}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
                  htmlFor="category"
                  className="block text-sm/6 font-medium text-[#111827]"
                >
                  Enter your Blog Category{" "}
                  <span className="text-primary ">*</span>
                </label>
                <input
                  name="category"
                  value={values.category}
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
                  Select your Blog Thumbnail Image{" "}
                  <span className="text-primary ">*</span>
                </label>
                {bannerimg && (
                  <img
                    src={bannerimg}
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
            </div>
          </div>
          <div>
            <p className="text-center font-medium text-[#111827] pb-10">
              Start Write your Story here 👇
            </p>
            <div id={editorBlock}></div>
            <div className="py-5 fixed bottom-0 w-full z-10 bg-[#f9fafd] border-y-primary border-t-2 ">
              <div className="flex justify-center space-x-8">
                <button
                  onClick={() => {
                    handleSave("Published");
                  }}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Save & Publish
                </button>
                <button
                  onClick={() => {
                    handleSave("Unpublished");
                  }}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Save Only
                </button>
                <button
                  onClick={handleCancel}
                  className="border-[1.5px] border-primary font-semibold py-2 px-6 shadow-md text-primary rounded-md flex hover:bg-primary transition duration-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Editor);
