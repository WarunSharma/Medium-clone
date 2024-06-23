import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkelton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading)
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkelton />
            <BlogSkelton />
            <BlogSkelton />
            <BlogSkelton />
            <BlogSkelton />
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            key={blog.id}
            title={blog.title}
            content={blog.title}
            publishedDate={"May 12, 2024"}
            authorName={"Warun Sharma"}
          />
        ))}
      </div>
    </div>
  );
};
