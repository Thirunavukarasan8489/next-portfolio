"use client";
// import blogapis from "@/utils/blogapis";
import BlogNavbar from "@/components/BlogNavbar";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useEffect, useMemo } from "react";
import Footer from "@/components/footer";
import useCheckApi from "./checkApi";

const headingSizeMap = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
  5: "text-lg",
  6: "text-base",
};

const Header = ({ data }) => {
  const headingClass = headingSizeMap[data.level] || "text-base";
  return (
    <p
      className={`${headingClass} pb-2 mt-5 font-bold`}
      dangerouslySetInnerHTML={{ __html: data.text.replace(/&nbsp;/g, " ") }}
    />
  );
};

// const Paragraph = ({ data }) => (
//   <p
//     className="text-text text-h5 leading-relaxed tracking-wide pb-3"
//     dangerouslySetInnerHTML={{
//       __html: data.text.replace(/&nbsp;/g, " ").replace(/&#39;/g, "'"),
//     }}
//   />
// );
const Paragraph = ({ data }) => {
  const processedText = data.text
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(
      /<a /g,
      '<a target="_blank" class="font-medium underline hover:text-primary transition-all" '
    );

  return (
    <p
      className="text-text text-h5 leading-relaxed tracking-wide pb-3"
      dangerouslySetInnerHTML={{
        __html: processedText,
      }}
    />
  );
};

const Image = ({ data }) => (
  <div className="pb-8">
    <img src={data.file.url} alt={data.caption} className="rounded-lg w-full" />
  </div>
);

const Delimiter = () => (
  <div className="flex justify-center items-center">
    <p className="xl:text-h2 lg:text-h3 md:text-h4 mdsm:text-h5 sm:text-h6 text-textblack">
      * * *
    </p>
  </div>
);

const List = ({ data }) => (
  <ul className={`list-${data.style === "ordered" ? "decimal" : "disc"}`}>
    {data.items.map((item, index) => (
      <li key={index} className="flex items-center space-x-2 pb-2">
        <VscDebugBreakpointData className="text-primary w-[5%] font-medium text-h6" />
        <p
          className="text-h5 w-[95%] text-text"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </li>
    ))}
  </ul>
);

const CodeBlock = ({ data, name }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const codeText = data.code;
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setInterval(() => {
        setCopied(false);
      }, 3000);
    });
  };
  return (
    <>
      <div className="relative bg-[#282c34] font-mono sm:p-6 rounded-lg xl:w-[680px] lg:w-[680px]">
        <div className="sticky top-0">
          <button
            onClick={handleCopy}
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
          {data.code}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

const componentsMap = {
  header: Header,
  paragraph: Paragraph,
  image: Image,
  list: List,
  code: CodeBlock,
  delimiter: Delimiter,
};

const RenderComponent = ({ block }) => {
  const { type, data } = block;
  const Component = componentsMap[type];
  return Component ? <Component data={data} /> : null;
};

export default function Blogss({ blogId }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const { checkLinks } = useCheckApi();
  const [cachedBlogLinks, setCachedBlogLinks] = useState(null);

  // useEffect(() => {
  //   const fetchBlog = () => {
  //     const blogs = blogLinks;
  //     const foundBlog = blogs?.find(
  //       (b) =>
  //         b.url?.replace(/\s+/g, "-")?.toLowerCase() === blogId?.toLowerCase()
  //     );
  //     setBlog(foundBlog || null);
  //     setLoading(false);
  //   };

  //   if (blogId && blogLinks) {
  //     fetchBlog();
  //   }
  // }, [blogId, blogLinks]);
  useEffect(() => {
    // Cache the blogLinks if not already cached
    if (!cachedBlogLinks && checkLinks) {
      setCachedBlogLinks(checkLinks);
    }
  }, [checkLinks, cachedBlogLinks]);

  useEffect(() => {
    if (blogId && cachedBlogLinks) {
      const foundBlog = cachedBlogLinks.find(
        (b) =>
          b.url?.replace(/\s+/g, "-")?.toLowerCase() === blogId?.toLowerCase()
      );
      setBlog(foundBlog || null);
      setLoading(false);
    }
  }, [blogId, cachedBlogLinks]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate); // Convert the string into a Date object
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center text-lg">No data found</p>;
  }

  return (
    <div className="bg-[#f9fafd]">
      <BlogNavbar
      // navName={blog.metatitle}
      // Blogdate={formatDate(blog.date.split(" ")[2])}
      />
      <div className="container mx-auto xl:px-60 lg:px-36 md:px-2 mdsm:px-5 sm:px-5">
        {/* <div> */}
        {/* <div className="flex justify-center">
            <img
              src={blog.bannerimg}
              alt={blog.metatitle}
              className="rounded-lg mb-6"
              draggable="false"
            />
          </div> */}
        <div className="xl:flex lg:flex gap-5">
          <div className="p-4 flex-1">
            <p className="text-center pb-5 text-h6 font-medium text-textcolor">
              Posted on : {formatDate(blog.updatedDate)}
            </p>
            {blog.blogContent[0].blocks.map((block) => (
              <RenderComponent key={block.id} block={block} />
            ))}
          </div>
          {/* <div className="p-3 w-full xl:w-1/4 lg:w-1/4 xl:sticky lg:sticky top-10 h-full">
              <img
                src={blog.bannerimg}
                alt="Sticky Blog Image"
                className="rounded-lg"
                draggable="false"
              />
            </div> */}
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
}
