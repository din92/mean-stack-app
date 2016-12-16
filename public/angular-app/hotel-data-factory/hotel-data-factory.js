app.factory("hotelDataFactory", hotelDataFactory);

function hotelDataFactory($http) {
    return {
        getAllHotelList: getAllHotelList,
        getHotelData: getHotelData,
        postReviewData: postReviewData,
        postHotelData:postHotelData,
        deleteHotelData:deleteHotelData,
        updateHotelData:updateHotelData,
        getUser:getUser,
        updateUser:updateUser
    }
    function getAllHotelList() {
        return $http.get("/api/hotels?count=10").then(complete).catch(failed);
    }
    function getHotelData(id) {

        var ans = $http.get("/api/hotels/" + id).then(complete).catch(failed);
        return ans;
    }
    function getUser(username) {

        var ans = $http.get("/api/users/" + username).then(complete).catch(failed);
        return ans;
    }
    function updateUser(username,details) {

        return ans = $http.put("/api/users/" + username,details).then(complete).catch(failed);
    }
    function deleteHotelData(id) {

        var ans = $http.delete("/api/hotels/" +id).then(complete).catch(failed);
        return ans;
    }
    function updateHotelData(id,postData) {

        var ans = $http.put("/api/hotels/" +id,postData).then(complete).catch(failed);
        return ans;
    }
    //Posting form data
    function postReviewData(postData, id) {

       return $http.post("/api/hotels/" + id + "/reviews", postData).then(complete).catch(failed);

    }
     function postHotelData(postData) {

       return $http.post("/api/hotels/", postData).then(complete).catch(failed);

    }

    function complete(response) {
        return response;
    }
    function failed(error) {
        console.log(error.statusText);
    }
}




