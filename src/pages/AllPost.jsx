import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleClicksDetails = (id) => {
    navigate(`/post-details/${id}`)
  }

  return (
    <div className="my-10">
        <h1 className="text-center text-4xl font-bold mb-10">
        All Volunteer Need Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-11/12 mx-auto">
      {posts.map((post) => (
        <div key={post._id} className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={post.thumbnail_image}
              alt={post.post_title}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-semibold text-xl">{post.post_title}</h2>
            <p className="text-base"><span className="font-semibold text-base">Deadline: </span>{post.deadline}</p>
            <p className="text-base"><span className="font-semibold text-base">Category: </span>{post.category}</p>
            <div className="card-actions">
              <button onClick={() => handleClicksDetails(post._id)} className="btn btn-primary text-base">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default AllPost;
