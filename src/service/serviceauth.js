const helper = {
    auth: function checkLogin() {
        if (localStorage.hasOwnProperty('token')) {
            return true;
        }
        return false;
    }
}
export default helper;