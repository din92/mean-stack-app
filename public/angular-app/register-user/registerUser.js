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
       //vm.isValid = false;
       vm.isSubmitted=true;
   }
   else{
       if(vm.password !=vm.conPassword)
       {
           vm.message = " pasword do not match";
          // vm.isValid = false;
           vm.isSubmitted=true;
       }
       else
       {
           $http.post("/api/users/register",user).then(function(response){
                   vm.message = "user registered successfully";
                 vm.isSubmitted =true;
                // $route.reload();     
           })
           .catch(function(error){
               console.log(error);
           });
       }
   }
}
});