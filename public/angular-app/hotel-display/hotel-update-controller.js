app.controller('hotelUpdateController', function($routeParams,hotelDataFactory,$window){
	var vm =this //updateHotelData
		var id = $routeParams.id;
		var locationData;
		hotelDataFactory.getHotelData(id).then(function(response){
        vm.hotel= response.data;
        locationData = response.data.location;
        vm.stars = getArray(response.data.stars);
    });
		vm.editHotelName = function(){
			vm.editName= true;
		}
		vm.editHotelDescription =function(){
			vm.editDescription = true;
		}
		vm.editHotelStars =function(){
			vm.editStars = true;
		}
		vm.editHotelCurrency =function(){
			vm.editCurrency = true;
		}
		vm.saveChange = function(){
			var hotelData={
				hname:vm.hotelName,
				description: vm.HotelDescription,
				stars:parseInt(vm.Hotelstars),
				currency:vm.HotelCurrency,
				address : locationData.address,
          		long:locationData.coordinates[0],
          		lat:locationData.coordinates[1]
        	}
        
			hotelDataFactory.updateHotelData(id,hotelData).then(function(response){
				if(response.status===204){
					$window.alert("Hotel successfully updated");
				}
				else{
					$window.alert("Error occurred in updating hotel");
				}
			})
			.catch(function(err){
				console.log(err);
				$window.alert("Oops!! Error occurred in updating hotel");
			})
		}
})