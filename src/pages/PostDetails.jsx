import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../auth/AuthProvider";

const PostDetails = () => {
  const { setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const navigete = useNavigate();
  const {
    _id,
    post_title,
    deadline,
    category,
    thumbnail_image,
    description,
    organizer_email,
    organizer_name,
    location,
    total_volunteer_need,
  } = postDetails;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post-details/${id}`)
      .then((res) => {
        setPostDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleClickVolunteer = (id) => {
    navigete(`/be-volunteer/${id}`)
  }
 
  return (
    <div className="my-10">
       <h1 className="text-center text-4xl font-bold mb-10">
        Volunteer Need Post Details
      </h1>
      <div className="card bg-base-200 shadow-sm w-4/6 mx-auto">
        <figure className="px-10 pt-10">
          <img
            src={thumbnail_image}
            alt={post_title}
            className="rounded-xl w-full"
          />
        </figure>
        <div className="card-body p-10">
          <h2 className="card-title font-semibold text-2xl">{post_title}</h2>
          <p className="text-base">
            <span className="font-semibold text-base">Deadline: </span>
            {deadline}
          </p>
          <p className="text-base">
            <span className="font-semibold text-base">Category: </span>
            {category}
          </p>
          <p className="text-base">
            <span className="font-semibold text-base">Location: </span>
            {location}
          </p>
          <p className="text-base">
            <span className="font-semibold text-base">No. of Volunteer Need: </span>
            {total_volunteer_need}
          </p>
          <p className="text-base">
            <span className="font-semibold text-base">Description: </span>
            {description}
          </p>
           <p className="text-base">
            <span className="font-semibold text-base">Organizer Name: </span>
            {organizer_name}
          </p>
          <p className="text-base">
            <span className="font-semibold text-base">Organizer Email: </span>
            {organizer_email}
          </p>
          <div className="card-actions">
            <button
              onClick={() => handleClickVolunteer(_id)}
              className="btn btn-primary text-base mt-5"
            >
            Be A Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
