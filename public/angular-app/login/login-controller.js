app.controller("LoginController",function($http,$location,$window,AuthFactory,jwtHelper,$route){
var vm = this;

vm.isLoggedIn = function(){
    if(AuthFactory.isloggedIn)
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
                var token = $window.sessionStorage.token;
                vm.loggedInUser=jwtHelper.decodeToken(token).username;
                $route.reload();
            }
            
        }).catch(function(err){
            console.log(err);
        });
    }
}

vm.logout = function(){
    AuthFactory.isloggedIn=false;
     delete $window.sessionStorage.token;
    $location.path("/");
}
vm.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  }

});