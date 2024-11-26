import axios from "axios";
import BlogCont from "./blogdynamic";
export async function generateMetadata({ params }) {
  const { blogId } = params;
  const blog = await axios.get(
    `http://localhost:8080/api/blogcontent/${blogId}`
  );
  const desData = blog.data;
  return {
    title: `${blogId.replace(/-/g, " ")}`,
    description: `${desData}`,
  };
}
export default function page({ params }) {
  return (
    <div>
      <BlogCont blogId={params?.blogId} />
    </div>
  );
}
