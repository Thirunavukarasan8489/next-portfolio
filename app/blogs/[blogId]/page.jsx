import axios from "axios";
import Blogs from "./blogs";
import encryptdecrypt from "@/utils/encryptdecrypt";
export async function generateMetadata({ params }) {
  const { blogId } = params;

  // Encrypt the blogId
  const hashParamId = encryptdecrypt.encryptData(blogId);

  // Fetch blog data from the API
  const blog = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/blogcontent/${hashParamId}`
  );
  const desData = blog.data;

  return {
    title: desData.metatitle || desData.title,
    description: desData.metadescription || desData.description,
    keywords: desData.keywords,
    alternates: {
      canonical: `https://thirunavukarasan.dev/blogs/${desData.url}`,
    },
    openGraph: {
      type: "article",
      title: desData.ogtitle || desData.title,
      description: desData.ogdescription || desData.description,
      url: `https://thirunavukarasan.dev/blogs/${desData.url}`,
      images: [
        {
          url: desData.ogimg,
          width: 1200,
          height: 630,
          alt: desData.ogalt || "Default Alt",
        },
      ],
      publishedTime: desData.date,
      modifiedTime: desData.updatedDate,
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourtwitterhandle",
      title: desData.ogtitle || desData.title,
      description: desData.ogdescription || desData.description,
      image: desData.ogimg,
    },
  };
}

export default async function Page({ params }) {
  const { blogId } = params;

  // Encrypt the blogId
  const hashParamId = encryptdecrypt.encryptData(blogId);

  // Fetch blog data from the API
  const blog = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/blogcontent/${hashParamId}`
  );
  const desData = blog.data;

  // Define the JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: desData.title,
    description: desData.description,
    image: desData.ogimg,
    author: {
      "@type": "Person",
      name: desData.author || "Unknown Author",
    },
    publisher: {
      "@type": "Organization",
      name: "thirunavukarasan.dev",
      logo: {
        "@type": "ImageObject",
        url: "https://thirunavukarasan.dev/logo.png",
      },
    },
    datePublished: desData.date || new Date().toISOString(),
    dateModified: desData.updatedDate || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thirunavukarasan.dev/blogs/${desData.url}`,
    },
  };

  return (
    <div>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Blogs blogId={blogId} />
    </div>
  );
}
