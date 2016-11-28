app.controller("addHotel",function(hotelDataFactory,$route,$location){
    var vm =this;
    vm.addHotel = function(){
        var hotel={
            name:vm.name,
            stars:vm.stars,
            services =vm.services,
            description:vm.description,
            currency:vm.currency,
            long:null,
            lat:null

        }
        hotelDataFactory.postHotelData(hotel).then(function(response){
            if(response.status ===201){
                vm.added =true;
                $route.reload();

            }
        })
        .catch(function(err){
            console.log(err);
        });
    }
});