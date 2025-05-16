import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../auth/AuthProvider";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const BeAVolunteer = () => {
  const { user, setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [status, setStatus] = useState("Requested");

  useEffect(() => {
    axios
      .get(`https://rs9-a11-server.vercel.app/post-details/${id}`)
      .then((res) => {
        setPost(res.data);
        setStartDate(new Date(res.data.deadline));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (post.total_volunteer_need <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Volunteers Needed",
        text: "This opportunity has already reached its volunteer limit.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const volunteerData = {
        _id: post._id,
        thumbnail_image: post.thumbnail_image,
        post_title: post.post_title,
        description: post.description,
        category: post.category,
        location: post.location,
        deadline: post.deadline,
        total_volunteer_need: post.total_volunteer_need,
        organizer_name: post.organizer_name,
        organizer_email: post.organizer_email,
        volunteer_name: user?.displayName,
        volunteer_email: user?.email,
        suggestion,
        status,
      };

      const response = await axios.post(
        "https://rs9-a11-server.vercel.app/be-volunteer",
        volunteerData
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Request submitted successfully!",
          icon: "success",
          draggable: true,
        });
      }
      setSuggestion("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "You are Already Applied",
        text: err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-16">
      {/* helmet */}
            <Helmet>
              <meta charSet="utf-8" />
              <title>Be A Volunteer | Sunlight Volunteer</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <h1 className="text-4xl font-bold text-center mb-5">
        Be A Volunteer
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
            value={post.thumbnail_image}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
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
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
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
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
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
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
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
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            readOnly
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
            // onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
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
            readOnly
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

        {/* Volunteer name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Volunteer name:
          </label>
          <input
            type="text"
            name="volunteer_name"
            value={user?.displayName}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
          />
        </div>

        {/* Voluneer Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Volunteer name:
          </label>
          <input
            type="email"
            name="volunteer_email"
            value={user?.email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            readOnly
          />
        </div>

        {/* Suggestion */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Suggestion:
          </label>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter any suggestion..."
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Status:
          </label>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || post.total_volunteer_need <= 0}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Requesting..." : "Request"}
        </button>
      </form>
    </div>
  );
};

export default BeAVolunteer;
