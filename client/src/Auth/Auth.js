

const Auth = {
    isAuthenticated: false,
    authenticate(token) {
        localStorage.setItem('token', token);
        this.isAuthenticated = true;
    },
    signOut() {
        // this.isAuthenticated = false;
        localStorage.removeItem('token');

    }
}

export default Auth