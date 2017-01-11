app.controller("hotelController",function(hotelDataFactory,$window,$route,AuthFactory){
                        var vm = this;
						vm.hotels =undefined;
                          hotelDataFactory.getAllHotelList().then(function(response){
							  console.log(response);
                                vm.hotels = response.data;
                            });
                        vm.name="Mean Hotel App";

                        vm.checked = function(){
                        	vm.clicked = true;
                        }
                        vm.isAdmin = function(){
                            if(AuthFactory.isAdmin)
                             return true;
                             else
                             return false;
                        }
                        vm.deleteHotel = function(id,name){
                        	if($window.confirm("Are you sure you want to delete the hotel "+name))
                        	{
                        		hotelDataFactory.deleteHotelData(id).then(function(response){
                        			if(response.status===200){
                        				$window.alert("Hotel data sucessfully deleted");
                                        $route.reload();
                        			}
                        			else{
                        				$window.alert("Failed to delete hotel data");
                        			}
                        		}).catch(function(){
                        			$window.alert("Error in deleting data");
                        		})

                        	}
                        	else
                        	{
                        		$route.reload();
                        	}
                        }
                    });