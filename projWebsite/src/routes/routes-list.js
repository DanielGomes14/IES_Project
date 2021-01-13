import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, LoginLayout } from "../layouts";

// Route Views
import BlogOverview from "../views/BlogOverview";
import UserProfileLite from "../views/UserProfileLite";
import AddNewPost from "../views/AddNewPost";
import Errors from "../views/Errors";
import ComponentsOverview from "../views/ComponentsOverview";
import Tables from "../views/Tables";
import BlogPosts from "../views/BlogPosts";
import HouseSettings from "../views/HouseSettings"
import Invites from "../views/Invites";
import MyInvites from "../views/MyInvites";
import Dashboard from "../views/Dashboard";
import Automation from "../views/Automation";
import NewDevice from "../views/NewDevice";
import Login from "../views/Login";
import Register from "../views/Register";
import Statistics from "../views/Statistics";
import UserProfile from "../views/UserProfile";
import NewHouse from "../views/NewHouse";
import NewSensor from "../views/NewSensor";
import DeviceLogPage from "../views/DeviceLog";

export const publicRoutes = [
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
    path: "/login",
    restricted: true,
    layout: LoginLayout,
    component: Login
  },
  {
    path: "/register",
    restricted: true,
    layout: LoginLayout,
    component: Register
  },
];

export const privateRoutes = [
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
    path:"/statistics",
    layout: DefaultLayout,
    component: Statistics
  },
  {
    path: "/house-settings",
    layout: DefaultLayout,
    component: HouseSettings
  },
  {
    path: "/invitations",
    layout: DefaultLayout,
    component: Invites
  },
  {
    path: "/my-invites",
    layout: DefaultLayout,
    component: MyInvites
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
    path:"/newhouse",
    layout: DefaultLayout,
    component: NewHouse
  },
  {
    path: "/account",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/device-logs",
    layout: DefaultLayout,
    component: DeviceLogPage
  }
];
