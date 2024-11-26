import Blogs from "./blogs";
export const metadata = {
  title: "My Blogs",
  description: "my blog page description",
};
export default function page() {
  return (
    <div>
      <Blogs />
    </div>
  );
}
