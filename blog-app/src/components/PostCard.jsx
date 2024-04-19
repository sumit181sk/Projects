import service from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-neutral-900 rounded-xl p-1">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          ></img>
          <h2 className="text-lg font-medium pt-2 text-white">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
