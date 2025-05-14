import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const { setLoading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/limited-posts")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleClicksDetails = (id) => {
    navigate(`/post-details/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <div key={post._id} className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={post.thumbnail_image}
              alt={post.post_title}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center">
            <h2 className="card-title font-semibold">{post.post_title}</h2>
            <p>
              <span className="font-semibold text-base">Deadline:</span>
              {post.deadline}
            </p>
            <p>
              <span className="font-semibold text-base">Category:</span>
              {post.category}
            </p>
            <div className="card-actions">
              <button onClick={() => handleClicksDetails(post._id)} className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
