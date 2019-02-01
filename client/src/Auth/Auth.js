
const Auth = {
    isAthenticated() {
        if (localStorage.getItem('token')) {
            return true
        }

        return false
    },
    authenticate(token) {
        localStorage.setItem('token', token)
    },
    signout(pr) {

        localStorage.removeItem('token')

    }
}


export default Auth