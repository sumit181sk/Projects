import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Button, Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!authStatus) {
    // User is not logged in
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-md">
              <h3 className="text-2xl font-thin text-white">Nothing to see here...</h3>
              <br></br>
              <h3 className="text-2xl font-light text-gray-100 mb-4 tracking-wide">
                  Please <span className="text-4xl">Login</span> to Add & View Posts
              </h3>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (authStatus && posts.length === 0) {
    // User is logged in but has no posts
    return (
    <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="w-full max-w-md">
              <h1 className="font-light text-4xl text-white mb-6 tracking-wide">
                Add Some Posts
              </h1>
              <p className="font-thin text-lg text-white mb-8">
                Share your thoughts and experiences with others!
              </p>
              <Button className="border-black p-2 font-light hover:bg-[#87812f] hover:text-white hover:transition-transform duration-300">
              <Link to='/add-post' className="font-light ">
                Create your first post now
              </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // User is logged in and has posts
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
