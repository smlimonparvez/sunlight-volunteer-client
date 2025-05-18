import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const ManageMyPost = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [beVolunteerPosts, setBeVolunteerPosts] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/my-posts?userEmail=${user.email}`)
        .then((res) => {
          // console.log(res.data);
          setMyPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://rs9-a11-server.vercel.app/be-volunteer-posts?userEmail=${user.email}`
        )
        .then((res) => {
          // console.log(res.data);
          setBeVolunteerPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  const handleDeleteBeVolunteerPost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://rs9-a11-server.vercel.app/delete-be-volunteer-post/${id}`
          );
          // console.log("Delete response:", res.data);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Canceled!",
              text: "Your Post has been canceled.",
              icon: "success",
            });
            // update ui
            setBeVolunteerPosts(
              beVolunteerPosts.filter(
                (volunteerPost) => volunteerPost._id !== id
              )
            );
          } else {
            Swal.fire({
              icon: "error",
              title: "Post Delation Failed",
              text: "Something went wrong!",
            });
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://rs9-a11-server.vercel.app/delete-my-post/${id}`
          );
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Post has been deleted.",
              icon: "success",
            });
            // update ui
            setMyPosts(myPosts.filter((mypost) => mypost._id !== id));
          } else {
            Swal.fire({
              icon: "error",
              title: "Post Delation Failed",
              text: "Something went wrong!",
            });
          }
        } catch (err) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleUpdatePost = (id) => {
    navigate(`/update-my-post/${id}`);
  };

  return (
    <div className="w-5/6 mx-auto my-16">
      {/* helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Posts | Sunlight Volunteer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* My volunteer need post */}
      <div>
        <h1 className="text-4xl font-bold text-center mb-5">
          My Volunteer Need Post
        </h1>
        {myPosts.length === 0 ? (
          <div
            className="p-10 bg-base-100 rounded-box border border-blue-400 relative"
            style={{
              backgroundImage: "url(https://i.postimg.cc/Y0rSTBZv/9264822.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              minHeight: "700px",
            }}
          >
            <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-bold mb-4 dark:text-gray-800">
                You havn't add any request post yet
              </h1>
              <Link to="/add-volunteer" className="btn text-base">
                Add Volunteer Need Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Post Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Dateline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((mypost, index) => (
                  <tr key={index} className="">
                    <td>{mypost.post_title}</td>
                    <td>{mypost.category}</td>
                    <td>{mypost.location}</td>
                    <td>{new Date(mypost.deadline).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleUpdatePost(mypost._id)}
                        className="btn mr-5 mb-2 sm:mb-0"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeletePost(mypost._id)}
                        className="btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* My volunteer request post */}
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          My Volunteer Requested Post
        </h1>
        {beVolunteerPosts.length === 0 ? (
          <div
            className="p-10 bg-base-100 rounded-box border border-blue-400 relative"
            style={{
              backgroundImage: "url(https://i.postimg.cc/Y0rSTBZv/9264822.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              minHeight: "700px",
            }}
          >
            <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-4xl font-bold mb-4 dark:text-gray-800">
                You havn't add any request post yet
              </h1>
              <Link to="/posts" className="btn text-base">
                Add Volunteer Request Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Post Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Dateline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {beVolunteerPosts.map((beVolunteerpost, index) => (
                  <tr key={index} className="">
                    <td>{beVolunteerpost.post_title}</td>
                    <td>{beVolunteerpost.category}</td>
                    <td>{beVolunteerpost.location}</td>
                    <td>
                      {new Date(beVolunteerpost.deadline).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleDeleteBeVolunteerPost(beVolunteerpost._id)
                        }
                        className="btn"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMyPost;
