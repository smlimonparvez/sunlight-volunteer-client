import React from "react";
import { Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="all-visas" element={<AllVisas />} />
        <Route
          path="add-visa"
          element={
            <PrivateRoute>
              <AddVisa />
            </PrivateRoute>
          }     
        />
        <Route
          path="visa-details/:id"
          element={
            <PrivateRoute>
              <VisaDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="my-added-visas"
          element={
            <PrivateRoute>
              <MyAddedVisas />
            </PrivateRoute>
          }
        />
        <Route
          path="my-visa-applications"
          element={
            <PrivateRoute>
              <MyVisaApplications />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
