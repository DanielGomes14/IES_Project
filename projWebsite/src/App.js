import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes/routes-list";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/style.css";


export default () => (	
	<BrowserRouter>
		<Switch>
			{publicRoutes.map((route, index) => (
					<PublicRoute
						key={index}
						path={route.path}
						exact={route.exact}
						restricted={route.restricted}
						layout={route.layout}
						component={route.component}
					/>
			))}
			{privateRoutes.map((route, index) => (
					<PrivateRoute
						key={index}
						path={route.path}
						exact={route.exact}
						layout={route.layout}
						component={route.component}
					/>
			))}
		</Switch>
	</BrowserRouter>
);
