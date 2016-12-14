app.controller("registerController",function($http,$route){
var vm =this;
vm.registerUser =function(){
   var user={
       name:vm.name,
       username:vm.username,
       password:vm.password
   } 
   if(!vm.username || !vm.password)
   {
       vm.message ="Please provide username and pasword";
       vm.class="alert alert-success";
       vm.isSubmitted=true;
   }
   else{
       if(vm.password !=vm.conPassword)
       {
           vm.message = " pasword do not match";
          vm.class="alert alert-success";
           vm.isSubmitted=true;
       }
       else
       {
           $http.get("/api/users/"+ user.username).then(function(response){
         
             if(response.status===200){
                vm.message = "Username already exist ! Please choose another one";
                vm.isSubmitted =true;
                vm.class="alert alert-danger";
            }
       })
       .catch(function(err){
           //console.log(err);
              if(err.status===404){
                   $http.post("/api/users/register",user).then(function(response){
                    vm.message = "user registered successfully";
                    vm.isSubmitted =true;
                    vm.class="alert alert-success";
                // $route.reload();     
                    })
                    .catch(function(error){
                        vm.message = "Some error occured in registering the user";
                        vm.isSubmitted =true;
                        vm.class="alert alert-danger";
                    });
            }
       });

         
       }
   }
}
});