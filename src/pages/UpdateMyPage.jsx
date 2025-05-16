import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useParams } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const UpdateMyPage = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post-details/${id}`)
      .then((res) => {
        setPost(res.data);
        setStartDate(new Date(res.data.deadline));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

   const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...post,
        deadline: startDate,
      };
      const response = await axios.put(`http://localhost:5000/update-my-post/${id}`, postData);
      if (response.status === 200) {
        Swal.fire({
          title: "Post Updated Successfully!",
          icon: "success",
          draggable: true,
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center my-5 p-5">
        Update My Volunteer Need Post
      </h1>
      <form
        onSubmit={handleSubmitUpdate}
        className="bg-base-200 p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto"
      >
        {/* Thumbnail Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Thumbnail Image URL:
          </label>
          <input
            type="text"
            name="thumbnail_image"
            value={post.thumbnail_image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Post Title */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Post Title:
          </label>
          <input
            type="text"
            name="post_title"
            value={post.post_title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            name="category"
            value={post.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Social Service">Social Service</option>
            <option value="Animal Welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={post.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* No. of volunteers needed */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            No. of Volunteers Needed:
          </label>
          <input
            type="number"
            name="total_volunteer_need"
            value={post.total_volunteer_need}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Deadline:
          </label>
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Organizer name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Organizer name:
          </label>
          <input
            type="text"
            name="organizer_name"
            value={user?.displayName}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
          />
        </div>

        {/* organizer email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Organizer Email:
          </label>
          <input
            type="email"
            name="organizer_email"
            value={user?.email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMyPage;
