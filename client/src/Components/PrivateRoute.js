import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../Auth/Auth'

export const PrivateRoute = ({ component: Component, ...rest }) => {

    return <Route render={(props) => (
        Auth.isAthenticated()
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />

}
