export const metadata = {
  title: "Blog Editor",
  description: "New blog Editor for Blog Writers",
};
export default function layout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
