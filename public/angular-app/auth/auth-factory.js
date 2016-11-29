app.factory("AuthFactory", function () {
    return {
        auth: auth = {
            isloggedIn: false,
            isAdmin: false
        }
    };

});