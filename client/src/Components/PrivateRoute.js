import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../Auth/Auth'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log({...rest})
    return <Route {...rest} render={(props) => (
        Auth.isAthenticated()
            ? <Component {...props} />
            : <Redirect to="/" />
    )} />

}
