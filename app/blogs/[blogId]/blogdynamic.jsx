"use client";
import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/footer";
// import { useState } from "react";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import encryptdecrypt from "@/utils/encryptdecrypt";
import blogapis from "@/utils/blogapis";

const applyFormatting = (text, highlightedText = [], boldText = []) => {
  const parts = text.split(
    new RegExp(`(${[...highlightedText, ...boldText].join("|")})`, "g")
  );
  return parts.map((part, index) => {
    if (highlightedText.includes(part)) {
      return <Highlight key={index} text={part} />;
    }
    if (boldText.includes(part)) {
      return <Bold key={index} text={part} />;
    }
    return part;
  });
};

const Bold = ({ text }) => <b>{text}</b>;
const Highlight = ({ text }) => (
  <span className="rounded-md py-0.5 px-1 bg-[#f8c0c0]">{text}</span>
);
const Paragraph = ({ text, highlightedText = [], boldText = [] }) => {
  return (
    <p className="text-text text-h6 font-medium leading-relaxed tracking-wide pb-3">
      {applyFormatting(text, highlightedText, boldText)}
    </p>
  );
};

const Header = ({ text, highlightedText = [], boldText = [] }) => {
  return (
    <p className="font-bold text-h3 pb-2 mt-5">
      {applyFormatting(text, highlightedText, boldText)}
    </p>
  );
};
const List = ({ items, highlightedText = [], boldText = [] }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} className="flex items-center space-x-2 pb-2">
        <VscDebugBreakpointData className="text-primary w-[5%] font-medium text-h6" />
        <p className="text-h6 font-medium w-[95%] text-text">
          {applyFormatting(item, highlightedText, boldText)}
        </p>
      </li>
    ))}
  </ul>
);

const CodeBlock = ({ coding, name }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const codeText = coding;
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setInterval(() => {
        setCopied(false);
      }, 3000);
    });
  };
  return (
    <>
      {/* <div className="relative bg-textblack text-white font-mono p-4 sm:p-6 lg:px-8 rounded-lg xl:w-[700px] lg:w-[700px] mb-3">
                <div className="sticky top-0">
                    <div className="absolute top-0 left-0 bg-primary text-white px-2 py-1 rounded text-sm">{name}</div>
                </div>
                <div className="sticky top-0">
                    <button
                        onClick={() => handleCopy()}
                        className="absolute top-0 right-0 bg-text hover:bg-textcolor text-white px-2 py-1 rounded text-sm"
                    >
                        {copied ? <p>&#x2713; Copied</p> : <p>Copy Code</p>}
                    </button>
                </div>
                <pre className="whitespace-pre overflow-x-scroll scrollbar-thin scrollbar-thumb-textcolor scrollbar-track-text py-4 pt-9">
                    <code>{coding}</code>
                </pre>
            </div> */}
      <div className="relative bg-[#282c34] font-mono sm:p-6 rounded-lg xl:w-[680px] lg:w-[680px]">
        {/* <div className=''> */}
        <div className="sticky top-0">
          <div className="absolute top-0 left-0 bg-primary text-white px-2 py-1 rounded text-sm">
            {name}
          </div>
        </div>
        <div className="sticky top-0">
          <button
            onClick={() => handleCopy()}
            className="absolute top-0 right-0 bg-text hover:bg-textcolor text-white px-2 py-1 rounded text-sm"
          >
            {copied ? <p>&#x2713; Copied</p> : <p>Copy Code</p>}
          </button>
        </div>
        {/* </div> */}
        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          wrapLongLines
          className="xl:!p-[2.5em] lg:!p-[2.5em] md:!p-[2.5em] mdsm:!p-[2.5em] sm:!p-[1em]"
        >
          {coding}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

const Input = ({ type, placeholder }) => (
  <input type={type} placeholder={placeholder} />
);

const Radio = ({ name, options }) => (
  <div>
    {options.map((option, index) => (
      <label key={index}>
        <input type="radio" name={name} value={option.value} />
        {option.label}
      </label>
    ))}
  </div>
);

const Textarea = ({ placeholder }) => (
  <textarea placeholder={placeholder} rows="4" cols="50" />
);

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Video = ({ src }) => (
  <div>
    <video width="320" height="240" controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

const Image = ({ text, alt }) => (
  <img src={text} alt={alt} className="rounded-lg mb-6" draggable="false" />
);

const Iframe = ({ src, title }) => (
  <iframe
    src={src}
    title={title}
    width="320"
    height="240"
    frameBorder="0"
    allowFullScreen
  />
);

// Main Component
const componentsMap = {
  paragraph: Paragraph,
  highlightedText: Highlight,
  heading: Header,
  list: List,
  codeblock: CodeBlock,
  input: Input,
  radio: Radio,
  textarea: Textarea,
  button: Button,
  video: Video,
  image: Image,
  iframe: Iframe,
};

const RenderComponent = ({ data }) => {
  const { type, ...props } = data;
  const Component = componentsMap[type];
  return Component ? <Component {...props} /> : null; // Render component or null if type is not found
};

const BlogCont = ({ blogId }) => {
  const { blogLinks } = blogapis();
  const blogs = blogLinks;
  const blog = blogs?.find(
    (b) =>
      b.title?.replace(/\s+/g, "-")?.toLowerCase() === blogId?.toLowerCase()
  );
  // console.log("blogDescription :", blog?.description);
  if (!blog) {
    return <p>Blog not found</p>; // Handle blog not found case
  }

  // const { title, date, image, blogContent } = blog;
  // Title Map
  // const title = blogs.map((v) => v.title);
  // Blog Date Map
  // const Blogdate = blogs.map((v) => v.date);
  // Blog Image Map
  // const BlogImage = blogs.map((v, i) => <img key={i} src={v.image} alt={v.title} className="rounded-lg pb-6" />);
  // Bolg content Map
  // const contBlog = blogs.map((v) => v);
  return (
    <div className="bg-[#f9fafd]">
      {/* <Helmet>
                <title>{blog.title}</title>
            </Helmet> */}
      <BlogNavbar navName={blog.title} Blogdate={blog.date} />
      <div className="container mx-auto xl:px-24 lg:px-2 md:px-2 mdsm:px-5 sm:px-5">
        {blog && (
          <div>
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-lg mb-6"
              draggable="false"
            />
            <div className="xl:flex lg:flex gap-5">
              <div className="p-4 flex-1">
                {/* Render Image */}
                {/* <h1 className="font-bold text-h3 pb-2">{blog.title}</h1> */}
                {/* Render Blog Content */}
                {blog.blogContent.map((contentItem, index) => (
                  <RenderComponent key={index} data={contentItem} />
                ))}
              </div>
              {/* Sticky sidebar image */}
              <div className="p-3 w-full xl:w-1/4 lg:w-1/4 xl:sticky lg:sticky top-10 h-full">
                <img
                  src={blog.sideimage}
                  alt="Sticky Blog Image"
                  className="rounded-lg"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="container mx-auto xl:px-24 lg:px-2 md:px-2 mdsm:px-5 sm:px-5">
                <img src={BlogImg || image} alt={title} className="rounded-lg pb-6" />
                <div className="xl:flex lg:flex gap-5">
                    <div className="p-4 flex-1">
                        {blogContent.map((contentItem, index) => (
                            <RenderComponent key={index} data={contentItem} />
                        ))}
                    </div>
                    <div className="p-3 w-full xl:w-1/4 lg:w-1/4 xl:sticky lg:sticky top-10 h-full">
                        <img src={BlogImg} alt="Sticky Blog Image" className="rounded-lg" />
                    </div>
                </div>
            </div> */}

      <Footer />
    </div>
  );
};

export default BlogCont;
