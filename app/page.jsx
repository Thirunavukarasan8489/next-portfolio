// import Image from "next/image";
import Homepage from "./homepage";
export const metadata = {
  title:
    "Thirunavukarasan is a Freelance Web Developer and Full-Stack Developer",
  keyword:
    "Freelance web Developer, Freelance Full-Stack Developer, Website Developer in Tiruppur, Website Developer in Tamil Nadu, MERN Stack Developer, freelance web developer near me, freelance web developer in tiruppur",
  description:
    "Thirunavukarasan is a Freelance Web Developer and Full-Stack Developer specializing in responsive web design and dynamic web applications. Explore his portfolio and get in touch today!",
  openGraph: {
    title:
      "Thirunavukarasan is a Freelance Web Developer and Full-Stack Developer",
    description:
      "Thirunavukarasan is a Freelance Web Developer and Full-Stack Developer specializing in responsive web design and dynamic web applications. Explore his portfolio and get in touch today!",
    url: "https://thirunavukarasan.dev",
    sitename: "thirunavukarasan.dev",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://thirunavukarasan.dev",
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
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thirunavukarasan A",
    url: "https://thirunavukarasan.dev",
    sameAs: [
      "https://www.linkedin.com/in/thirunavukarasan",
      "https://github.com/Thirunavukarasan8489",
    ],
    jobTitle: "Web Developer, Full-Stack Developer and UI/UX Designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tiruppur",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
  };
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Homepage />
    </div>
  );
}
