import encryptdecrypt from "@/utils/encryptdecrypt";
import Blogss from "./blog";
import axios from "axios";
export async function generateMetadata({ params }) {
  const { checkblog } = params;
  let hashParamId = encryptdecrypt.encryptData(checkblog)
  const blog = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/blogcontent/${hashParamId}`
  );
  const desData = blog.data;

  return {
    title: `${desData.title}`,
    description: `${desData.description}`,
  };
}
export default function page({ params }) {
  return (
    <div>
      <Blogss blogId={params?.checkblog} />
    </div>
  );
}
