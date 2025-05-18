import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoIosSearch } from "react-icons/io";
import { LuLayoutGrid } from "react-icons/lu";
import { useNavigate } from "react-router";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    axios
      .get("https://rs9-a11-server.vercel.app/posts")
      .then((res) => {
        setPosts(res.data);
        setFilteredPosts(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleClicksDetails = (id) => {
    navigate(`/post-details/${id}`);
  };

  const handleSearch = () => {
    const filterd = posts.filter((post) => {
      return post.post_title
        .toLowerCase()
        .includes(searchText.toLocaleLowerCase());
    });
    setFilteredPosts(filterd);
  };

  const toggleLayout = () => {
    setIsTableView(!isTableView);
  };

  return (
    <div className="my-10 w-11/12 mx-auto">
      {/* helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Post | Sunlight Volunteer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <h1 className="text-center text-4xl font-bold mb-10">
        All Volunteer Need Posts
      </h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-2">
        <h1 className="font-semibold text-lg">Search Post Based On Title:</h1>
        <div className="flex justify-end">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by post title..."
            className="input input-bordered border border-blue-400  w-full md:w-1/2"
          />
          <button className="btn border border-blue-400" onClick={handleSearch}>
            <IoIosSearch className="text-lg" /> search
          </button>
        </div>
      </div>

      {/* toggle button */}
      <button
        className="btn border border-blue-400 mb-10"
        onClick={toggleLayout}
      >
        <LuLayoutGrid className="text-xl" />{" "}
        {isTableView ? "Show Card View" : "Show Table View"}
      </button>

      {/* conditional rendaring layuot */}
      {isTableView ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Post Image</th>
                <th>Post Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Dateline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr key={index} className="">
                  <td>
                    <img
                      className="rounded w-14 h-14"
                      src={post.thumbnail_image}
                      alt={post.post_title}
                    />
                  </td>
                  <td>{post.post_title}</td>
                  <td>{post.category}</td>
                  <td>{post.location}</td>
                  <td>{new Date(post.deadline).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleClicksDetails(post._id)}
                      className="btn btn-primary text-base"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src={post.thumbnail_image}
                  alt={post.post_title}
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-semibold text-xl">
                  {post.post_title}
                </h2>
                <p className="text-base">
                  <span className="font-semibold text-base">Deadline: </span>
                  {post.deadline}
                </p>
                <p className="text-base">
                  <span className="font-semibold text-base">Category: </span>
                  {post.category}
                </p>
                <div className="card-actions">
                  <button
                    onClick={() => handleClicksDetails(post._id)}
                    className="btn btn-primary text-base"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
