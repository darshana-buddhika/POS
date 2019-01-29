isAuthnticated = () => {
    console.log("Check weather the use is Authenticated!")
    localStorage.getItem('token').length !== 0 ? true : false
}