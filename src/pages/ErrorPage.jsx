import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div
      className="p-10 bg-base-100 rounded-box border border-blue-400 relative"
      style={{
        backgroundImage: "url(https://i.postimg.cc/gjg0WBbN/6325257.jpgF)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-5xl font-bold text-red-500">404 Not Found</h1>
        <p className="text-base text-red-500 font-semibold">May be your URL path is not correct.</p>
        <Link to="/" className="btn text-base btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
