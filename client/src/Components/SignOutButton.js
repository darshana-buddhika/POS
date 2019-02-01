import React from 'react'
import Auth from '../Auth/Auth'

import { withRouter } from 'react-router-dom'

const SignOutButton = withRouter(({ history }) => {
    console.log(this.props)
    return <button style={{ border: "1px solid #ccc" }} onClick={() => {
        Auth.signout(() => history.push('/'))
    }}>signout</button>
})

export default SignOutButton