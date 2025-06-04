import Blogs from "./blogs";
export const metadata = {
  title: "All Blogs",
  description: "Blogs Page",
  keyword: "Coding Blogs, Blogs",
  openGraph: {
    title: "All Blogs",
    description: "Blogs Page",
    url: "https://thirunavukarasan.dev/blogs",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://thirunavukarasan.dev/blogs",
  },
  icons: {
    icon: "../favicon.ico",
    shortcut: "../favicon.ico",
    apple: "../favicon.ico",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "../favicon.ico",
    },
  },
};
export default function page() {
  return (
    <div>
      <Blogs />
    </div>
  );
}
