import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
}

export const BlogCard = ({
  id,
  title,
  content,
  publishedDate,
  authorName,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex flex-row">
        <div>
          <Avatar name={authorName} size={"small"}/>
        </div>
        <div className="font-extralight pl-2 text-sm flex items-center">
          {authorName}
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex items-center">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + '...'}</div>
      <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minutes read`}
      </div>
    </div>
    </Link>
  );
};
