import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import HomeActions from "./HomeActions";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Notifications />
    <HomeActions />
    <UserActions />
  </Nav>
);
