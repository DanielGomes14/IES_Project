import React from "react";
import { Redirect, Route } from "react-router-dom";

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
import HouseSettings from "./views/HouseSettings"
import GroupSettings from "./views/GroupSettings";
import Dashboard from "./views/Dashboard";
import Automation from "./views/Automation";
import NewDevice from "./views/NewDevice";
import Login from "./views/Login";
import Register from "./views/Register";
import Statistics from "./views/Statistics";
import UserProfile from "./views/UserProfile";
import NewHouse from "./views/NewHouse";
import NewConfiguration from "./views/NewConfiguration"
import NewSensor from "./views/NewSensor";

export default [
  {
    route: Route,
    path: "/template",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/template/blog-overview" />
  },
  {
    route: Route,
    path: "/template/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    route: Route,
    path: "/template/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    route: Route,
    path: "/template/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    route: Route,
    path: "/template/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    route: Route,
    path: "/template/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    route: Route,
    path: "/template/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    route: Route,
    path: "/template/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    route: Route,
    path: "/house-settings",
    layout: DefaultLayout,
    component: HouseSettings
  },
  {
    route: Route,
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/dashboard" />
  },
  {
    route: Route,
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
    path: "/newsensor",
    layout: DefaultLayout,
    component : NewSensor
  },
  {
    route: Route,
    path: "/group-settings",
    layout: DefaultLayout,
    component: GroupSettings
  },
  {
    route: Route,
    path:"/newhouse",
    layout: DefaultLayout,
    component: NewHouse
  },
  {
    route: Route,
    path: "/login",
    layout: LoginLayout,
    component: Login
  },
  {
    route: Route,
    path: "/register",
    layout: LoginLayout,
    component: Register
  },
  {
    route: Route,
    path:"/statistics",
    layout: DefaultLayout,
    component: Statistics
  },
  {
    route: Route,
    path: "/account",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    route: Route,
    path: "/config-device",
    layout: DefaultLayout,
    component: NewConfiguration
  }
];
