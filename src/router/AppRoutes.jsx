import React from "react";
import { Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      
       
   
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
