import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Dashboard from "./views/Dashboard";

export default [
  {
    path: "/template",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/template/blog-overview" />
  },
  {
    path: "/template/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/template/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/template/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/template/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/template/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/template/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/template/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  }
];
