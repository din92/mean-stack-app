app.factory("hotelDataFactory", hotelDataFactory);

function hotelDataFactory($http) {
    return {
        getAllHotelList: getAllHotelList,
        getHotelData: getHotelData,
        postReviewData: postReviewData
    }
    function getAllHotelList() {
        return $http.get("/api/hotels?count=10").then(complete).catch(failed);
    }
    function getHotelData(id) {

        var ans = $http.get("/api/hotels/" + id).then(complete).catch(failed);
        return ans;
    }
    //Posting form data
    function postReviewData(postData, id) {

       return $http.post("/api/hotels/" + id + "/reviews", postData).then(complete).catch(failed);

    }

    function complete(response) {
        return response;
    }
    function failed(error) {
        console.log(error.statusText);
    }
}




