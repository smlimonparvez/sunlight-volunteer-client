import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  GiEarthAmerica,
  GiFamilyHouse,
  GiFamilyTree,
  GiHealing,
} from "react-icons/gi";
import CountUp from "react-countup";
import { MdHomeWork, MdVolunteerActivism } from "react-icons/md";
import { FaPeopleRobbery } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const Home = () => {
  const { setLoading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://rs9-a11-server.vercel.app/limited-posts")
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
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | Sunlight Volunteer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* Home slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between p-5">
            <div className="md:w-1/2 p-5 md:p-10 space-y-3">
              <h1 className="text-5xl font-bold">
                Make a Difference Volunteer with Us!
              </h1>
              <p className="text-base font-semibold">
                Ready to lend a hand and create positive change in your
                community? Our charity relies on the incredible dedication of
                volunteers like you to help us achieve our mission.
              </p>
              <button className="btn btn-primary text-base">Learn More</button>
            </div>
            <div className="md:w-1/2 p-5">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src="https://i.postimg.cc/1XJrsJ0Y/charity-1.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between p-5">
            <div className="md:w-1/2 p-5 md:p-10 space-y-3">
              <h1 className="text-5xl font-bold">
                Giving Today For Better A Tomorrow
              </h1>
              <p className="text-base font-semibold">
                Whether you have a few hours to spare each week or can commit to
                a specific event, your contribution will have a real and lasting
                impact on the lives of those we serve.
              </p>
              <button className="btn btn-primary text-base">Learn More</button>
            </div>
            <div className="md:w-1/2 p-5">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src="https://i.postimg.cc/XN88fYMc/charity-3.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between p-5">
            <div className="md:w-1/2 p-5 md:p-10 space-y-3">
              <h1 className="text-5xl font-bold">
                Join Our Compassionate Volunteer Community
              </h1>
              <p className="text-base font-semibold">
                Volunteering is more than just giving your time; it's about
                becoming part of a supportive and passionate community of
                individuals dedicated to making the world a better place.{" "}
              </p>
              <button className="btn btn-primary text-base">Learn More</button>
            </div>
            <div className="md:w-1/2 p-5">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src="https://i.postimg.cc/wM6QCSNm/charity-2.jpg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Counting Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
        <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
          <FaPeopleRobbery className="text-3xl" />
          <h2 className="font-semibold text-xl">Total Volunteers</h2>
          <p className="text-3xl font-bold">
            <CountUp start={0} end={500} duration={5} />+
          </p>
        </div>
        <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
          <MdHomeWork className="text-3xl" />
          <h2 className="font-semibold text-xl">Total Projects</h2>
          <p className="text-3xl font-bold">
            <CountUp start={0} end={100} duration={5} />+
          </p>
        </div>
        <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
          <MdVolunteerActivism className="text-3xl" />
          <h2 className="font-semibold text-xl">Total Donations</h2>
          <p className="text-3xl font-bold">
            <CountUp start={30000} end={50000} duration={5} />+
          </p>
        </div>
        <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
          <MdHomeWork className="text-3xl" />
          <h2 className="font-semibold text-xl">Total Events</h2>
          <p className="text-3xl font-bold">
            <CountUp start={0} end={20} duration={5} />+
          </p>
        </div>
      </div>

      {/* Upcoming volunteer need post */}
      <h1 className="text-center text-4xl font-bold my-10">
        Upcoming Volunteer Need Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {posts.map((post) => (
          <div key={post._id} className="card bg-base-200 shadow-sm">
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
      <div className="text-center my-5">
        <Link to="/posts" className="btn btn-primary text-base">
          See All Post
        </Link>
      </div>

      {/* our commitment */}
      <div className="flex flex-col lg:flex-row items-center justify-between p-5">
        <div className="lg:w-1/2">
          <img
            className="w-full h-96 object-cover rounded-lg"
            src="https://i.postimg.cc/wM6QCSNm/charity-2.jpg"
            alt=""
          />
        </div>
        <div className="lg:w-1/2 p-5 md:p-10 space-y-3">
          <h1 className="text-4xl font-bold my-5">Our Commitment</h1>
          <p className="text-lg font-semibold">
            We are dedicated to making a positive impact in the community
            through our volunteer programs. Join us in our mission to create
            lasting change.
          </p>
          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
            <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
              <div>
                <GiHealing className="text-6xl" />
              </div>
              <div className="">
                <h2 className="font-semibold text-xl">Health and Wellness</h2>
                <p className="text-base">
                  We promote health and wellness in our community through
                  various programs and initiatives.
                </p>
              </div>
            </div>
            <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
              <div>
                <GiFamilyTree className="text-6xl" />
              </div>
              <div className="">
                <h2 className="font-semibold text-xl">Community Development</h2>
                <p className="text-base">
                  We focus on empowering communities through sustainable
                  development initiatives.
                </p>
              </div>
            </div>
            <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
              <div>
                <GiEarthAmerica className="text-6xl" />
              </div>
              <div className="">
                <h2 className="font-semibold text-xl">
                  Environmental Conservation
                </h2>
                <p className="text-base">
                  We are committed to protecting the environment and promoting
                  sustainability.
                </p>
              </div>
            </div>
            <div className="bg-base-200 rounded-xl shadow-sm p-5 space-y-2">
              <div>
                <GiFamilyHouse className="text-6xl" />
              </div>
              <div className="">
                <h2 className="font-semibold text-xl">Housing and Shelter</h2>
                <p className="text-base">
                  We provide housing and shelter support to those in need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About us */}
      <div className="flex flex-col md:flex-row items-center justify-between p-5 my-10">
        <div className="md:w-1/2 p-10 space-y-3">
          <h1 className="text-4xl font-bold my-5">About Us</h1>
          <p className="text-lg font-semibold">
            We are a non-profit organization dedicated to making a positive
            impact in the community through our volunteer programs. Our mission
            is to empower individuals and communities to create lasting change.
          </p>
          <button className="btn btn-primary text-base">Learn More</button>
        </div>
        <div className="md:w-1/2">
          <img
            className="w-full h-96 object-cover rounded-lg"
            src="https://i.postimg.cc/XN88fYMc/charity-3.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
