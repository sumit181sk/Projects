import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 border rounded-xl border-yellow-600">
      <Container>
        <div className="w-full flex justify-center mb-4 relative  p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && post && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 hover:duration-200 hover:bg-[#6d6826] rounded-full"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="hover:duration-200 hover:bg-[#6d6826] rounded-full"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl text-white font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-white">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
