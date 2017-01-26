app.directive("home",function(){
    return{
        restrict:'E',
        template:"<span class ='elementMod'><h2>This is a custom directive {{vm.message | reverse}}<h2></span>",
        bindToController:true,
        controller:'homeController',
        controllerAs: 'vm'

        
    }
})