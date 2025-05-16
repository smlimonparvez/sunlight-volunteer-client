import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageMyPost = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [beVolunteerPosts, setBeVolunteerPosts] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      // axios
      //   .get(`http://localhost:5000/my-posts?userEmail=${user.email}`)
      axiosSecure
        .get(`/my-posts?userEmail=${user.email}`)
        .then((res) => {
          console.log(res.data);
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
        .get(`http://localhost:5000/be-volunteer-posts?userEmail=${user.email}`)
        .then((res) => {
          console.log(res.data);
          setBeVolunteerPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  const handleDeleteBeVolunteerPost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/delete-be-volunteer-post/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your Post has been deleted.",
          icon: "success",
        });
        // update ui
        setBeVolunteerPosts(
          beVolunteerPosts.filter((volunteerPost) => volunteerPost._id !== id)
        );
      }
    });
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/delete-my-post/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your Post has been deleted.",
          icon: "success",
        });
        // update ui
        setMyPosts(myPosts.filter((mypost) => mypost._id !== id));
      }
    });
  };

  const handleUpdatePost = (id) => {
    navigate(`/update-my-post/${id}`);
  };

  return (
    <div className="w-5/6 mx-auto">
      <h1 className="text-4xl font-bold text-center my-5 p-5">
        My Volunteer Need Post
      </h1>
      <table>
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
                  className="btn btn-ghost"
                >
                  update
                </button>
                <button
                  onClick={() => handleDeletePost(mypost._id)}
                  className="btn btn-ghost"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* second section */}
      <h1 className="text-4xl font-bold text-center my-5 p-5">
        My Volunteer Need Post
      </h1>
      <table>
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
              <td>{new Date(beVolunteerpost.deadline).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() =>
                    handleDeleteBeVolunteerPost(beVolunteerpost._id)
                  }
                  className="btn btn-ghost"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMyPost;
