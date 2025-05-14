import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddVolunteer from "../pages/AddVolunteer";
import PrivateRoute from "./PrivateRoute";
import AllPost from "../pages/AllPost";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";
import BeAVolunteer from "../pages/BeAVolunteer";
import ManageMyPost from "../pages/ManageMyPost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="posts" element={<AllPost />} />
        <Route
          path="add-volunteer"
          element={
            <PrivateRoute>
              <AddVolunteer />
            </PrivateRoute>
          }
        />
        <Route
          path="post-details/:id"
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="be-volunteer/:id"
          element={
            <PrivateRoute>
              <BeAVolunteer />
            </PrivateRoute>
          }
        />
        <Route
          path="manage-my-post"
          element={
            <PrivateRoute>
              <ManageMyPost />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
