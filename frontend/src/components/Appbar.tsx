import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Appbar = () => {
  return (
    <div className={"flex justify-between border-b px-10 py-4"}>
      <Link
        to={"/blogs"}
        className={"flex items-center cursor-pointer text-2xl font-medium"}
      >
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>
        <Avatar name={"Warun Sharma"} size="large" />
      </div>
    </div>
  );
};