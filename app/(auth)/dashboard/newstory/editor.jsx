"use client";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AiOutlinePlus } from "react-icons/ai";
import {
  FaRegImages,
  FaListCheck,
  FaCode,
  FaHeading,
  FaParagraph,
  FaHighlighter,
  FaLink,
  FaXmark,
} from "react-icons/fa6";
import { FaBold, FaItalic } from "react-icons/fa6";
import { MdOutlineHideImage } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import EncryptDecrypt from "../Utils/EncryptDecrypt";
import encryptdecrypt from "@/utils/encryptdecrypt";
const Editor = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [blocks, setBlocks] = useState([]);
  const fileInputRef = useRef(null);
  const clickRef = useRef();
  const [local, setLocal] = useState();
  const getLocal = () => {
    const getUser = localStorage.getItem("BLOG_LOG");
    const deData = JSON.parse(encryptdecrypt.decryptData(getUser));
    setLocal(deData);
  };
  useEffect(() => {
    getLocal();
  }, []);
  // console.log(local);
  // Add new block
  const addBlock = (type) => {
    let newBlock = {};
    if (type === "paragraph") {
      newBlock = {
        id: Date.now(),
        type: "paragraph",
        text: "",
        highlightedText: [],
        boldText: [],
        isEditing: true,
      };
    } else if (type === "list") {
      newBlock = {
        id: Date.now(),
        type: "list",
        items: [],
        highlightedText: [],
        boldText: [],
        isEditing: true,
      };
    } else if (type === "codeblock") {
      newBlock = {
        id: Date.now(),
        type: "codeblock",
        name: "",
        coding: "",
        isEditing: true,
      };
    } else if (type === "heading") {
      newBlock = {
        id: Date.now(),
        type: "heading",
        text: "",
        highlightedText: [],
        boldText: [],
        isEditing: true,
      };
    } else if (type === "image") {
      newBlock = {
        id: Date.now(),
        type: "image",
        text: "",
        alt: "",
        isEditing: true,
      };
    }
    setBlocks([...blocks, newBlock]);
    setIsAdding(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!clickRef?.current?.contains(event?.target)) {
        setIsAdding(false);
      }
    });
  });

  // Update block text
  const updateBlock = (id, newText) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, ...newText } : block
    );
    setBlocks(updatedBlocks);
  };

  // Delete a block
  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const deleteImage = (id) => {
    setImage(blocks.filter((block) => block.id !== id));
    setImage("");
  };

  // Toggle edit mode
  const toggleEditMode = (id) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, isEditing: !block.isEditing } : block
      )
    );
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    const token = getCookie("BLOG_ACTIVE");
    const textEditorContent = {
      id: Date.now(),
      uid: local.id,
      title: title.toLowerCase(),
      description,
      author: local.name,
      category,
      image,
      date: new Date().toLocaleDateString(),
      blogContent: blocks,
    };
    const URL = "http://localhost:8080/api/blogcontent";
    axios
      .post(URL, textEditorContent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log("Data Posted Sucessfully");
        alert("Data Posted Sucessfully");
        console.log(data);
      })
      .catch((err) => {
        console.log("Data Not Posted");
        alert("Data Not Posted");
        console.log(err);
      });
    localStorage.setItem("BlogData", JSON.stringify(textEditorContent));
    setBlocks([]);
    setCategory("");
    setDescription("");
    setImage("");
    setTitle("");
  };

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const savedBlocks = JSON.parse(localStorage.getItem("BlogData"));
    if (savedBlocks) {
      setBlocks(savedBlocks);
      setTitle(savedBlocks.title);
      setDescription(savedBlocks.description);
      setCategory(savedBlocks.category);
      setImage(savedBlocks.image);
      setBlocks(savedBlocks.blogContent);
    } else {
      console.log("No data found in localStorage.");
    }
  };

  // Move block for drag-and-drop
  const moveBlock = (dragIndex, hoverIndex) => {
    const dragBlock = blocks[dragIndex];
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, dragBlock);
    setBlocks(updatedBlocks);
  };

  // Handle image upload
  const handleImageUpload = (event, id) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBlock(id, { text: reader.result });
    };
    if (file) {
      reader?.readAsDataURL(file);
    } else {
    }
  };

  const applyFormat = (format, id) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // Exit if no text selected

    const selectedText = selection.toString().trim(); // Get selected text
    if (!selectedText) return; // Exit if no valid text is selected

    // Enable design mode for execCommand
    document.designMode = "on";

    let toggleOff = false; // Variable to track if we are removing the format

    // Handle the formatting with toggle logic
    switch (format) {
      case "bold":
        if (document.queryCommandState("bold")) {
          document.execCommand("removeFormat", false, null); // Remove bold
          toggleOff = true;
        } else {
          document.execCommand("bold", false, null); // Apply bold
        }
        break;

      case "italic":
        if (document.queryCommandState("italic")) {
          document.execCommand("removeFormat", false, null); // Remove italic
          toggleOff = true;
        } else {
          document.execCommand("italic", false, null); // Apply italic
        }
        break;

      case "highlight":
        const isHighlighted =
          window.getComputedStyle(selection.anchorNode.parentNode)
            .backgroundColor === "rgb(255, 255, 0)"; // Check if text is highlighted
        if (isHighlighted) {
          document.execCommand("removeFormat", false, null); // Remove highlight
          toggleOff = true;
        } else {
          document.execCommand("backColor", false, "yellow"); // Apply highlight
        }
        break;

      case "link":
        const url = prompt("Enter the URL for the link:", "https://");
        if (url) {
          document.execCommand("createLink", false, url); // Apply link
        } else {
          return; // Exit if no URL provided
        }
        break;

      default:
        return; // Exit for unsupported formats
    }
    document.designMode = "off"; // Disable design mode after applying execCommand

    // Now, we need to update the blocks array and toggle the array entries
    const updatedBlocks = blocks.map((block) => {
      if (block.id === id) {
        // Clone the boldText and highlightedText arrays
        const newBoldText = [...block.boldText];
        const newItalicText = [...(block.italicText || [])]; // Add italic array if not present
        const newHighlightedText = [...block.highlightedText];

        // Update arrays based on the format and toggle
        if (format === "bold") {
          if (toggleOff) {
            // Remove bold if toggling off
            const index = newBoldText.indexOf(selectedText);
            if (index > -1) newBoldText.splice(index, 1); // Remove from array
          } else {
            newBoldText.push(selectedText); // Add bold text
          }
        }

        if (format === "italic") {
          if (toggleOff) {
            // Remove italic if toggling off
            const index = newItalicText.indexOf(selectedText);
            if (index > -1) newItalicText.splice(index, 1); // Remove from array
          } else {
            newItalicText.push(selectedText); // Add italic text
          }
        }

        if (format === "highlight") {
          if (toggleOff) {
            // Remove highlight if toggling off
            const index = newHighlightedText.indexOf(selectedText);
            if (index > -1) newHighlightedText.splice(index, 1); // Remove from array
          } else {
            newHighlightedText.push(selectedText); // Add highlighted text
          }
        }

        // Return the updated block with updated arrays
        return {
          ...block,
          boldText: newBoldText, // Update bold text array
          italicText: newItalicText, // Update italic text array
          highlightedText: newHighlightedText, // Update highlighted text array
        };
      }
      return block; // Return unchanged block for other blocks
    });

    setBlocks(updatedBlocks); // Update the state with the modified blocks

    // Clear the selection to avoid text remaining highlighted
    selection.removeAllRanges();
  };

  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const renderFormattedText = (text, highlightedText = [], boldText = []) => {
    // Split text by highlighted and bold text
    let formattedText = text;

    // Apply highlighted text
    highlightedText.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, "gi");
      formattedText = formattedText.replace(regex, "<mark>$1</mark>");
    });

    // Apply bold text
    boldText.forEach((bold) => {
      const regex = new RegExp(`(${bold})`, "gi");
      formattedText = formattedText.replace(regex, "<strong>$1</strong>");
    });

    // Using dangerouslySetInnerHTML to render the formatted HTML
    return { __html: formattedText };
  };
  const [copied, setCopied] = useState(false);
  const handleCopy = (coding) => {
    const codeText = coding;
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setInterval(() => {
        setCopied(false);
      }, 3000);
    });
  };
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mdsm:grid-cols-1 sm:grid-cols-1 gap-4 mx-10">
      <div>
        {/* Metadata Inputs */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray rounded"
            placeholder="Blog Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray rounded"
            placeholder="Blog Description"
          />
          {/* <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="block w-full p-2 mb-2 border border-gray rounded"
                        placeholder="Author Name"
                    /> */}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-2 mb-2 border border-gray rounded"
            placeholder="Category"
          />
          {/* <input type="file" accept="image/*" onChange={handleCoverImageUpload} className="block w-full p-2 mb-2" /> */}
          {/* {image && <img src={image} alt="Cover" className="mb-4" width="200" />} */}

          {image ? (
            <div className="flex relative">
              <img src={image} alt="Cover" draggable="false" className="mb-4" />
              <button
                onClick={deleteImage}
                title="delete"
                className="absolute p-2 bg-primary text-white right-0 rounded-bl-md hover:bg-white transition duration-300 hover:text-primary"
              >
                <FaXmark />
              </button>
            </div>
          ) : (
            <div>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <MdOutlineHideImage
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span className="text-primary">Upload a file</span>
                      <input
                        id="file-upload"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {/* <input type="file" accept="image/*" onChange={handleCoverImageUpload} className="block w-full p-2 mb-2" /> */}
            </div>
          )}
        </div>
        <div className="max-w-4xl mx-auto">
          <DndProvider backend={HTML5Backend}>
            {blocks.map((block, index) => (
              <DraggableBlock
                key={block.id}
                index={index}
                block={block}
                moveBlock={moveBlock}
                updateBlock={updateBlock}
                deleteBlock={deleteBlock}
                toggleEditMode={toggleEditMode}
                applyFormat={applyFormat}
                handleImageUpload={handleImageUpload}
                fileInputRef={fileInputRef}
              />
            ))}
          </DndProvider>

          <div ref={clickRef} className="mb-4 relative flex items-center">
            <button
              onClick={() => setIsAdding(!isAdding)}
              title={`${
                !isAdding
                  ? "Add an image, heading, paragraphs and videos"
                  : "Close Menu"
              }`}
              className="bg-primary p-3 rounded-full "
            >
              <AiOutlinePlus
                className={`text-white text-h6 ${
                  isAdding ? "rotate-45 " : "rotate-0"
                } transition duration-150`}
              />
            </button>
            {isAdding && (
              <div className="absolute p-3 shadow-lg left-14 space-x-3 rounded z-50 bg-[#f9fafd] border-l-[3px] border-primary">
                <button
                  onClick={() => addBlock("heading")}
                  title="Add Heading"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-full"
                >
                  <FaHeading />
                </button>
                <button
                  onClick={() => addBlock("paragraph")}
                  title="Add Paragraph"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-full"
                >
                  <FaParagraph />
                </button>
                <button
                  onClick={() => addBlock("codeblock")}
                  title="Add Code Block"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-full"
                >
                  <FaCode />
                </button>
                <button
                  onClick={() => addBlock("list")}
                  title="Add List Items"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-full"
                >
                  <FaListCheck />
                </button>
                <button
                  onClick={() => addBlock("image")}
                  title="Add Image"
                  className="border border-primary text-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-full"
                >
                  <FaRegImages />
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                saveToLocalStorage();
              }}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                loadFromLocalStorage();
              }}
              className="px-4 py-2 bg-primary text-white rounded-md ml-4"
            >
              Load from LocalStorage
            </button>
          </div>

          {/* Hidden file input for image upload */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(event) => handleImageUpload(event, null)}
          />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-center text-h3 pb-2 mt-5">{title}</h1>
        <p className="text-text text-center text-h6 font-medium leading-relaxed tracking-wide pb-3">
          {description}
        </p>
        {/* <p className="text-sm text-gray-500 mb-2">By: {author}</p> */}
        <p className="text-sm text-gray-500 mb-4">Category: {category}</p>
        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Cover"
              draggable="false"
              className="mb-4 rounded-md"
            />
          </div>
        )}
        <div>
          {blocks.map((block) => (
            <div key={block.id} className="mb-4">
              {block.type === "heading" && (
                <h2
                  className="text-2xl font-bold"
                  dangerouslySetInnerHTML={renderFormattedText(
                    block.text,
                    block.highlightedText,
                    block.boldText
                  )}
                />
              )}
              {block.type === "paragraph" && (
                <p
                  dangerouslySetInnerHTML={renderFormattedText(
                    block.text,
                    block.highlightedText,
                    block.boldText
                  )}
                />
              )}
              {block.type === "list" && (
                <ul className="list-disc pl-5">
                  {block.items.map((item, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={renderFormattedText(
                        item,
                        block.highlightedText,
                        block.boldText
                      )}
                    />
                  ))}
                </ul>
              )}
              {block.type === "codeblock" && (
                <div>
                  {/* <pre className="bg-gray-800 text-white p-4 rounded">
                                        <code>{block.coding}</code>
                                    </pre> */}
                  <div className="relative bg-[#282c34] font-mono sm:p-6 rounded-lg xl:w-[680px] lg:w-[680px]">
                    <div className="sticky top-0">
                      <div className="absolute top-0 left-0 bg-primary text-white px-2 py-1 rounded text-sm">
                        {block.name}
                      </div>
                    </div>
                    <div className="sticky top-0">
                      <button
                        onClick={() => handleCopy(block.coding)}
                        className="absolute top-0 right-0 bg-text hover:bg-textcolor text-white px-2 py-1 rounded text-sm"
                      >
                        {copied ? <p>&#x2713; Copied</p> : <p>Copy Code</p>}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      wrapLongLines
                      className="xl:!p-[2.5em] lg:!p-[2.5em] md:!p-[2.5em] mdsm:!p-[2.5em] sm:!p-[1em]"
                    >
                      {block.coding}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}
              {block.type === "image" && (
                <div>
                  <img src={block.text} alt={block.alt} draggable="false" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableBlock = ({
  block,
  index,
  moveBlock,
  updateBlock,
  deleteBlock,
  toggleEditMode,
  applyFormat,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "block",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: "block",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  const handelImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBlock(block.id, { text: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const codeLanguage = [
    "javaScript",
    "python",
    "java",
    "php",
    "C",
    "C++",
    "TypeScript",
    "Kotlin",
    "Dart",
    "Ruby",
    "sql",
    "mongoDb",
  ];
  const textareaRef = useRef(null);
  // Function to auto-resize the textarea
  const handleResize = (e) => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Ensure textarea exists before accessing its style
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
    updateBlock(block.id, { coding: e.target.value });
  };

  // Adjust the height when component mounts (in case of existing content)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Ensure textarea exists
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);
  // useEffect(() => {
  //     const textarea = document.getElementById('autoresizing');
  //     textarea.addEventListener('input', autoResize, false);
  //     function autoResize() {
  //         this.style.height = 'auto';
  //         this.style.height = this.scrollHeight + 'px';
  //     }
  // });
  return (
    <div className="">
      <div
        ref={(node) => dragRef(dropRef(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="mb-4 pb-2 relative"
      >
        {/* Edit or View Mode */}
        {block.isEditing ? (
          <div>
            {block.type === "heading" && (
              <div>
                {/* <input
                                    type="text"
                                    className="w-full text-2xl font-bold border border-textcolor rounded-md p-4"
                                    value={block.text}
                                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                    placeholder="Heading"
                                /> */}
                <div
                  contentEditable
                  className="w-full text-2xl font-bold border border-textcolor rounded-md p-4 mb-3"
                  onBlur={(e) =>
                    updateBlock(block.id, { text: e.target.innerText })
                  }
                  placeholder="Heading"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
                {/* Add toolbar for text formatting */}
                <div className="space-x-3">
                  <button
                    onClick={() => applyFormat("bold", block.id)}
                    title="Apply Bold"
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaBold className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("italic", block.id)}
                    title="Italic"
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaItalic className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("highlight", block.id)}
                    title="Highlight Marker"
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaHighlighter className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("link", block.id)}
                    title="Add Link"
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaLink className="text-primary" />
                  </button>
                </div>
              </div>
            )}
            {block.type === "paragraph" && (
              <div>
                {/* <textarea
                                    type="text"
                                    className="w-full border border-textcolor rounded-md p-4"
                                    value={block.text}
                                    onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                                    placeholder="Write your paragraph here..."
                                /> */}
                <div
                  contentEditable
                  className="w-full border border-textcolor rounded-md p-4 mb-3"
                  onBlur={(e) =>
                    updateBlock(block.id, { text: e.target.innerText })
                  }
                  placeholder="Write your paragraph here..."
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
                <div className="space-x-3">
                  <button
                    onClick={() => applyFormat("bold", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaBold className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("italic", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaItalic className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("highlight", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaHighlighter className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("link", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaLink className="text-primary" />
                  </button>
                </div>
              </div>
            )}
            {block.type === "codeblock" && (
              <div>
                <select
                  onChange={(e) =>
                    updateBlock(block.id, { name: e.target.value })
                  }
                >
                  <option style={{ display: "none" }}>Select Language</option>
                  {codeLanguage.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <textarea
                  // id="autoresizing"
                  ref={textareaRef}
                  type="text"
                  className="w-full border border-textcolor rounded-md p-4"
                  value={block.text}
                  onChange={handleResize}
                  // onChange={(e) => updateBlock(block.id, { coding: e.target.value })}
                  placeholder="Write your code here..."
                />
              </div>
            )}
            {block.type === "list" && (
              <div>
                <textarea
                  type="text"
                  className="w-full border border-textcolor rounded-md p-4"
                  value={block.text}
                  onChange={(e) =>
                    updateBlock(block.id, { items: e.target.value.split("\n") })
                  }
                  placeholder="Enter list items (one per line)"
                />
                <div className="space-x-3">
                  <button
                    onClick={() => applyFormat("bold", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaBold className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("italic", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaItalic className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("highlight", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaHighlighter className="text-primary" />
                  </button>
                  <button
                    onClick={() => applyFormat("link", block.id)}
                    className="border border-primary p-1.5 rounded-full"
                  >
                    <FaLink className="text-primary" />
                  </button>
                </div>
              </div>
            )}
            {block.type === "image" && (
              <div>
                {block.text ? (
                  <div>
                    <img
                      src={block.text}
                      alt="Uploaded"
                      draggable="false"
                      className="w-full border border-textcolor rounded-md px-4"
                    />
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handelImage}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    />
                  </div>
                )}
                <input
                  onChange={(e) =>
                    updateBlock(block.id, { alt: e.target.value })
                  }
                  placeholder="Enter Alt text"
                  className="border border-textcolor rounded-md focus:outline-0 px-4 py-1"
                  required
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            {block.type === "heading" && (
              <h2 className="text-2xl">{block.text}</h2>
            )}
            {block.type === "paragraph" && <p>{block.text}</p>}
            {block.type === "codeblock" && (
              <pre className="bg-gray-100 p-4">{block.text}</pre>
            )}
            {block.type === "list" && (
              <ul className="list-disc pl-5">
                {block.items.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
            {block.type === "image" && (
              <img
                src={block.text}
                alt="Uploaded"
                draggable="false"
                className="w-full"
              />
            )}
          </div>
        )}

        <div className="flex space-x-2 justify-end">
          {/* <button onClick={() => toggleEditMode(block.id)} className="bg-primary text-white border rounded-md px-2 py-1">
                        {block.isEditing ? 'Save' : 'Edit'}
                    </button> */}
          <button
            onClick={() => deleteBlock(block.id)}
            className="border border-red text-red rounded-md px-2 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
