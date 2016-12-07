app.controller("hotelController",function(hotelDataFactory){
                        var vm = this;
                          hotelDataFactory.getAllHotelList().then(function(response){
                                vm.hotels = response.data;
                            });
                        vm.name="Mean Hotel App";
                        vm.checked = function(){
                        	vm.clicked = true;
                        }
                    });