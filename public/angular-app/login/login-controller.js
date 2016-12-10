app.controller("LoginController",function($http,$location,$window,AuthFactory,jwtHelper,$route){
var vm = this;
vm.loggedInUser = ($window.sessionStorage.token)? jwtHelper.decodeToken($window.sessionStorage.token).username:" ";
vm.isLoggedIn = function(){
    if(AuthFactory.isloggedIn)
    return true;
    else
    return false;
}
vm.isAdmin = function(){
    if(AuthFactory.isAdmin)
     return true;
     else
     return false;
}
vm.login = function(){
    if(vm.username && vm.password){
        var user={
            username : vm.username,
            password:vm.password
        }
        $http.post("/api/users/login",user).then(function(response){
            if(response.status===200){
                $window.sessionStorage.token = response.data.token;
                AuthFactory.isloggedIn = true;
                vm.unauthorized =false;
                if(response.data.admin===true)
                {
                    AuthFactory.isAdmin = true;
                    $window.sessionStorage.isAdmin=true;

                }
                var token = $window.sessionStorage.token;
                vm.loggedInUser=jwtHelper.decodeToken(token).username;
                $route.reload();
                $location.path("/");
            }
            
            
        }).catch(function(err){
            if(err.status===404)
            vm.unauthorized =true;
        });
    }
}

vm.logout = function(){
    AuthFactory.isloggedIn=false;
    AuthFactory.isAdmin = false;
     delete $window.sessionStorage.token;
     delete $window.sessionStorage.isAdmin;
    $location.path("/");
}
vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }

});