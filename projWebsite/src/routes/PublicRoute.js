import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../utils/auth';

const PublicRoute = ({layout: Layout, component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            auth.isLogin() && restricted ?
                <Redirect to="/" />
            : <Layout {...props}><Component {...props} /></Layout>
        )} />
    );
};

export default PublicRoute;