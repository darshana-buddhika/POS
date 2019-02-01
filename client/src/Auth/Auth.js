import { withRouter } from 'react-router-dom'

const Auth = {
    isAthenticated() {
        localStorage.getItem('token') ? true : false
    },
    authenticate(token) {
        localStorage.setItem('token') = token
    },
    signout() {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
}


export default withRouter(Auth)