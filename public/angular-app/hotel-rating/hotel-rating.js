// app.directive('hotelRating', hotelRating);

//  function hotelRating() {
//    return {
//      restrict: 'E',
//      template: '<span ng-repeat="star in hotelDatactrl.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//      bindToController: true,
//      controller: 'hotelDataController',
//      controllerAs: 'hotelDatactrl',
//     scope: {
//        stars: '@'
//      }
//    }
//  }
app.component('hotelRating', {
   bindings: {
     stars: '='
   },
   template: '<span ng-repeat="star in hotelDatactrl.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
   controller: 'hotelDataController',
   controllerAs: 'hotelDatactrl'
 });

 
