app.controller("addHotelController",function($route,$location,hotelDataFactory){
    var vm =this;
    
    vm.servicesData="";
    vm.genData = function(arr)
    {
        vm.servicesData += arr[0]+";";
    }
    vm.addHotel = function(){
        var hotel={ 
            name:vm.name,
            stars:vm.stars,
            services : vm.servicesData,
            description:vm.description,
            currency:vm.currency[0],
            long:51.500596,
            lat:-0.116775               
        }

        hotelDataFactory.postHotelData(hotel).then(function(response){
            if(response.status ===201){
                vm.added =true;

            }
        })
        .catch(function(err){
            console.log(err);
        });
    }
});