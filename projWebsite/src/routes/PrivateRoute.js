import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../utils/auth';

const PrivateRoute = ({layout: Layout, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            auth.token() ?
              <Layout {...props}><Component {...props} /></Layout>
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;