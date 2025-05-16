import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Register = () => {
  const { signUp, userProfileUpdate, setUser, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    const person = e.target.person.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset error meassage
    setErrorMessage("");

    // password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password should be at least 6 character with upper and lower case"
      );
      return;
    }

    signUp(email, password)
      .then(() => {
        userProfileUpdate({ displayName: person, photoURL: photoURL })
          .then((result) => {
            // console.log("User profile updated successfully", result.user);

            // success message
            Swal.fire({
              title: "Successfully sign up!",
              icon: "success",
              draggable: true,
            });

            navigate("/");
          })
          .catch((err) => {
            setErrorMessage(err.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        // console.log("User created successfully", user);

        // success message
        Swal.fire({
          title: "Successfully sign up!",
          icon: "success",
          draggable: true,
        });

        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center py-18">
      {/* helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register | Sunlight Volunteer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">Sign Up</h1>
          <form onSubmit={handleSignup} className="fieldset relative">
            <label className="fieldset-label">Name</label>
            <input
              name="person"
              type="text"
              className="input"
              placeholder="Your Name"
              required
            />
            <label className="fieldset-label">Photo URL</label>
            <input
              name="photoURL"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />
            <label className="fieldset-label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            <label className="fieldset-label">Password</label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className="input"
              placeholder="Password"
              required
            />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <button className="btn btn-neutral mt-4">Sign up</button>
          </form>
          <button onClick={handleGoogleSignIn} className="btn btn-neutral mt-2">
            <FcGoogle /> Sign up
          </button>
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute top-79 right-12 text-lg"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
          <p>
            All ready have an account? Please{" "}
            <Link
              to="/login"
              className="underline cursor-pointer text-blue-600 text-base font-semibold"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
