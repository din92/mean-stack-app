app.controller("profileController",function (hotelDataFactory,$window,jwtHelper,$route) {
    var vm = this;
    vm.message = "User profile";    
    vm.loggedUser= ($window.sessionStorage.token)? jwtHelper.decodeToken($window.sessionStorage.token).username:" ";
    hotelDataFactory.getUser(vm.loggedUser).then(function(response){
        if(response.status===200){
            vm.user=response.data;
        }
        else{
            vm.errorMsg="Some error occured in displaying data";
        }
    })
    .catch(function(err){
        console.log(err);
    });
    vm.edit=function(){
        vm.editable=true;
    }
    vm.submit = function(){
        if(vm.name){
           var username = vm.user.username;
            var details={
                name:vm.name
            }
            hotelDataFactory.updateUser(username,details).then(function(response){
                if(response.status===204){
                    vm.updateMsg= "user data updated";
                    vm.success =true;
                    $route.reload();
                }
                else{
                    vm.updateMsg= "Error in updating data";
                    vm.success =false;
                }
            }).catch(function(err){
                console.log(err);
                vm.updateMsg= "Error occurred in updating data";
                vm.success =false;
            })
        }
    }

})