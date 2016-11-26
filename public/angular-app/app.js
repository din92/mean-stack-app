var app  = angular.module("meanHotel",["ngRoute","angular-jwt"]).run(run)
                    .config(function($routeProvider,$httpProvider){
                       $httpProvider.interceptors.push('AuthInterceptor');//activating the interceptor
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
                                .when("/profile", {
                                    templateUrl:"angular-app/profile/profile.html",
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
