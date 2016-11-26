app.factory("AuthInterceptor",function($window,$q,AuthFactory,$location){
    return{
        request:request,
        response:response,
        responseError:responseError
    }

    function request(request){
         request.headers = request.headers ||{};
         if($window.sessionStorage.token){
             request.headers.authorization = "Bearer "+$window.sessionStorage.token;
         }
         return request;
    }
    function response(response){
        console.log(response);

        if(response.status === 200 && $window.sessionStorage.token && !AuthFactory.isloggedIn){
            AuthFactory.isloggedIn=true;
        }
        if(response.status===401){ 
            AuthFactory.isloggedIn=false;
        }
        return response || $q.when(response);
    }
    function responseError(rejection){
        if(rejection.status === 401 || rejection.status === 403){
            AuthFactory.isloggedIn=false;
            delete $window.sessionStorage.token;
            $location.path("/");
        }
        return $q.reject(rejection);
    }
})
