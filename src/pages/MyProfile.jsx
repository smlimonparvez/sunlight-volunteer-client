import React from "react";
import { Helmet } from "react-helmet";

const MyProfile = () => {
  return (
    <div>
      {/* helmet */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Profile | Sunlight Volunteer</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>
  );
};

export default MyProfile;
