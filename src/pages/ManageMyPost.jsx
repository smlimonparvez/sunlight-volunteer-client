import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";

const ManageMyPost = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-posts?userEmail=${user.email}`)
        .then((res) => {
            console.log(res.data)
          setMyPosts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  return (
    <div className="w-5/6 mx-auto">
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
                  <button className="btn btn-ghost">update</button>
                  <button className="btn btn-ghost">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
   
    </div>
  );
};

export default ManageMyPost;
