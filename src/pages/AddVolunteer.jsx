import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    thumbnail_image: "",
    post_title: "",
    category: "",
    location: "",
    description: "",
    total_volunteer_need: "",
    organizer_name: user?.displayName,
    organizer_email: user?.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const postData = {
        ...formData,
        deadline: startDate,
      };
      const response = await axios.post("http://localhost:5000/add-post", postData);
      if (response.status === 200) {
        Swal.fire({
          title: "Post Created Successfully!",
          icon: "success",
          draggable: true,
        });
      }

      // form reset
      setFormData({
        thumbnail_image: "",
        post_title: "",
        category: "",
        location: "",
        description: "",
        total_volunteer_need: "",
        organizer_name: user?.displayName,
        organizer_email: user?.email,
      });
      // date reset
      setStartDate(new Date());

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
        Add Volunteer Need Post
      </h1>
      <form
        onSubmit={handleSubmit}
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
            value={formData.thumbnail_image}
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
            value={formData.post_title}
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
            value={formData.category}
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
            value={formData.location}
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
            value={formData.description}
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
            value={formData.total_volunteer_need}
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
            dateFormat="MM/dd/yyyy"
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
          {isSubmitting ? "Submitting..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddVolunteer;
