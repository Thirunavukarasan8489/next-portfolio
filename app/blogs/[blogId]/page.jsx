import { notFound } from "next/navigation";
import Blogs from "./blogs";
import { getBlogMetaByUrl } from "@/lib/blog-content";

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  const desData = await getBlogMetaByUrl(blogId);

  if (!desData) {
    return {
      title: "Blog Not Found",
      description: "The requested blog was not found.",
    };
  }

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
  const { blogId } = await params;
  const desData = await getBlogMetaByUrl(blogId);

  if (!desData) {
    notFound();
  }

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
