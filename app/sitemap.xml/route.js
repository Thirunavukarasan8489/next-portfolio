export async function GET() {
  const dynamicRoutes = [
    {
      slug: "how-to-send-whatsapp-messages-using-node.js-and-whatsapp-web.js",
      updatedAt: "2025-02-02",
    },
    {
      slug: "how-to-create-a-contact-form-using-html-javascript-and-php-with-mysqlmariadb",
      updatedAt: "2025-01-05",
    },
  ];
  const staticRoutes = ["", "blogs"];
  const baseUrl = `https://thirunavukarasan.dev`;
  const urls = [
    ...staticRoutes.map(
      (route) => `
        <url>
          <loc>${baseUrl}/${route}</loc>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `
    ),
    ...dynamicRoutes.map(
      ({ slug, updatedAt }) => `
        <url>
          <loc>${baseUrl}/blog/${slug}</loc>
          <lastmod>${updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
    ),
  ].join("");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${urls}
    </urlset>`;
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
