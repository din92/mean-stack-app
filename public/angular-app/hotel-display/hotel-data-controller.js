app.controller("hotelDataController",function($routeParams,$route,hotelDataFactory,$window,AuthFactory,jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    vm.ratings = new Array(5);
    vm.isSubmitted = false;
    vm.toArray =toArray;
    hotelDataFactory.getHotelData(id).then(function(response){
        vm.hotel= response.data;
        vm.stars = getArray(response.data.stars);
    });
    
	vm.isLoggedIn = function(){
    if(AuthFactory.isloggedIn)
    return true;
    else
    return false;
}

    vm.validateAndPostData= function()
    {
		var token = jwtHelper.decodeToken($window.sessionStorage.token);
		var username = token.username;
    	var postData ={
    		name : username,
    		review :vm.review,
    		rating :vm.rating,
    	}
    	if(vm.reviewForm.$valid)
    	{ 
			hotelDataFactory.postReviewData(postData,id).then(function(response){
    		  	if (response.status===201) {
			          $route.reload();
			        }
			    else $window.alert("Error in saving data to the database");
       })
       .catch(function(error){
       	console.log(error);
       });
    	}
    	else
    	{
    		vm.isSubmitted = true;
    	}
     
    }
});

function getArray(number)
{
    return new Array(number);
}

function toArray(number)
{
    return new Array(number);
}
