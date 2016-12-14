var app  = angular.module("meanHotel",["ngRoute","angular-jwt"]).run(run)
                    .config(function($routeProvider,$httpProvider,$locationProvider){
                       $httpProvider.interceptors.push('AuthInterceptor');//activating the interceptor
                       $locationProvider.html5Mode(true);
                            $routeProvider
                                .when("/",{
                                    templateUrl:"angular-app/Home-page/home.html",
                                    access:{
                                        restricted:false
                                    }
                                })
                                .when("/register",{
                                    templateUrl:"angular-app/register-user/register.html",
                                    controller:"registerController",
                                    controllerAs:"regctrl",
                                    access:{
                                        restricted:false
                                    }
                                })
                                .when("/hotels",{
                                    templateUrl:"angular-app/hotel-list/hotel.html",
                                    controller:"hotelController",
                                    controllerAs:"hotelctrl",
                                    access:{
                                        restricted:false
                                    }
                                })
                                 .when("/hotels/:id", {
                                    templateUrl:"angular-app/hotel-display/hotel-data.html",
                                    controller:"hotelDataController",
                                    controllerAs:"hotelDatactrl",
                                    access:{
                                        restricted:false
                                    }
                                }) 
                                 .when("/hotels/:id/rooms", {
                                    templateUrl:"angular-app/hotel-display/hotel-rooms.html",
                                    controller:"hotelroomsController",
                                    controllerAs:"vm",
                                    access:{
                                        restricted:false
                                    }
                                })
                                 .when("/hotels/:id/update", {
                                    templateUrl:"angular-app/hotel-display/hotel-update.html",
                                    controller:"hotelUpdateController",
                                    controllerAs:"vm",
                                    access:{
                                        restricted:false
                                    }
                                }) 
                                .when("/profile", {
                                    templateUrl:"angular-app/profile/profile.html",
                                    access:{
                                        restricted:true
                                    }
                                }) 
                                .when("/addHotel", {
                                    templateUrl:"angular-app/add-Hotel/add-Hotel.html",
                                    controller:"addHotelController",
                                    controllerAs:"addHotelctrl",
                                    access:{
                                        restricted:true
                                    }
                                }) 
                                .otherwise({
                                    redirectTo :"/"
                                });

                    });
                    function run($rootScope, $location, $window, AuthFactory) {
                        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isloggedIn) {
                            event.preventDefault();
                            $location.path('/');
                        }
                          }); 
                    }
