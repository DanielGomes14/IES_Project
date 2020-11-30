import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Dashboard from "./views/Dashboard";
import Automation from "./views/Automation";
import NewDevice from "./views/NewDevice";
import Login from "./views/Login";
import Register from "./views/Register";

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
  },
  {    
    path: "/automation",
    layout: DefaultLayout,
    component : Automation
  },
  {    
    path: "/newdevice",
    layout: DefaultLayout,
    component : NewDevice
  },
  {
    path: "/login",
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/register",
    layout: LoginLayout,
    component: Register
  }
];
