import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';

const PublicRoute = ({layout: Layout, component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            true && restricted ?
                <Redirect to="/" />
            : <Layout {...props}><Component {...props} /></Layout>
        )} />
    );
};

export default PublicRoute;