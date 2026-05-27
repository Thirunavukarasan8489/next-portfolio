import connectDb from "@/lib/db";
import BlogContent from "@/models/BlogContent";

export async function getBlogMetaByUrl(url) {
  await connectDb();
  const data = await BlogContent.findOne({ url }).lean();

  if (!data) {
    return null;
  }

  return {
    title: data.title,
    description: data.description,
    metatitle: data.metatitle,
    metadescription: data.metadescription,
    keywords: data.keywords,
    date: data.date,
    updatedDate: data.updatedDate,
    author: data.author,
    ogdescription: data.ogdescription,
    ogtitle: data.ogtitle,
    ogurl: data.ogurl,
    ogimg: data.ogimg,
    ogalt: data.ogalt,
    schema: data.schema,
    url: data.url,
  };
}
