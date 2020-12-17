import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PrivateRoute = ({layout: Layout, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            true ?
              <Layout {...props}><Component {...props} /></Layout>
            : <Redirect to="/register" />
        )} />
    );
};

export default PrivateRoute;